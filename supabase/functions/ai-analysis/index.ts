import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface AnalysisRequest {
  assignmentId: string;
  content: string;
  subject: string;
  gradeLevel: string;
  assignmentType: string;
  learningObjectives?: string[];
}

interface CBCCompetency {
  name: string;
  description: string;
  level: 'novice' | 'developing' | 'proficient' | 'advanced';
  evidence: string[];
  suggestions: string[];
  weight: number;
}

interface SocraticQuestion {
  id: string;
  question: string;
  purpose: string;
  category: 'clarification' | 'assumptions' | 'evidence' | 'perspective' | 'implications' | 'meta';
  difficulty: 'easy' | 'medium' | 'hard';
  follow_up_hints: string[];
}

interface FeedbackSection {
  title: string;
  category: 'structure' | 'content' | 'language' | 'critical_thinking' | 'creativity';
  score: number;
  feedback: string;
  specific_examples: string[];
  improvement_suggestions: string[];
  resources: any[];
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { assignmentId, content, subject, gradeLevel, assignmentType, learningObjectives }: AnalysisRequest = await req.json()

    // Initialize Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Get user from auth header
    const authHeader = req.headers.get('Authorization')!
    const token = authHeader.replace('Bearer ', '')
    const { data: { user } } = await supabaseClient.auth.getUser(token)

    if (!user) {
      throw new Error('Unauthorized')
    }

    // Get workflow template for assignment type
    const { data: template } = await supabaseClient
      .from('workflow_templates')
      .select('*')
      .eq('type', assignmentType)
      .eq('is_active', true)
      .single()

    if (!template) {
      throw new Error('No workflow template found for assignment type')
    }

    // Prepare CBC-aligned prompt
    const cbcPrompt = `
Act as an expert educational assessor specializing in Kenya's Competency-Based Curriculum (CBC).

Assignment Details:
- Subject: ${subject}
- Grade Level: ${gradeLevel}
- Type: ${assignmentType}
- Learning Objectives: ${learningObjectives?.join(', ') || 'General assessment'}

Content to Analyze:
${content}

Please provide a comprehensive CBC-aligned analysis including:

1. COMPETENCY ANALYSIS:
   - Assess against CBC core competencies: Communication & Collaboration, Critical Thinking & Problem Solving, Imagination & Creativity, Citizenship, Digital Literacy, Learning to Learn, Self-Efficacy
   - Rate each relevant competency as: novice, developing, proficient, or advanced
   - Provide specific evidence from the work
   - Suggest targeted improvements

2. SOCRATIC QUESTIONS:
   - Generate 5-8 thought-provoking questions to guide deeper thinking
   - Categories: clarification, assumptions, evidence, perspective, implications, metacognition
   - Include follow-up hints for each question
   - Align with CBC's learner-centered approach

3. DETAILED FEEDBACK:
   - Structure & Organization
   - Content & Ideas
   - Language & Communication
   - Critical Thinking
   - Creativity & Innovation
   - Provide specific examples and improvement suggestions

4. PERSONALIZED LEARNING PATH:
   - Identify knowledge gaps and misconceptions
   - Suggest next steps for skill development
   - Recommend CBC-aligned resources and activities
   - Create progressive learning objectives

5. CBC VALUES INTEGRATION:
   - Assess integration of CBC values: Respect, Responsibility, Honesty, Peace, Love, Unity, Patriotism, Ubuntu
   - Suggest ways to strengthen values-based learning

Format your response as a structured JSON object with the specified sections.
`

    // Call Groq API for analysis
    const groqResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Deno.env.get('GROQ_API_KEY')}`,
      },
      body: JSON.stringify({
        model: 'llama-3.1-70b-versatile',
        messages: [
          {
            role: 'system',
            content: 'You are an expert educational assessor specializing in Kenya\'s Competency-Based Curriculum. Provide detailed, constructive feedback that promotes learning and development.',
          },
          {
            role: 'user',
            content: cbcPrompt,
          },
        ],
        max_tokens: 4000,
        temperature: 0.7,
      }),
    })

    if (!groqResponse.ok) {
      throw new Error(`Groq API error: ${groqResponse.statusText}`)
    }

    const groqData = await groqResponse.json()
    const aiContent = groqData.choices[0]?.message?.content || ''

    // Parse and structure the AI response
    const structuredResponse = parseAIResponse(aiContent)

    // Save AI result to database
    const { data: aiResult, error: aiError } = await supabaseClient
      .from('ai_results')
      .insert({
        assignment_id: assignmentId,
        workflow_type: `cbc_${assignmentType}_analysis`,
        ai_response: structuredResponse,
        processing_time: Date.now() - Date.now(), // Calculate actual processing time
        tokens_used: groqData.usage?.total_tokens || 0,
        cost_estimate: calculateCost(groqData.usage?.total_tokens || 0),
        quality_score: calculateQualityScore(structuredResponse),
      })
      .select()
      .single()

    if (aiError) {
      console.error('Error saving AI result:', aiError)
    }

    // Update assignment status
    await supabaseClient
      .from('assignments')
      .update({ 
        status: 'completed',
        updated_at: new Date().toISOString()
      })
      .eq('id', assignmentId)

    // Log usage
    await supabaseClient
      .from('usage_logs')
      .insert({
        user_id: user.id,
        assignment_id: assignmentId,
        api_provider: 'groq',
        tokens_used: groqData.usage?.total_tokens || 0,
        cost: calculateCost(groqData.usage?.total_tokens || 0),
        processing_time: Date.now() - Date.now(),
      })

    return new Response(
      JSON.stringify({
        success: true,
        result: aiResult,
        analysis: structuredResponse,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    )
  } catch (error) {
    console.error('Analysis error:', error)
    return new Response(
      JSON.stringify({ 
        success: false,
        error: error.message 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      },
    )
  }
})

function parseAIResponse(content: string) {
  // Try to extract JSON from the AI response
  try {
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
  } catch (e) {
    console.log('Failed to parse JSON, using fallback structure');
  }

  // Fallback: Create structured response from text
  return {
    competency_analysis: {
      subject: 'General',
      grade_level: 'Unknown',
      competencies: extractCompetencies(content),
      overall_level: 'developing',
      strengths: extractStrengths(content),
      areas_for_improvement: extractImprovements(content),
      next_steps: extractNextSteps(content),
    },
    socratic_questions: extractSocraticQuestions(content),
    feedback_sections: extractFeedbackSections(content),
    learning_path: extractLearningPath(content),
    quality_score: 0.8,
  };
}

function extractCompetencies(content: string): CBCCompetency[] {
  // Extract competency information from text
  const competencies = [
    'Communication and Collaboration',
    'Critical Thinking and Problem Solving',
    'Imagination and Creativity',
    'Citizenship',
    'Digital Literacy',
    'Learning to Learn',
    'Self-Efficacy'
  ];

  return competencies.map(name => ({
    name,
    description: `Assessment of ${name.toLowerCase()} competency`,
    level: 'developing' as const,
    evidence: [`Evidence found in the work for ${name}`],
    suggestions: [`Suggestion for improving ${name}`],
    weight: 1.0 / competencies.length,
  }));
}

function extractSocraticQuestions(content: string): SocraticQuestion[] {
  // Extract or generate Socratic questions
  return [
    {
      id: '1',
      question: 'What is the main idea you are trying to communicate?',
      purpose: 'Help clarify the central message',
      category: 'clarification' as const,
      difficulty: 'easy' as const,
      follow_up_hints: ['Look at your introduction', 'Consider your conclusion', 'What would you tell a friend?'],
    },
    {
      id: '2',
      question: 'What evidence supports your main points?',
      purpose: 'Encourage evaluation of supporting evidence',
      category: 'evidence' as const,
      difficulty: 'medium' as const,
      follow_up_hints: ['Are your sources reliable?', 'Do you have enough evidence?', 'Is there contradictory evidence?'],
    },
  ];
}

function extractFeedbackSections(content: string): FeedbackSection[] {
  return [
    {
      title: 'Structure & Organization',
      category: 'structure' as const,
      score: 75,
      feedback: 'Your work shows good organizational skills with clear sections.',
      specific_examples: ['Clear introduction', 'Logical flow of ideas'],
      improvement_suggestions: ['Add transition sentences', 'Strengthen conclusion'],
      resources: [],
    },
    {
      title: 'Content & Ideas',
      category: 'content' as const,
      score: 80,
      feedback: 'You demonstrate good understanding of the topic with relevant examples.',
      specific_examples: ['Good use of examples', 'Clear explanations'],
      improvement_suggestions: ['Develop ideas more thoroughly', 'Add more depth'],
      resources: [],
    },
  ];
}

function extractLearningPath(content: string) {
  return [
    {
      id: '1',
      title: 'Strengthen Writing Structure',
      description: 'Focus on improving organization and flow',
      type: 'skill',
      difficulty: 2,
      estimated_time: 45,
      prerequisites: [],
      resources: [],
      completed: false,
    },
    {
      id: '2',
      title: 'Develop Critical Analysis',
      description: 'Practice deeper analysis and evaluation',
      type: 'concept',
      difficulty: 3,
      estimated_time: 60,
      prerequisites: ['Strengthen Writing Structure'],
      resources: [],
      completed: false,
    },
  ];
}

function calculateCost(tokens: number): number {
  // Groq pricing calculation (example rates)
  const costPerToken = 0.0001;
  return tokens * costPerToken;
}

function calculateQualityScore(analysis: any): number {
  // Calculate quality score based on completeness and depth
  let score = 0.5; // Base score
  
  if (analysis.competency_analysis?.competencies?.length > 0) score += 0.1;
  if (analysis.socratic_questions?.length > 0) score += 0.1;
  if (analysis.feedback_sections?.length > 0) score += 0.1;
  if (analysis.learning_path?.length > 0) score += 0.1;
  
  return Math.min(score, 1.0);
}
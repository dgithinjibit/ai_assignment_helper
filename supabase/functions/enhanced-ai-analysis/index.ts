import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface EnhancedAnalysisRequest {
  assignmentId: string;
  content: string;
  title: string;
  subject: string;
  gradeLevel: string;
  assignmentType: string;
  courseContext?: string;
  specificRequirements?: string;
  learningObjectives?: string[];
  dueDate?: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const requestData: EnhancedAnalysisRequest = await req.json()

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

    // Get CBC standards for the subject and grade level
    const { data: cbcStandards } = await supabaseClient
      .from('cbc_standards')
      .select('*')
      .eq('subject', requestData.subject)
      .eq('grade_level', requestData.gradeLevel)

    // Get workflow template
    const { data: template } = await supabaseClient
      .from('workflow_templates')
      .select('*')
      .eq('type', requestData.assignmentType)
      .eq('is_active', true)
      .single()

    if (!template) {
      throw new Error('No workflow template found for assignment type')
    }

    // Enhanced CBC-aligned prompt
    const enhancedPrompt = `
You are an expert educational mentor specializing in Kenya's Competency-Based Curriculum (CBC). You follow the Socratic method and competency-based assessment principles.

**Assignment Context:**
- Title: ${requestData.title}
- Subject: ${requestData.subject}
- Grade Level: ${requestData.gradeLevel}
- Assignment Type: ${requestData.assignmentType}
- Course Context: ${requestData.courseContext || 'Not provided'}
- Specific Requirements: ${requestData.specificRequirements || 'Not provided'}
- Learning Objectives: ${requestData.learningObjectives?.join(', ') || 'General assessment'}
- Due Date: ${requestData.dueDate || 'Not specified'}

**CBC Standards Context:**
${cbcStandards?.map(standard => 
  `- ${standard.strand} > ${standard.sub_strand}: ${standard.specific_outcome}`
).join('\n') || 'No specific standards found'}

**Assignment Content:**
${requestData.content}

**Analysis Framework:**

1. **Assignment Understanding & Requirements Analysis:**
   - Extract and clarify exactly what this assignment is asking for
   - Identify key requirements, constraints, and success criteria
   - Map to specific CBC learning outcomes and competencies
   - Assess alignment with grade-level expectations

2. **CBC Competency-Based Assessment:**
   Evaluate against the 7 core CBC competencies:
   - Communication and Collaboration
   - Critical Thinking and Problem Solving
   - Imagination and Creativity
   - Citizenship
   - Digital Literacy
   - Learning to Learn
   - Self-Efficacy
   
   For each relevant competency:
   - Rate current level: Novice, Developing, Proficient, or Advanced
   - Provide specific evidence from the work
   - Identify areas for improvement
   - Suggest targeted development strategies

3. **CBC Values Integration Assessment:**
   Evaluate integration of CBC core values:
   - Respect, Responsibility, Honesty, Peace, Love, Unity, Patriotism, Ubuntu
   - Identify where values are demonstrated or could be strengthened

4. **Socratic Questioning Strategy:**
   Generate 6-8 thought-provoking questions that:
   - Guide the student to discover solutions rather than providing direct answers
   - Encourage deeper thinking about THIS specific assignment
   - Help identify assumptions, evaluate evidence, and consider perspectives
   - Promote metacognitive awareness and self-reflection
   - Are tailored to the student's grade level and subject

5. **Personalized Learning Path:**
   Based on identified gaps and strengths:
   - Recommend specific next steps for THIS assignment
   - Suggest targeted practice activities aligned with CBC standards
   - Identify prerequisite skills that may need reinforcement
   - Recommend appropriate resources and learning materials

6. **Strategic Guidance (Assignment-Specific):**
   - Provide step-by-step methodology for completing THIS task
   - Suggest research strategies, organizational approaches, or problem-solving methods
   - Offer time management and planning advice
   - Recommend quality assurance and self-assessment techniques

**Response Format:**
Provide a comprehensive JSON response with the following structure:

{
  "assignment_analysis": {
    "requirements_breakdown": "Clear explanation of what the assignment requires",
    "cbc_alignment": "How this assignment aligns with CBC standards",
    "complexity_level": "Assessment of assignment difficulty for grade level"
  },
  "competency_analysis": {
    "subject": "${requestData.subject}",
    "grade_level": "${requestData.gradeLevel}",
    "competencies": [
      {
        "name": "Competency name",
        "description": "What this competency involves",
        "level": "novice|developing|proficient|advanced",
        "evidence": ["Specific examples from the work"],
        "suggestions": ["Targeted improvement strategies"],
        "weight": 0.0-1.0
      }
    ],
    "overall_level": "Overall competency level",
    "strengths": ["Key strengths demonstrated"],
    "areas_for_improvement": ["Priority areas for development"],
    "next_steps": ["Specific actions for improvement"]
  },
  "socratic_questions": [
    {
      "id": "unique_id",
      "question": "Thought-provoking question",
      "purpose": "Why this question helps learning",
      "category": "clarification|assumptions|evidence|perspective|implications|meta",
      "difficulty": "easy|medium|hard",
      "follow_up_hints": ["Guiding hints if student struggles"]
    }
  ],
  "feedback_sections": [
    {
      "title": "Section title",
      "category": "structure|content|language|critical_thinking|creativity",
      "score": 0-100,
      "feedback": "Detailed feedback",
      "specific_examples": ["Concrete examples from the work"],
      "improvement_suggestions": ["Actionable improvement advice"],
      "resources": [
        {
          "title": "Resource title",
          "type": "article|video|exercise|book|website",
          "description": "Resource description",
          "difficulty": "beginner|intermediate|advanced",
          "url": "Optional URL"
        }
      ]
    }
  ],
  "learning_path": [
    {
      "id": "unique_id",
      "title": "Learning activity title",
      "description": "What this activity involves",
      "type": "concept|skill|practice|assessment",
      "difficulty": 1-5,
      "estimated_time": "minutes",
      "prerequisites": ["Required prior knowledge"],
      "resources": ["Learning materials"],
      "completed": false
    }
  ],
  "strategic_guidance": {
    "approach": "Recommended strategy for this assignment",
    "steps": ["Step-by-step methodology"],
    "timeline": "Suggested timeline for completion",
    "quality_checks": ["Self-assessment criteria"]
  },
  "cbc_values_integration": {
    "demonstrated_values": ["Values shown in the work"],
    "opportunities": ["Ways to strengthen values integration"]
  }
}

Focus on being a guide and mentor rather than providing direct answers. Help the student develop critical thinking and problem-solving skills through guided discovery.
`

    // Call Groq API for enhanced analysis
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
            content: 'You are an expert educational mentor specializing in Kenya\'s Competency-Based Curriculum. You use the Socratic method to guide learning and provide competency-based assessment. Always respond with valid JSON.',
          },
          {
            role: 'user',
            content: enhancedPrompt,
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

    // Parse AI response
    let structuredResponse
    try {
      structuredResponse = JSON.parse(aiContent)
    } catch (e) {
      // Fallback parsing if JSON is malformed
      structuredResponse = parseAIResponseFallback(aiContent, requestData)
    }

    // Save AI result to database
    const { data: aiResult, error: aiError } = await supabaseClient
      .from('ai_results')
      .insert({
        assignment_id: requestData.assignmentId,
        workflow_type: `enhanced_cbc_${requestData.assignmentType}_analysis`,
        ai_response: structuredResponse,
        processing_time: Date.now() - Date.now(),
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
      .eq('id', requestData.assignmentId)

    // Log usage
    await supabaseClient
      .from('usage_logs')
      .insert({
        user_id: user.id,
        assignment_id: requestData.assignmentId,
        api_provider: 'groq',
        tokens_used: groqData.usage?.total_tokens || 0,
        cost: calculateCost(groqData.usage?.total_tokens || 0),
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
    console.error('Enhanced analysis error:', error)
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

function parseAIResponseFallback(content: string, requestData: EnhancedAnalysisRequest) {
  // Fallback parsing for when AI doesn't return valid JSON
  return {
    assignment_analysis: {
      requirements_breakdown: "Assignment requirements analysis",
      cbc_alignment: `Aligned with ${requestData.subject} CBC standards`,
      complexity_level: "Appropriate for grade level"
    },
    competency_analysis: {
      subject: requestData.subject,
      grade_level: requestData.gradeLevel,
      competencies: [
        {
          name: "Communication and Collaboration",
          description: "Ability to express ideas clearly and work with others",
          level: "developing",
          evidence: ["Evidence from the assignment"],
          suggestions: ["Suggestions for improvement"],
          weight: 0.3
        }
      ],
      overall_level: "developing",
      strengths: ["Identified strengths"],
      areas_for_improvement: ["Areas needing attention"],
      next_steps: ["Recommended next steps"]
    },
    socratic_questions: [
      {
        id: "1",
        question: "What is the main goal of this assignment?",
        purpose: "Help clarify objectives",
        category: "clarification",
        difficulty: "easy",
        follow_up_hints: ["Think about the learning outcomes"]
      }
    ],
    feedback_sections: [
      {
        title: "Overall Assessment",
        category: "content",
        score: 75,
        feedback: "General feedback on the assignment",
        specific_examples: ["Examples from the work"],
        improvement_suggestions: ["Ways to improve"],
        resources: []
      }
    ],
    learning_path: [
      {
        id: "1",
        title: "Next Learning Step",
        description: "Continue developing skills",
        type: "skill",
        difficulty: 2,
        estimated_time: 30,
        prerequisites: [],
        resources: [],
        completed: false
      }
    ],
    strategic_guidance: {
      approach: "Recommended approach for this type of assignment",
      steps: ["Step 1", "Step 2", "Step 3"],
      timeline: "Suggested completion timeline",
      quality_checks: ["Self-assessment criteria"]
    },
    cbc_values_integration: {
      demonstrated_values: ["Values shown"],
      opportunities: ["Ways to strengthen values"]
    }
  }
}

function calculateCost(tokens: number): number {
  const costPerToken = 0.0001
  return tokens * costPerToken
}

function calculateQualityScore(analysis: any): number {
  let score = 0.5
  
  if (analysis.competency_analysis?.competencies?.length > 0) score += 0.1
  if (analysis.socratic_questions?.length > 0) score += 0.1
  if (analysis.feedback_sections?.length > 0) score += 0.1
  if (analysis.learning_path?.length > 0) score += 0.1
  if (analysis.strategic_guidance) score += 0.1
  
  return Math.min(score, 1.0)
}
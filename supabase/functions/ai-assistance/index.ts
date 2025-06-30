import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { prompt, context, assignmentId } = await req.json()

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

    // Call DeepSeek API
    const deepseekResponse = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Deno.env.get('DEEPSEEK_API_KEY')}`,
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          {
            role: 'system',
            content: 'You are an AI academic assistant. Help students with their assignments by providing constructive feedback, suggestions, and guidance. Always encourage learning and understanding rather than providing direct answers.',
          },
          ...(context ? [{
            role: 'user',
            content: `Context: ${context}`,
          }] : []),
          {
            role: 'user',
            content: prompt,
          },
        ],
        max_tokens: parseInt(Deno.env.get('MAX_TOKENS_PER_REQUEST') || '4000'),
        temperature: 0.7,
      }),
    })

    if (!deepseekResponse.ok) {
      throw new Error(`DeepSeek API error: ${deepseekResponse.statusText}`)
    }

    const deepseekData = await deepseekResponse.json()
    const content = deepseekData.choices[0]?.message?.content || ''

    // Extract suggestions from content
    const suggestions: string[] = []
    const lines = content.split('\n')
    
    lines.forEach(line => {
      if (line.includes('suggest') || line.includes('recommend') || line.includes('consider')) {
        suggestions.push(line.trim())
      }
    })

    const response = {
      content,
      suggestions: suggestions.slice(0, 5),
      confidence: 0.85,
      tokens_used: deepseekData.usage?.total_tokens || 0,
    }

    // Update assignment with AI suggestions if assignmentId provided
    if (assignmentId) {
      await supabaseClient
        .from('assignments')
        .update({ 
          ai_suggestions: suggestions,
          updated_at: new Date().toISOString()
        })
        .eq('id', assignmentId)
        .eq('user_id', user.id)
    }

    return new Response(
      JSON.stringify(response),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      },
    )
  }
})
import type { AIResponse } from '../types';

const GROQ_API_KEY = import.meta.env.GROQ_API_KEY;
const GROQ_BASE_URL = import.meta.env.GROQ_BASE_URL || 'https://api.groq.com/openai';

export class GroqClient {
  private apiKey: string;
  private baseUrl: string;

  constructor() {
    this.apiKey = GROQ_API_KEY;
    this.baseUrl = GROQ_BASE_URL;
  }

  async generateAssistance(prompt: string, context?: string): Promise<AIResponse> {
    if (!this.apiKey) {
      throw new Error('Groq API key not configured');
    }

    try {
      const response = await fetch(`${this.baseUrl}/v1/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          model: 'llama3-8b-8192', // Popular Groq model, you can change this
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
          max_tokens: parseInt(import.meta.env.MAX_TOKENS_PER_REQUEST || '4000'),
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        throw new Error(`Groq API error: ${response.statusText}`);
      }

      const data = await response.json();
      const content = data.choices[0]?.message?.content || '';
      
      return {
        content,
        suggestions: this.extractSuggestions(content),
        confidence: 0.85, // Mock confidence score
        tokens_used: data.usage?.total_tokens || 0,
      };
    } catch (error) {
      console.error('Groq API error:', error);
      throw new Error('Failed to generate AI assistance');
    }
  }

  private extractSuggestions(content: string): string[] {
    // Simple extraction of suggestions from content
    const suggestions: string[] = [];
    const lines = content.split('\n');
    
    lines.forEach(line => {
      if (line.includes('suggest') || line.includes('recommend') || line.includes('consider')) {
        suggestions.push(line.trim());
      }
    });

    return suggestions.slice(0, 5); // Limit to 5 suggestions
  }
}

export const groq = new GroqClient();
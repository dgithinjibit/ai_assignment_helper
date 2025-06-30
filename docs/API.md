# AI Assignment Helper API Documentation

## Overview

This document describes the API endpoints and functionality for the AI Assignment Helper application.

## Authentication

All API requests require authentication using Supabase Auth. Include the user's JWT token in the Authorization header:

```
Authorization: Bearer <jwt_token>
```

## Database Schema

### Assignments Table

```sql
CREATE TABLE assignments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  description text NOT NULL,
  subject text NOT NULL,
  assignment_type text NOT NULL CHECK (assignment_type IN ('essay', 'research', 'presentation', 'report', 'other')),
  status text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'in_progress', 'completed', 'submitted')),
  due_date timestamptz,
  content text,
  ai_suggestions text[],
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);
```

## Edge Functions

### AI Assistance Function

**Endpoint:** `/functions/v1/ai-assistance`
**Method:** POST

Provides AI-powered assistance for assignments using DeepSeek API.

#### Request Body

```json
{
  "prompt": "string (required) - The user's question or request for assistance",
  "context": "string (optional) - Additional context about the assignment",
  "assignmentId": "string (optional) - UUID of the assignment to update with suggestions"
}
```

#### Response

```json
{
  "content": "string - AI-generated response content",
  "suggestions": ["string"] - Array of extracted suggestions",
  "confidence": "number - Confidence score (0-1)",
  "tokens_used": "number - Number of tokens consumed"
}
```

#### Error Response

```json
{
  "error": "string - Error message"
}
```

## Environment Variables

### Required Variables

- `VITE_SUPABASE_URL` - Supabase project URL
- `VITE_SUPABASE_ANON_KEY` - Supabase anonymous key
- `SUPABASE_SERVICE_ROLE_KEY` - Supabase service role key (for edge functions)
- `DEEPSEEK_API_KEY` - DeepSeek API key
- `DEEPSEEK_BASE_URL` - DeepSeek API base URL (default: https://api.deepseek.com)

### Optional Variables

- `MAX_REQUESTS_PER_HOUR` - Rate limit for API requests (default: 100)
- `MAX_TOKENS_PER_REQUEST` - Maximum tokens per AI request (default: 4000)
- `NODE_ENV` - Environment mode (development/production)

## Rate Limiting

The application implements rate limiting to prevent abuse:

- Maximum 100 requests per hour per user (configurable)
- Maximum 4000 tokens per AI request (configurable)

## Security

### Row Level Security (RLS)

All database tables use RLS to ensure users can only access their own data:

- Users can only view, create, update, and delete their own assignments
- All policies check `auth.uid() = user_id`

### API Security

- All endpoints require valid JWT authentication
- Edge functions validate user tokens before processing
- Input validation and sanitization on all user inputs
- CORS headers configured for secure cross-origin requests

## Error Handling

The API uses standard HTTP status codes:

- `200` - Success
- `400` - Bad Request (validation errors)
- `401` - Unauthorized (invalid/missing token)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found
- `500` - Internal Server Error

Error responses include descriptive messages to help with debugging.
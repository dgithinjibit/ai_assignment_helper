// Mock Supabase client for demo purposes
export const supabase = {
  auth: {
    getSession: () => Promise.resolve({ data: { session: null }, error: null }),
    onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
    getUser: () => Promise.resolve({ data: { user: null }, error: null }),
    signOut: () => Promise.resolve({ error: null }),
  },
  from: () => ({
    select: () => ({
      eq: () => ({
        single: () => Promise.resolve({ data: null, error: null })
      })
    }),
    insert: () => ({
      select: () => ({
        single: () => Promise.resolve({ data: null, error: null })
      })
    }),
    update: () => ({
      eq: () => ({
        select: () => ({
          single: () => Promise.resolve({ data: null, error: null })
        })
      })
    }),
    upsert: () => Promise.resolve({ error: null })
  })
};

// Mock database helpers for demo
export const db = {
  assignments: {
    create: async (assignment: any) => ({ data: { id: 'demo-id', ...assignment }, error: null }),
    getByUserId: async (userId: string) => ({ data: [], error: null }),
    update: async (id: string, updates: any) => ({ data: { id, ...updates }, error: null }),
    delete: async (id: string) => ({ error: null }),
  },
};
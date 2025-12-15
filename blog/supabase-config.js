
// SUPABASE CONFIGURATION
// 1. Create a project at https://supabase.com
// 2. Create a table named 'posts' with columns:
//    - id (int8, Primary Key, Auto Increment)
//    - title (text)
//    - excerpt (text)
//    - body (text)
//    - image_url (text)
//    - created_at (timestamptz, default: now())
// 3. Paste your URL and Anon Key below.

const SUPABASE_URL = 'https://ocdkceeyaxoslukidodi.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9jZGtjZWV5YXhvc2x1a2lkb2RpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU4MTc5MDgsImV4cCI6MjA4MTM5MzkwOH0.tZpbQg7patR2Cz4WJEWWRfwqbY3MlwwK9a4svpvi-68';

// Initialize Client
const { createClient } = supabase;
const _supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Export for use
window.supabaseClient = _supabase;

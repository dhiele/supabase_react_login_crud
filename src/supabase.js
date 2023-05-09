import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://mszlneqvkdjltguvxbnx.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1zemxuZXF2a2RqbHRndXZ4Ym54Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzc4NzI3NjIsImV4cCI6MTk5MzQ0ODc2Mn0.r22bht99Js0WVpX4lUnZ3EUN8QxJNEsQdJHs_6I3WUo';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

import { createClient } from '@supabase/supabase-js';

let supabaseClient = null;

const getSupabase = () => {
  if (!supabaseClient) {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error('SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required in environment variables');
    }

    supabaseClient = createClient(supabaseUrl, supabaseServiceKey);
  }
  
  return supabaseClient;
};

export default getSupabase; 
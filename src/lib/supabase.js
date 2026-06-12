const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    'Supabase credentials missing. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file.',
  );
}

/**
 * Subscribe an email address to the waitlist.
 * Uses the Supabase REST API directly (avoids .select() permission issues).
 */
export async function subscribeEmail(email) {
  const response = await fetch(`${supabaseUrl}/rest/v1/subscribers`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': supabaseAnonKey,
      'Authorization': `Bearer ${supabaseAnonKey}`,
    },
    body: JSON.stringify({ email }),
  });

  if (!response.ok) {
    // Handle duplicate email (Postgres unique violation → 409)
    if (response.status === 409) {
      return { data: null, error: null }; // treat duplicate as success
    }

    return { data: null, error: { message: 'Something went wrong. Try again.' } };
  }

  return { data: { email }, error: null };
}

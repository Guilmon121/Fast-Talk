import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import Chat from '../components/Chat';

export default function Home() {
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => setSession(session));
    supabase.auth.onAuthStateChange((_event, session) => setSession(session));
  }, []);

  async function signInWithEmail() {
    const email = prompt('Digite seu email:');
    if (email) {
      const { error } = await supabase.auth.signInWithOtp({ email });
      if (error) alert('Erro no login');
      else alert('Confira seu email para o link mágico.');
    }
  }

  if (!session) return (
    <div className="flex h-screen justify-center items-center">
      <button onClick={signInWithEmail} className="bg-blue-600 text-white px-4 py-2 rounded">Entrar</button>
    </div>
  );

  return <Chat session={session} />;
}

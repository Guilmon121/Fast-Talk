import { useState } from 'react';
import { supabase } from '../supabaseClient';

export default function InputBar({ user }: any) {
  const [text, setText] = useState('');

  async function sendMessage() {
    if (text.trim()) {
      await supabase.from('messages').insert({ user_id: user.id, content: text });
      setText('');
    }
  }

  return (
    <div className="p-2 border-t flex">
      <input
        className="flex-1 p-2 border rounded mr-2"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        placeholder="Digite uma mensagem..."
      />
      <button onClick={sendMessage} className="bg-blue-600 text-white px-4 py-2 rounded">Enviar</button>
    </div>
  );
}

import { useEffect, useState, useRef } from 'react';
import { supabase } from '../supabaseClient';
import Message from './Message';
import InputBar from './InputBar';

export default function Chat({ session }: any) {
  const [messages, setMessages] = useState<any[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchMessages();

    const subscription = supabase
      .channel('public:messages')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' }, (payload) => {
        setMessages((prev) => [...prev, payload.new]);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  async function fetchMessages() {
    const { data } = await supabase
      .from('messages')
      .select('*')
      .order('created_at', { ascending: true });
    setMessages(data || []);
  }

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map((msg) => (
          <Message key={msg.id} message={msg} currentUser={session.user.id} />
        ))}
        <div ref={scrollRef} />
      </div>
      <InputBar user={session.user} />
    </div>
  );
}

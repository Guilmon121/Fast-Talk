export default function Message({ message, currentUser }: any) {
  const isOwn = message.user_id === currentUser;
  return (
    <div className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}>
      <div className={`rounded-2xl px-4 py-2 max-w-xs ${isOwn ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}>
        {message.content}
      </div>
    </div>
  );
}

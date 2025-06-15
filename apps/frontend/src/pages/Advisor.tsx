import { useEffect, useState } from 'react';
import { fetchAdvisorMessages } from '../api';

interface Message {
  id: number;
  text: string;
}

export default function Advisor() {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    fetchAdvisorMessages().then((data) => setMessages(data));
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Advisor</h1>
      <ul className="list-disc pl-4">
        {messages.map((m) => (
          <li key={m.id} className="mb-2">
            {m.text}
          </li>
        ))}
      </ul>
    </div>
  );
}

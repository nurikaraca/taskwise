'use client';
import { Group, Message } from '@/type/types';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:4000');
const Chat = ({ selectedGroup }: { selectedGroup: Group }) => {


  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const session = useSession();
  const groupId = selectedGroup?.id;

  const messsageEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messsageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  useEffect(() => {
    // Fetch old messages from the server
    const fetchMessages = async () => {
      try {
        const response = await fetch(`http://localhost:4000/messages/${groupId}`);
        const data = await response.json();
        setMessages(data);
        scrollToBottom();
      } catch (error) {
        console.error('Mesajlar alınırken hata:', error);
      }
    };

    fetchMessages();

    //When a new message is received
    socket.on('receive_message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
      scrollToBottom();
    });


    return () => {
      socket.off('receive_message');
    };
  }, [groupId]);

  const handleSendMessage = async () => {
    if (newMessage.trim() !== '') {
      const message = {
        content: newMessage,
        senderId: session.data?.user.id,
        groupId,
      };

      try {
        //Send the message to the backend
        const response = await fetch('http://localhost:4000/messages', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(message),
        });

        if (response.ok) {
          setNewMessage(''); // Clear the message box
          scrollToBottom(); // Scroll to the bottom after sending a message
        }
      } catch (error) {
        console.error('Mesaj gönderilirken hata:', error);
      }
    }
  };


  return (
    <div className="h-full w-full flex flex-col items-center justify-center bg-lightBg2 dark:bg-darkBg text-lightText dark:text-darkText">
      {/* Mesaj Listesi */}
      <div className="flex-1 w-full p-4 xl:border rounded scroll-custom  overflow-y-auto">
        {messages.map((message: Message, index) => (
          <div key={`${message.id}-${index}`} className="flex items-start mb-4">
            <Image
              src={message.sender?.image || 'https://via.placeholder.com/150'}
              alt="user profile"
              className="w-14 h-14 rounded-full mr-3"
              width={300}
              height={300}
            />
            <div>
              <p className="font-bold text-xl">{message.sender?.name}</p>
              <p className="text-lg">{message.content}</p>
            </div>
          </div>
        ))}
        {/* Scroll reference element */}
        <div ref={messsageEndRef} />
      </div>

      {/* Send Message */}
      <div className="w-full p-4 flex ">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Write a message..."
          className="flex-1 p-2 rounded mr-2 border-0 "
        />
        <button
          onClick={handleSendMessage}
          className="bg-blue-500 text-white p-2 rounded"
        >
          Gönder
        </button>
      </div>
    </div>
  );
};

export default Chat;

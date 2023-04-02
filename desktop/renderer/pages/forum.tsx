import React, {useEffect, useState} from 'react'
import SideBar from '../components/sideBar'
import io from 'socket.io-client';
import jwt_decode from "jwt-decode";


function forum() {
    const [showSidebar, onSetShowSidebar] = useState(false);
    const [socket, setSocket] = useState(null);
    const [userId, setCivilianId] = useState("");
    const [userName, setUsername] = useState("")
    const [messages, setMessages] = useState([]);
    const [content, setContent] = useState('');
    const [roomId, setForumId] = useState(1); // replace 1 with the actual forum ID
    
    interface Token {
      id: string;
      role: string;
      username: string;
      badge: string;
    }
    
    useEffect(() => {
      const token = localStorage.getItem("token");
      const decodedToken = jwt_decode(token) as Token;
    
      if (decodedToken.role === "civilian") {
        setCivilianId(decodedToken.id);
        setUsername(decodedToken.username)
      }
    }, []);
    
    useEffect(() => {
      const newSocket = io('http://localhost:80');
    
      newSocket.on('connect', () => {
        newSocket.emit('join-room', roomId, userId);
        console.log('Connected to server');
      });
    
      newSocket.on('new-message', (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      });
    
      newSocket.on('new-post', (post) => {
        setMessages((prevMessages) => [...prevMessages, post]);
      });
    
      setSocket(newSocket);
    
      return () => {
        newSocket.disconnect();
      };
    }, [roomId, userId]);
    

    const createPost = () => {
      socket.emit('create-post', content);
      console.log(content)
      setContent('');
    };
    

    
    const handleCreatePost = (e: { preventDefault: () => void; }) => {
      e.preventDefault();
      createPost();
    };
    
  
    
  return (
  
  <div className="flex h-screen bg-[#1e1e1e]">
      <SideBar
        onSidebarHide={() => {
          onSetShowSidebar(true);
        } }
        showSidebar={showSidebar} />
    
    <div className="md:col-span-2 md:block w-full flex items-center justify-center ml-64 mt-20">
        <div className="w-full">
          <div className="chat chat-start">
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
              </div>
            </div>
            <div className="chat-header ">
              Obi-Wan Kenobi
              <time className="text-xs opacity-50">12:45</time>
            </div>
            <div className="chat-bubble chat-bubble-error">You were the Chosen One!</div>
            <div className="chat-footer opacity-50">
              Delivered
            </div>
          </div>
          <div className="chat chat-end">
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
              </div>
            </div>


{messages.map((message: { id: React.Key; content: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal; }) => (
<div key={message.id}  className="chat chat-start">
<div className="chat-image avatar">
  <div className="w-10 rounded-full">
  </div>
</div>
<div className="chat-header ">
{userName}
  <time className="text-xs opacity-50">12:45</time>
</div>
<div className="chat-bubble chat-bubble-error">{message.content}</div>

</div>

            ))}

            <form onSubmit={handleCreatePost}>

              <div className="flex items-center justify-between w-full p-3 border-t border-gray-300 mt-[49rem]">
                <button>
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-500" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                      d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </button>
                <button>
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                      d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                  </svg>
                </button>

                <input type="text" name="content" value={content} onChange={(e) => setContent(e.target.value)}
                  className="block w-[93rem] py-2 pl-4 mx-3 bg-gray-100 rounded-full outline-none focus:text-gray-700 z-10"
                  required />
                <button>
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                      d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                </button>
                <button type="submit">
                  <svg className="w-5 h-5 text-gray-500 origin-center transform rotate-90" xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20" fill="currentColor">
                    <path
                      d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                  </svg>
                </button>
              </div>
            </form>
            </div>
        </div>
      

      </div>
    </div>

    


    
  )
}

export default forum

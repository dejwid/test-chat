import {useEffect, useState} from 'react';
export default function Chat({username}) {
  const [messageText, setMessageText] = useState('');
  const [ws,setWs] = useState();
  useEffect(() => {
    const ws = new WebSocket(import.meta.env.VITE_API_URL.replace('http://','ws://').replace('https://', 'ws://'));
    ws.addEventListener('message', handleIncomingMessage);
    setWs(ws);
  }, []);
  async function handleIncomingMessage(ev) {
    console.log(await ev.data.text());
  }
  function sendMessage(ev) {
    ev.preventDefault();
    ws.send(messageText);
    setMessageText('');
  }
  return (
    <div className="flex min-h-screen">
      <div className="bg-white w-1/3">left</div>
      <div className="bg-blue-50 w-2/3">
        <form className="flex flex-col h-full" onSubmit={sendMessage}>
          <div className="flex-grow items-end flex">
            <div>message</div>
          </div>
          <div className="flex p-4 gap-2">
            <input className="flex-grow border p-2" type="text" placeholder="message" value={messageText} onChange={e => setMessageText(e.target.value)} />
            <button className="flex-grow bg-blue-500 text-white">send</button>
          </div>
        </form>
      </div>
    </div>
  );
}
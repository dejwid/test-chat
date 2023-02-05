import {useState} from 'react';
import Chat from "./Chat";
import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_API_URL;
axios.defaults.withCredentials = true;

function App() {
  const [username, setUsername] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  async function login(e) {
    e.preventDefault();
    await axios.post('/login', {username});
    setLoggedIn(true);
  }
  if (!loggedIn) {
    return (
      <div className="min-h-screen bg-blue-50 flex items-center">
        <form className="w-64 mx-auto" onSubmit={login}>
          <input type="text" placeholder="username" className="border p-2 block w-full" value={username} onChange={e => setUsername(e.target.value)}/>
          <button className="bg-blue-500 text-white block w-full mt-2 p-2">Login</button>
        </form>
      </div>
    );
  }
  return <Chat username={username} />;
}

export default App

import "./App.css";

import Login from "./Components/Login/Login";
import Chat from "./Components/Chat/Chat";
import useChat from "./Components/Chat/useChat";

function App() {
    const { user } = useChat();

    return (
        <div className="flex flex-col items-center justify-center bg-gray-800 min-h-screen ">
            {user ? <Chat /> : <Login />}
        </div>
    );
}

export default App;

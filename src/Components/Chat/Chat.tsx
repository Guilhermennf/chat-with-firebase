import { Logout, Send } from "@mui/icons-material";
import { auth } from "../../../firebase";
import useChat from "./useChat";

export default function Chat() {
    const {
        user,
        messages,
        newMessage,
        setNewMessage,
        messagesEndRef,
        sendMessage,
    } = useChat();

    return (
        <div className="max-w-2xl w-full flex flex-col h-[90vh] p-3">
            <div
                key={user?.uid}
                className="flex items-center gap-2 justify-between"
            >
                <>
                    <img
                        className="w-10 h-10 rounded-full"
                        src={user?.photoURL ?? ""}
                        alt={`Profile of ${user?.displayName}`}
                    />
                    <div className="text-white mr-auto">
                        {user?.displayName}
                    </div>
                </>

                <button
                    className="bg-red-600 text-white rounded-[10px] hover:bg-red-700 p-3"
                    onClick={() => auth.signOut()}
                    title="Logout"
                >
                    <Logout />
                </button>
            </div>
            <div className="flex flex-col gap-3 mt-2 overflow-y-auto flex-grow max-h-[80vh] scrollbar-thin scrollbar-webkit scrollbar-thumb-slate-500">
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={`message flex ${
                            msg.data.uid === user?.uid
                                ? "justify-end pr-1"
                                : "justify-start"
                        }`}
                    >
                        <div
                            className={`message flex flex-row p-3 gap-3 rounded-[15px] items-center ${
                                msg.data.uid === user?.uid
                                    ? "text-white bg-blue-500"
                                    : "bg-white"
                            }`}
                        >
                            <div className="flex flex-col max-w-[400px]">
                                <div className="flex items-center mb-2">
                                    <img
                                        className="w-10 h-10 rounded-full"
                                        src={msg.data.photoURL}
                                        alt={`Profile of ${user?.displayName}`}
                                    />
                                    <span className="ml-2">
                                        {msg.data.displayName.split(" ")[0]}
                                    </span>
                                </div>
                                <div className="break-all">{msg.data.text}</div>
                            </div>
                        </div>
                    </div>
                ))}

                <div ref={messagesEndRef}></div>
            </div>

            <div className="flex mt-4">
                <div className="flex-grow">
                    <input
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        className="w-full bg-gray-300 px-3 rounded-xl h-12"
                        type="text"
                        placeholder="Type your message here..."
                    />
                </div>

                <div className="ml-2">
                    <button
                        className="text-white bg-blue-500 hover:bg-blue-600 rounded-[10px] px-3 m-0 h-12"
                        onClick={sendMessage}
                    >
                        <Send />
                    </button>
                </div>
            </div>
        </div>
    );
}

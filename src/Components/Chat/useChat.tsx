import { User, onAuthStateChanged } from "@firebase/auth";
import {
    addDoc,
    collection,
    serverTimestamp,
    query,
    orderBy,
    onSnapshot,
    getFirestore,
} from "@firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { app, auth } from "../../../firebase";
import { IMessages } from "../../Interfaces/userInterface";

const db = getFirestore(app);

export default function useChat() {
    const [user, setUser] = useState<User>();
    const [messages, setMessages] = useState<Array<IMessages>>([]);
    const [newMessage, setNewMessage] = useState("");
    const [latestMessageId, setLatestMessageId] = useState<string | null>(null);

    // const { theme, themeStyles, toggleTheme } = Theme();

    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    function scrollToBottom() {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({
                behavior: "smooth",
            });
        }
    }

    async function sendMessage() {
        if (user && newMessage.trim() !== "") {
            await addDoc(collection(db, "messages"), {
                uid: user.uid,
                photoURL: user.photoURL,
                displayName: user.displayName,
                text: newMessage,
                timestamp: serverTimestamp(),
            });

            setNewMessage("");
        }
    }
    useEffect(() => {
        const queryMessages = query(
            collection(db, "messages"),
            orderBy("timestamp")
        );

        const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
            setMessages(
                snapshot.docs.map((doc) => ({
                    id: doc.id,
                    data: doc.data(),
                })) as []
            );

            if (snapshot.docs.length > 0) {
                setLatestMessageId(snapshot.docs[snapshot.docs.length - 1].id);
            }

            scrollToBottom();
        });

        scrollToBottom();

        return unsubscribe;
    }, []);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(undefined);
            }
        });
    }, []);

    useEffect(() => {
        if (latestMessageId) {
            scrollToBottom();
        }
    }, [latestMessageId]);

    return {
        user,
        setUser,
        messages,
        setMessages,
        newMessage,
        setNewMessage,
        messagesEndRef,
        latestMessageId,
        setLatestMessageId,
        scrollToBottom,
        sendMessage,
    };
}

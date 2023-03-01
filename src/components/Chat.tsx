import React, { ChangeEvent, FormEvent, memo, useState } from "react";
import "../chat.css";

import { View } from "./View";

// hooks
import { useSocket } from "../hooks/useSocket";

type PropsType = {
    nickName: string;
};

function Chat({ nickName }: PropsType) {
    const [message, setMessage] = useState("");
    const { msgList, sendMessage } = useSocket(nickName);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setMessage("");
        sendMessage(message);
    };

    const handleMessageChange = (e: ChangeEvent<HTMLInputElement>) => {
        setMessage(e.target.value);
    };

    return (
        <section className="chat-container">
            <View messages={msgList} />
            <div>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={message}
                        onChange={handleMessageChange}
                        className="input-content"
                    />
                    <button>전송</button>
                </form>
            </div>
        </section>
    );
}

export default Chat;

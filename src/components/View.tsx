import React, { useEffect, useRef } from "react";

// type
import { MsgType } from "../types";

type ViewProps = { messages: MsgType[] };

export const View = ({ messages }: ViewProps) => {
    const chat = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!chat.current) return;

        chat.current.scrollTop = chat.current.scrollHeight;
    }, [messages]);

    return (
        <div className="contents" ref={chat}>
            {messages.map((msg, i) => {
                if (msg.type === "message") {
                    return (
                        <div className="message" key={i}>
                            <span>{msg.id}</span>
                            <p>{msg.content}</p>
                        </div>
                    );
                } else {
                    return <span>{msg.content}</span>;
                }
            })}
        </div>
    );
};

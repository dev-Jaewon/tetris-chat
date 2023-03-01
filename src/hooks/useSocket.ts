import { useEffect, useRef, useState } from "react";

// type
import { MsgType } from "../types";

export const useSocket = (nickName: string) => {
    const ws = useRef<WebSocket>();
    const [msgList, setMsgList] = useState<MsgType[]>([]);

    useEffect(() => {
        if (!nickName) return;

        ws.current = new WebSocket(import.meta.env.VITE_SOCKET_CAHT_SERVER);

        ws.current.onopen = () => {
            if (ws?.current?.readyState !== WebSocket.OPEN) return;

            const session = window.location.hash.split("#")[1];

            if (session) {
                ws.current.send(
                    JSON.stringify({
                        type: "join",
                        id: nickName,
                        session,
                    })
                );
            }
        };

        ws.current.onmessage = (e) => {
            setMsgList((preValue) => [...preValue, JSON.parse(e.data)]);
        };
    }, [nickName]);

    const sendMessage = (content: string) => {
        if (!ws.current) return;

        const session = window.location.hash.split("#")[1];

        if (session) {
            ws.current.send(
                JSON.stringify({
                    type: "message",
                    id: nickName,
                    content,
                })
            );
        } else {
            const message: MsgType = {
                type: "message",
                id: nickName,
                content,
            };
            setMsgList((preValue) => [...preValue, message]);
        }
    };

    return { msgList, sendMessage };
};

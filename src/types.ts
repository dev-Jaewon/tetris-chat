export type messageType = "message" | "notification";

export type MsgType = { type: messageType; id?: string; content: string };

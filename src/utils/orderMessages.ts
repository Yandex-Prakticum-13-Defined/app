import { IDBMessageData } from '../store/slice/forumSlice';

export interface IDBMessageDataEx extends IDBMessageData {
  responseTo: number;
  offsetLevel?: number;
}

export const orderMessages = (messages: IDBMessageDataEx[], parentMessageId: number, offsetLevel?: number) => {
  const sortMessages: IDBMessageDataEx[] = [];
  const childrenMessages = messages.filter((msg) => msg.responseTo === parentMessageId);

  if (childrenMessages.length) {
    for (const msg of childrenMessages) {
      sortMessages.push(
        { ...msg, offsetLevel },
        ...orderMessages(messages, msg.id, (offsetLevel || 0) + 1)
      );
    }
  }

  return sortMessages;
};

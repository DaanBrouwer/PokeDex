export type FlashMessageType = 'info' | 'warning' | 'error' | 'success';

export type FlashMessageData = {
  id: number;
  text: string;
  type: FlashMessageType;
};

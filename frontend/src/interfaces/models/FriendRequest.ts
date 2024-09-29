export interface FriendRequest {
  id: number;
  sender: { id: number };
  receiver: { id: number };
  skillSender?: { id: number };
  skillReceiver?: { id: number };
  status: string;
  message?: string;
  createdAt: Date;
  responseAt?: Date;
}

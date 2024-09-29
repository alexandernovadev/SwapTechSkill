export interface FriendRequest {
  id: number;
  sender: { id: number };
  receiver: { id: number };
  skillSender?: { id: number; skillName?: string };
  skillReceiver?: { id: number,skillName?: string };
  status: string;
  message?: string;
  createdAt: Date;
  responseAt?: Date;
}

export interface FriendRequest {
  id: number;
  sender: {id: number};
  receiver: {id: number};
  status: string;
  message?: string;
  createdAt: Date;
  responseAt?: Date; 
}



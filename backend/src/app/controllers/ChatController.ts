import { Request, Response } from 'express';
import { ChatRepository } from '../../domain/repositories/ChatRepository';
import { ChatParticipantRepository } from '../../domain/repositories/ChatParticipantRepository';
import { FriendRequestRepository } from '../../domain/repositories/FriendRequestRepository';

const chatRepository = new ChatRepository();
const chatParticipantRepository = new ChatParticipantRepository();
const friendRequests = new FriendRequestRepository();

export class ChatController {
  static  getMyChats = async (req: Request, res: Response) => {
    try {
      const userId = +req.params.id;

      console.log('userId', userId);
      

      // 4 - buscar ese chat en FriendRequestRepository y que es status sea accepted

      const chatParticipants = await chatParticipantRepository.findUniqueChatIdsByUserId(userId);
      const myChats = await chatRepository.findActiveChatsByIds(chatParticipants);


      console.log('myChats', myChats);
        

      res.status(200).json({ chats: myChats });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
}

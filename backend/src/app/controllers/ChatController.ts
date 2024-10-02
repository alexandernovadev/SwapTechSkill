import { Request, Response } from 'express';
import { ChatRepository } from '../../domain/repositories/ChatRepository';
import { ChatParticipantRepository } from '../../domain/repositories/ChatParticipantRepository';
import { FriendRequestRepository } from '../../domain/repositories/FriendRequestRepository';
import { MessageRepository } from '../../domain/repositories/MessageRepository';
import { Message } from '../../domain/entity/Message';

const chatRepository = new ChatRepository();
const chatParticipantRepository = new ChatParticipantRepository();
const friendRequests = new FriendRequestRepository();
const messageRepository = new MessageRepository();

export class ChatController {
  static getMyChats = async (req: Request, res: Response) => {
    try {
      const userId = +req.params.id;
      // 4 - buscar ese chat en FriendRequestRepository y que es status sea accepted
      const chatParticipants =
        await chatParticipantRepository.findUniqueChatIdsByUserId(userId);
      const myChats =
        await chatRepository.findActiveChatsByIds(chatParticipants);

      res.status(200).json({ chats: myChats });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  // save message
  static saveMessage = async (req: Request, res: Response) => {
    try {
      const { chatId, userId, content } = req.body;

      const newMessage = new Message();
      newMessage.chat = chatId;
      newMessage.sender = userId;
      newMessage.content = content;

      const save = await messageRepository.save(newMessage);

      res.status(200).json({ message: save });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
}

import { CreateMessageModel, MessageModel } from '@/models/forum.model';
import { ownApi, ApiResponse } from '../client';

export const MessageService = {
  getById(id: number): Promise<ApiResponse<MessageModel>> {
    return ownApi.get(`/messages/${id}`);
  },
  create(message: CreateMessageModel): Promise<ApiResponse<MessageModel>> {
    return ownApi.post(`/messages`, message);
  },
};

import { CreateThreadModel, ThreadModel } from '@/models/forum.model';
import { ownApi, ApiResponse } from '../client';

export const ThreadService = {
  getById(id: number): Promise<ApiResponse<ThreadModel>> {
    return ownApi.get(`/threads/${id}`);
  },
  create(thread: CreateThreadModel): Promise<ApiResponse<ThreadModel>> {
    return ownApi.post(`/threads`, thread);
  },
};

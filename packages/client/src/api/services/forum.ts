import { CreateForumModel, ForumModel } from '@/models/forum.model';
import { ownApi, ApiResponse } from '../client';

export const ForumService = {
  getAll(): Promise<ApiResponse<ForumModel[]>> {
    return ownApi.get('/forums');
  },
  getById(id: number): Promise<ApiResponse<ForumModel>> {
    return ownApi.get(`/forums/${id}`);
  },
  create(forum: CreateForumModel): Promise<ApiResponse<ForumModel>> {
    return ownApi.post(`/forums`, forum);
  },
};

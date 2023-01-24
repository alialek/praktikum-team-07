export interface MessageModel {
  id: number;
  nickname: string;
  message: string;
  createdAt: string;
  threadId: number;
}

export interface CreateMessageModel {
  nickname: MessageModel['nickname'];
  message: MessageModel['message'];
  threadId?: MessageModel['threadId'];
}

export interface ThreadModel {
  id: number;
  name: string;
  description: string;
  forumId: number;
  messageCount: number;
  messages?: MessageModel[];
}

export interface CreateThreadModel {
  name: ThreadModel['name'];
  description?: ThreadModel['description'];
  forumId: ThreadModel['forumId'];
}

export interface ForumModel {
  id: number;
  title: string;
  description: string;
  threadCount: number;
  messageCount: number;
  threads?: ThreadModel[];
}

export interface CreateForumModel {
  title: ForumModel['title'];
  description?: ForumModel['description'];
}

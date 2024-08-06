export interface IReply {
    id: number;
    uid: string;
    unickname: string;
    boardId: number;
    category: string;
    replyContent: string;
    parentId: number;
    replyFile: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string;
    replies?: Array<IReply>;
    isDeleted: boolean;
}

export class CreateCommentDto {
    uid: string;
    unickname: string;
    replyContent: string;
    parentId?: number;
    replyFile?: string;
}
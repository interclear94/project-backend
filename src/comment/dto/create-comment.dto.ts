export class CreateCommentDto {
    replyContent: string;
    uid?: string;
    unickname?: string;
    parentId?: number;
    replyFile?: string;
}
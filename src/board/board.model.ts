export interface IBoard {
    boardTitle : string,
    boardContent : string,
    boardView: string,
    boardDate: Date,
    uid:string,
    unickname:string,
    boardStatus: boolean,
    boardFile?: string,
    category:string,
}

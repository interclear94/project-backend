import { AutoIncrement, BelongsTo, Column, DataType, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import { Board } from "src/board/entities/board.entity";


@Table({
    tableName: "comment",
    timestamps: true,
    paranoid: true
})
export class Reply extends Model<Reply>{
     // 댓글 인덱스
     @PrimaryKey
     @AutoIncrement
     @Column({
         type: DataType.INTEGER,
         allowNull: false
     })
     id!: number;
 
     // 추후 User 테이블과 관계 맺을 예정
     // 댓글 작성자 아이디
     @Column({
         type : DataType.STRING,
         allowNull : false
     })
     uid!: string
     
     // 댓글 작성자 닉네임
     @Column({
         type : DataType.STRING,
         allowNull : false
     })
     unickname! : string
 
     // 본문 글 인덱스
     @ForeignKey(()=>Board)
     @Column({
         type: DataType.INTEGER,
         allowNull: false
     })
     contentId : number
 
     // 댓글 내용
     @Column({
         type: DataType.STRING,
         allowNull:false
     })
     comment:string
 
     // 부모 댓글
     @ForeignKey(()=> Reply)
     @Column({
         type: DataType.INTEGER,
         allowNull: true
     })
     parentId?:number;
 
     // 댓글 사진
     @Column({
         type: DataType.STRING,
         allowNull: true
     })
     commentImg?: string
 
     // 본문과 댓글 연결
     @BelongsTo(()=>Board)
     board!: Board;
 
     @BelongsTo(()=>Reply)
     replies!:Comment[];
}

// 게시판 테이블 생성

import { AutoIncrement, BelongsTo, Column, DataType, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript"
import { User } from "src/users/entities/users.entity"

@Table({
    tableName: "board",
    timestamps: true,
    paranoid: true,
})
export class Board extends Model<Board> {
    // id(인덱스)
    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    id!: number;

    // 제목
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    boardTitle!: string;

    // 본문
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    boardContent!: string;

    // 조회수
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        defaultValue: 0,
    })
    boardView!: string;

    // 유저 아이디
    @ForeignKey(()=> User)
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    uid!: string;

    // 유저 닉네임
    @ForeignKey(()=> User)
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    unickname!: string;

    // 카테고리
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    categiries: string;

    // 파일
    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    boardFile: string;

    // User table의 uid와 Borad table의 uid를 연결
    @BelongsTo(() => User, { foreignKey: 'uid' })
    user!: User;


    @BelongsTo(() => User, { foreignKey: 'unickname' })
    userNickname!: User;
}

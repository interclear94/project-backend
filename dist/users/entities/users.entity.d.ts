import { Model } from "sequelize-typescript";
export declare class User extends Model<User> {
    id: number;
    uid: string;
    upw: string;
    unickname: string;
    uemail: string;
    uphone: number;
    isAdmin: boolean;
    uprofile?: string;
    umessage?: string;
}

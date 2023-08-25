import { Document, Schema, model } from "mongoose";

export interface IUser extends Document {
    username: string;
    hashedPassword: string;
    salt: string;
    role: string;
    email: string;
    createdAt: Date;
    createdBy: string;
}

const userSchema = new Schema<IUser>({
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    hashedPassword: {type: String, required: true},
    salt: {type: String, required: true},
    role: {type: String, required: true},
    createdAt: {type: Date, default: Date.now},
    createdBy: {type: String, required: true}
});

export default model<IUser>('User', userSchema);
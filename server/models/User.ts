import { Document, Schema, model } from "mongoose";

export interface IUser extends Document {
    username: string;
    email: string;
}

const userSchema = new Schema<IUser>({
    username: {type: String, required: true},
    email: {type: String, required: true}
});

export default model<IUser>('User', userSchema);
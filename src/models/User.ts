import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
    houseId: mongoose.Types.ObjectId;
    name: string;
    email?: string;
    password?: string;
    avatarUrl?: string;
    role: 'admin' | 'player';
    points: number;
    createdAt: Date;
}

const UserSchema = new Schema<IUser>({
    houseId: { type: Schema.Types.ObjectId, ref: 'House', required: true },
    name: { type: String, required: true },
    email: { type: String, sparse: true, unique: true },
    password: { type: String },
    avatarUrl: { type: String },
    role: { type: String, enum: ['admin', 'player'], default: 'player' },
    points: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

import mongoose, { Schema, Document } from 'mongoose';

export interface IHouse extends Document {
    name: string;
    createdAt: Date;
}

const HouseSchema = new Schema<IHouse>({
    name: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.House || mongoose.model<IHouse>('House', HouseSchema);

import mongoose, { Schema, Document } from 'mongoose';

export interface IChore extends Document {
    houseId: mongoose.Types.ObjectId;
    name: string;
    points: number;
    repeatType: 'daily' | 'weekly' | 'monthly' | 'once';
    active: boolean;
    kidsOnly: boolean;
    createdAt: Date;
}

const ChoreSchema = new Schema<IChore>({
    houseId: { type: Schema.Types.ObjectId, ref: 'House', required: true },
    name: { type: String, required: true },
    points: { type: Number, required: true },
    repeatType: { type: String, enum: ['daily', 'weekly', 'monthly', 'once'], default: 'once' },
    active: { type: Boolean, default: true },
    kidsOnly: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Chore || mongoose.model<IChore>('Chore', ChoreSchema);

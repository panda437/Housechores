import mongoose, { Schema, Document } from 'mongoose';

export interface IReward extends Document {
    houseId: mongoose.Types.ObjectId;
    name: string;
    pointsRequired: number;
    active: boolean;
    createdAt: Date;
}

const RewardSchema = new Schema<IReward>({
    houseId: { type: Schema.Types.ObjectId, ref: 'House', required: true },
    name: { type: String, required: true },
    pointsRequired: { type: Number, required: true },
    active: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Reward || mongoose.model<IReward>('Reward', RewardSchema);

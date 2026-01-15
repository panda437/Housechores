import mongoose, { Schema, Document } from 'mongoose';

export interface IChoreLog extends Document {
    choreId: mongoose.Types.ObjectId;
    userId: mongoose.Types.ObjectId;
    houseId: mongoose.Types.ObjectId;
    completedAt: Date;
    photoUrl?: string;
    points: number; // Snapshot of points at completion
}

const ChoreLogSchema = new Schema<IChoreLog>({
    choreId: { type: Schema.Types.ObjectId, ref: 'Chore', required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    houseId: { type: Schema.Types.ObjectId, ref: 'House', required: true },
    completedAt: { type: Date, default: Date.now },
    photoUrl: { type: String },
    points: { type: Number, required: true },
});

export default mongoose.models.ChoreLog || mongoose.model<IChoreLog>('ChoreLog', ChoreLogSchema);

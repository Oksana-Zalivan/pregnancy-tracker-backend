import { model, Schema } from 'mongoose';

const sessionSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'user', required: true },
    accsessToken: { type: String, required: true },
    refreshToken: { type: String, required: true },

    accsessTokenValidUntil: { type: Date, required: true },
    refreshTokenValidUntil: { type: Date, required: true },
  },
  { timestamps: true },
);

export const Session = model('Session', sessionSchema);

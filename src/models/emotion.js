import { model, Schema } from 'mongoose';

const emotionSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

export const Emotion = model('Emotion', emotionSchema, 'emotions');
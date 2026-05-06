import { model, Schema } from 'mongoose';

const emotionSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      default: '',
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

export const Emotion = model('Emotion', emotionSchema, 'emotions');

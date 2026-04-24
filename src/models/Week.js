import { model, Schema } from "mongoose";

const babyWeekSchema = new Schema(
  {
    analogy: {
      type: String,
      default: null,
    },
    weekNumber: {
      type: Number,
      required: true,
      unique: true,
    },
    babySize: {
      type: Number,
      required: true,
    },
    babyWeight: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    babyActivity: {
      type: String,
      required: true,
    },
    babyDevelopment: {
      type: String,
      required: true,
    },
    interestingFact: {
      type: String,
      required: true,
    },
    momDailyTips: {
      type: [String],
      default: [],
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

const momWeekSchema = new Schema(
  {
    weekNumber: {
      type: Number,
      required: true,
      unique: true,
    },
    feelings: {
      states: {
        type: [String],
        default: [],
      },
      sensationDescr: {
        type: String,
        required: true,
      },
    },
    comfortTips: [
      {
        category: {
          type: String,
          required: true,
        },
        tip: {
          type: String,
          required: true,
        },
        _id: false,
      },
    ],
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

export const BabyWeek = model("BabyWeek", babyWeekSchema, "babyStates");
export const MomWeek = model("MomWeek", momWeekSchema, "momStates");

import mongoose, { Schema } from "mongoose";

const subscriptionSchema = new Schema(
  {
    subscriber: {
      type: Schema.Types.ObjectId, // wo jo subscribe kre ga
      ref: "User",
      // required: true,
    },
    channel: {
      type: Schema.Types.ObjectId, // channel ke id
      ref: "Channel",
      // required: true,
    },
  },
  { timestamps: true }
);

export const Subscription = mongoose.model("Subscription", subscriptionSchema);

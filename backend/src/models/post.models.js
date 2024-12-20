import mongoose, { Schema } from "mongoose";
import aggregatePaginate from "mongoose-aggregate-paginate-v2";

const postSchema = new Schema(
    {
        title: { type: String, required: true },
        content: { type: String, required: true },
        image: { type: String },
        owner: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    { timestamps: true }
);

postSchema.plugin(aggregatePaginate);

export const Post = mongoose.model("Post", postSchema);

import { Post } from "../models/post.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiError } from "../utils/ApiError.js";

const createPost = asyncHandler(async (req, res) => {
    const { title, content } = req.body;
    try {
        let imageUrl;

        // Handle image upload if provided
        if (req.files && req.files.image) {
            const file = req.files.image;
            const uploadResult = await uploadOnCloudinary(file.data, "Quleep");
            imageUrl = uploadResult.secure_url;
        }

        const newPost = await Post.create({
            title,
            content,
            image: imageUrl,
            owner: req.user._id,
        });
        res.status(201).json(
            new ApiResponse(201, newPost, "Post created successfully")
        );
    } catch (error) {
        console.error("Error creating post:", error);
        throw new ApiError(500, "Failed to create post");
    }
});

const getAllPosts = asyncHandler(async (req, res) => {
    const posts = await Post.find({ owner: req.user._id }).populate(
        "owner",
        "username email avatar"
    );

    // Get the total number of posts
    const totalPosts = await Post.countDocuments({ owner: req.user._id });

    res.status(200).json(
        new ApiResponse(
            200,
            { posts, "Total posts: ": totalPosts },
            "Posts retrieved successfully"
        )
    );
});
const getAllPostAvailable = asyncHandler(async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 9;

        const aggregateQuery = Post.aggregate([
            {
                $project: {
                    title: 1,
                    content: 1,
                    image: 1,
                    userId: 1,
                    owner: 1,
                    createdAt: 1,
                },
            },
            { $sort: { createdAt: -1 } }, // Sort by latest posts
        ]);

        const options = {
            page,
            limit,
        };

        // Use aggregate paginate
        const result = await Post.aggregatePaginate(aggregateQuery, options);

        res.status(200).json({
            message: "Posts fetched successfully",
            data: result.docs, // The actual posts
            totalPages: result.totalPages,
            currentPage: result.page,
            prevPage: result.prevPage || null,
            nextPage: result.nextPage || null,
        });
    } catch (error) {
        console.error("Error fetching posts:", error);
        res.status(500).json({
            message: "Failed to fetch posts",
        });
    }
});

const getPostById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const post = await Post.findById(id).populate("owner", "username email");

    if (!post) {
        return res
            .status(404)
            .json(new ApiResponse(404, null, "Post not found"));
    }

    res.status(200).json(
        new ApiResponse(200, post, "Post retrieved successfully")
    );
});

const updatePostById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;

    try {
        let imageUrl;

        // Retrieve the existing post to get the current image URL
        const existingPost = await Post.findById(id);
        if (!existingPost) {
            throw new ApiError(404, "Post not found");
        }

        if (req.files && req.files.image) {
            const file = req.files.image;
            const uploadResult = await uploadOnCloudinary(file.data, "Quleep");
            imageUrl = uploadResult.secure_url;
        } else {
            imageUrl = existingPost.image;
        }

        const updatedPost = await Post.findByIdAndUpdate(
            id,
            { title, content, image: imageUrl },
            { new: true, runValidators: true }
        );

        res.status(200).json(
            new ApiResponse(200, updatedPost, "Post updated successfully")
        );
    } catch (error) {
        console.error("Error updating post:", error);
        throw new ApiError(500, "Failed to update post");
    }
});

const deletePostById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const deletedPost = await Post.findByIdAndDelete(id);

    if (!deletedPost) {
        return res
            .status(404)
            .json(new ApiResponse(404, null, "Post not found"));
    }

    res.status(200).json(
        new ApiResponse(200, {}, `Post with id ${id} deleted successfully`)
    );
});

export {
    createPost,
    getAllPosts,
    getPostById,
    updatePostById,
    deletePostById,
    getAllPostAvailable,
};

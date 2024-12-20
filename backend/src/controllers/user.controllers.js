import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.models.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import uploadOnCloudinary, {
    deleteImageFromCloudinary,
} from "../utils/cloudinary.js";

const generateAccessAndRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId);

        const refreshToken = await user.generateRefreshToken();
        const accessToken = await user.generateAccessToken();

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });
        //validateBeforeSave:false = jisse validation check na ho kyouki we didnt give all fields here

        return { accessToken, refreshToken };
    } catch (error) {
        throw new ApiError(
            500,
            "Something went wrong while generating refresh and access tokens"
        );
    }
};
const registerUser = asyncHandler(async (req, res) => {
    const { fullName, email, username, password, cpassword } = req.body;

    if (
        [fullName, email, username, password, cpassword].some(
            (field) => field?.trim() === ""
        )
    ) {
        throw new ApiError(400, "All field are required");
    }

    const existedUser = await User.findOne({
        $or: [{ username }, { email }], // check if user already exists
    });

    if (existedUser) {
        throw new ApiError(409, "User with email or username already exists");
    }

    if (password !== cpassword) {
        throw new ApiError(400, "Password and Confirm Password does not match");
    }

    const user = await User.create({
        fullName,
        username: username.toLowerCase(),
        email,
        password,
    });

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    );

    console.log(createdUser);
    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering user!");
    }

    res.status(201).json(
        new ApiResponse(200, createdUser, "User Registered Successfully :)")
    );
});

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!(email && password)) {
        throw new ApiError(400, "Email and Password is required");
    }

    const user = await User.findOne({ email });

    if (!user) {
        throw new ApiError(400, "User not exists");
    }

    const isPassValid = await user.isPasswordCorrect(password);

    if (!isPassValid) {
        throw new ApiError(401, "Invalid credentials");
    }

    const { refreshToken, accessToken } = await generateAccessAndRefreshToken(
        user._id
    );

    const loggedInUser = await User.findById(user._id).select(
        "-password -refreshToken"
    );

    const options = {
        httpOnly: true,
        secure: true,
    };

    console.log("loggedInUser: ", loggedInUser);
    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("resfreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                200,
                {
                    user: loggedInUser,
                    accessToken,
                    refreshToken,
                },
                "User successfully logged In"
            )
        );
});

const logoutUser = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshToken: 1,
            },
        },
        {
            new: true,
        }
    );

    // now remove from cache

    const options = {
        httpOnly: true,
        secure: true,
    };

    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, {}, "User logged Out"));
});

const createNewPassword = asyncHandler(async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    const user = await User.findById(req.user?._id);
    const isPasswordCorrect = user.isPasswordCorrect(oldPassword);

    if (!isPasswordCorrect) {
        throw new ApiError(400, "Invalid Password");
    }

    user.password = newPassword;
    await user.save({ validateBeforeSave: false });

    return res
        .status(200)
        .json(new ApiResponse(200, {}, "Password Changed Successfully"));
});

const getCurrentUser = asyncHandler(async (req, res) => {
    return res
        .status(200)
        .json(
            new ApiResponse(200, req.user, "Current User fetched Successfully")
        );
});

const uploadAvatar = asyncHandler(async (req, res) => {
    let avatarPath = req.files.avatar;

    if (!avatarPath) {
        throw new ApiError(404, "Avatar is required");
    }

    const uploadResult = await uploadOnCloudinary(
        avatarPath.data,
        "Quleep/users/avatar"
    );
    avatarPath = uploadResult.secure_url;

    const user = await User.findByIdAndUpdate(
        req.user._id,
        { avatar: avatarPath },
        { new: true }
    );

    return res
        .status(200)
        .json(new ApiResponse(200, user, "Avatar uploaded successfully"));
});
const updateAvatar = asyncHandler(async (req, res) => {
    let avatarPath = req.files.avatar;
    console.log(avatarPath);

    if (!avatarPath) {
        throw new ApiError(404, "Avatar is required");
    }

    const user = await User.findById(req.user._id);

    if (user.avatar) {
        await deleteImageFromCloudinary(user.avatar);
    }

    const uploadResult = await uploadOnCloudinary(
        avatarPath.data,
        "Quleep/users/avatar"
    );

    if (!uploadResult) {
        throw new ApiError(500, "Failed to upload image");
    }
    avatarPath = uploadResult.secure_url;

    const updatedData = await User.findByIdAndUpdate(
        req.user._id,
        { avatar: avatarPath },
        { new: true }
    );

    return res
        .status(200)
        .json(new ApiResponse(200, updatedData, "Avatar updated successfully"));
});

export {
    registerUser,
    loginUser,
    logoutUser,
    createNewPassword,
    getCurrentUser,
    uploadAvatar,
    updateAvatar,
};

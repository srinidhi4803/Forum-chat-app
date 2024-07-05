import User from "../models/user.model.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"

const registerUser = async (req, res) => {
  const { fullname, username, email, password } = req.body

  if (
    [fullname, username, email, password].some((field) => field?.trim() == "")
  ) {
    throw new ApiError(400, "All fields are required")
  }

  const existingUser = await User.findOne({
    $or: [{ username }, { email }],
  }).select("-password")

  if (existingUser?.username == username) {
    //throw new ApiError(409,"User already exists");
    return res
      .status(409)
      .json({ message: "User with this username already exists" })
  }
  if (existingUser?.email == email) {
    //throw new ApiError(409,"User already exists");
    return res
      .status(409)
      .json({ message: "User with this email already exists" })
  }

  const newUser = await User.create({
    fullname,
    username,
    email,
    password,
  })

  const createdUser = await User.findById(newUser._id).select("-password")

  if (!createdUser) {
    //throw new ApiError(500,"User not created");
    return res.status(200).json({ message: "something went wrong" })
  }

  res.status(201).json(new ApiResponse(201, "User created", createdUser))
}

const loginUser = async (req, res) => {
  const { email, password } = req.body

  if ([email, password].some((field) => field?.trim() == "")) {
    //throw new ApiError(400,"All fields are required");
   return res.status(200).json("all fields are required")
  }

  const user = await User.findOne({ email })
  if (!user) {
    //throw new ApiError(409,"User Not Found");
    return  res.status(200).json("User Not Found")
  } else {
    const isUserMatched = await user.isPasswordMatch(password)
    console.log("match" + isUserMatched)
    if (!isUserMatched) {
      //throw new ApiError(40,"Invalid credentials");
     return  res.status(400).json({ message: "Invalid credentials" })
    }

    //generate token
    const token = user.generateToken()

 return res
      .status(200)
      .cookie("Bearer", token, {
        httpOnly: true,
        secure: true,
        sameSite: "Strict",
        maxAge: 3600000,
      })
      .json(new ApiResponse(200, "User logged in", user))
  }
}

const logOut = async (req, res) => {
  res.clearCookie("Bearer", {
    httpOnly: true,
    secure: true,
    sameSite: "Strict",
  })
  res.status(200).json(new ApiResponse(200, "User logged out"))
}

export { registerUser, loginUser, logOut }

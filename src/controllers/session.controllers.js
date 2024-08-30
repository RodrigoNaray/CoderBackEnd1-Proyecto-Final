import { createToken } from "../utils/jwt.js";
import { resUserDto } from "../dto/user.dto.js";

const register =  async (req, res) => {
  try {
    res.status(201).json({ status: "ok", msg: "User created" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", msg: "Internal server error" });
  }
}

const login =  async (req, res) => {
  try {
    const token = createToken(req.user);

    res.cookie("token", token, { httpOnly: true });
    
    return res.status(200).json({ status: "ok", payload: req.user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", msg: "Internal server error" });
  }
}

const googleLogin =  async (req, res) => {
  try {
    return res.status(200).json({ status: "ok", payload: req.user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", msg: "Internal server error" });
  }
}

const current =  async (req, res) => {
  const userData = req.user
  const user = await resUserDto(userData);
  res.status(200).json({ status: "ok", user });
}

export default { 
  register, 
  login, 
  googleLogin, 
  current 
}
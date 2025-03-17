import User from "../model/userSchema.js";

export const createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password || !role) {
      return res.status(422).json({ error: "Please fill all the fields" });
    }
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(422).json({ error: "User already exists" });
    }
    const user = new User({ name, email, password, role });
    await user.save();
    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    console.log("error occured on createUser", error);
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Please fill all the fields" });
    }
    const existingUser = await User.findOne({ email: email });
    console.log(existingUser);

    if (!existingUser) {
      return res.status(400).json({ error: "Invalid credentials" });
    }
    if (existingUser.password !== password) {
      return res.status(400).json({ error: "Invalid credentials" });
    }
    res.status(200).json({ message: "Login successful", user: existingUser });
  } catch (error) {
    console.log("error occured on loginUser", error);
  }
};

export const getAllTeacher = async (req, res) => {
  const teachers = await User.find({ role: "teacher" });
  if (!teachers) {
    return res.status(400).json({ message: "No teacher found" });
  }
  res.status(200).json({ message: "All teachers found", teachers });
};

export const getAllStudents = async (req, res) => {
  const student = await User.find({ role: "student" });
  if (!student) {
    return res.status(400).json({ message: "No student found" });
  }
  res.status(200).json({ message: "All student found", student });
};

export const deletById = async (req, res) => {
  try {
    const { id } = req.query;
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(400).json({ message: "No user found" });
    }
    res.status(200).json({ message: "User deleted successfully", user });
  } catch (error) {
    console.log("error occured on deletById", error);
  }
};

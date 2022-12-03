const bcrypt = require("bcrypt");

/**
 * CRUD
 */

const User = require("../Models/User");

// CREATE
module.exports.register = async (req, res) => {
  const { name, middleName, email, login, phone, avatar, password } = req.body;

  // Validations

  if (!name) {
    return res.json({ msg: "Name is required!", status: false });
  }
  if (!middleName) {
    return res.json({ msg: "Middle name is required!", status: false });
  }
  if (!email) {
    return res.json({ msg: "Email is required!", status: false });
  }
  if (!login) {
    return res.json({ msg: "Login is required!", status: false });
  }

  if (!password) {
    return res.json({ msg: "Password is required!", status: false });
  }

  // Check if user exists
  const userEmail = await User.findOne({ email });
  if (userEmail) {
    return res.json({ msg: "Email already used!", status: false });
  }
  const userLogin = await User.findOne({ login });
  if (userLogin) {
    return res.json({ msg: "Login already used!", status: false });
  }
  const userPhone = await User.findOne({ phone });

  if (userPhone) {
    return res.json({ msg: "Phone number already used!", status: false });
  }

  const salt = await bcrypt.genSalt(12);
  const passwordHash = await bcrypt.hash(password, salt);

  const user = new User({
    name,
    middleName,
    email,
    login,
    phone,
    avatar,
    password: passwordHash,
  });

  try {
    await user.save();
    res
      .status(200)
      .json({ status: true, msg: "Successfully registered user!", user });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ msg: "Error with database, contact the developer!" });
  }
};

// READ
module.exports.findAllUser = async (req, res) => {
  const users = await User.find();

  try {
    if (!users) {
      return res.status(404).json({ msg: "Users not found!", status: false });
    }
    return res.status(200).json({ users, status: true });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ msg: "Error with database, contact the developer!" });
  }
};

// READ
module.exports.findOneUser = async (req, res) => {
  const _id = req.params;

  const user = await User.findById(_id);
  //   const user = await User.findById(_id, "-password"); // remove password

  try {
    if (!user) {
      return res.status(404).json({ msg: "Users not found!" });
    }
    return res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ msg: "Error with database, contact the developer!" });
  }
};
// UPDATE
module.exports.updateUser = async (req, res) => {
  const _id = req.params;
  const { name, middleName, email, login, phone, avatar, password } = req.body;

  const salt = await bcrypt.genSalt(12);
  const passwordHash = await bcrypt.hash(password, salt);

  const user = {
    name,
    middleName,
    email,
    login,
    phone,
    avatar,
    password: passwordHash,
  };

  try {
    // Verify if user exists
    const userExists = await User.findById(_id);

    if (!userExists) {
      res.status(404).json({ error: "User not found!" });
      return;
    }

    const userUpdate = await User.updateOne({ _id }, user);

    if (userUpdate) {
      res.status(200).json({ message: "Successfully updated user!" });
      return;
    }
    res.status(200).json(userUpdate);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ msg: "Error with database, contact the developer!" });
  }
};

// DELETE
module.exports.deleteUser = async (req, res) => {
  const _id = req.params;
  const user = await User.findOne({ _id });

  if (!user) {
    res.status(404).json({ error: "User not found!" });
    return;
  }

  try {
    await User.deleteOne({ _id });
    res.status(200).json({ message: "Successfully deleted user!" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

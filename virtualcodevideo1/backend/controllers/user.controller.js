
export const home = (req, res) => {
    res.json({message:"Hello"});
};


export const createUser = async (req, res) => {
  try {
    const { name, age, username, email, password } = req.body;

    await User.create({
      name,
      age,
      username,
      email,
      password,
    });

    return res.status(201).json({
      success: true,
      message: "User created",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};


export const readAllUser = async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(400).json({ message: "user not found" });
  }
};


export const updateUser = async (req, res) => {
  try {
    let { name, age } = req.body;
    let id = req.params.id;
    let user = await User.findByIdAndUpdate(id, { name, age }, { new: true });
    return res.status(200).json(user);
  } catch (error) {
    return res.status(400).json({ message: "user not found" });
  }
}


export const update = async (req, res) => {
  try {
    let { name, age, email } = req.body;
    let user = await User.updateOne({ email }, { name, age }, { new: true });
    return res.status(200).json({ message: "user updated" });
  } catch (error) {
    return res.status(400).json({ message: "user not found" });
  }
}


export const deleteUser = async (req, res) => {
  try {
    let { userName } = req.body;
    let user = await User.deleteOne({ userName });
    return res.status(200).json(user);
  } catch (error) {
    return res.status(400).json({ message: "user not found" });
  }
}








const User = require('../models/userModel');

exports.createUser = async (req, res) => {
  try {
    const userdata = new User(req.body);
    await userdata.save();
    res.status(200).json(userdata);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getUser = async (req, res) => {
  try {
    const getuserdata = await User.find();
    if (!getuserdata) {
      return res.status(404).json({ message: 'No data found' });
    }
    res.status(200).json(getuserdata);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const getuserdatabyid = await User.findById(req.params.id);
    if (!getuserdatabyid) {
      return res.status(404).json({ message: 'No data found' });
    }
    res.status(200).json(getuserdatabyid);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateUserById = async (req, res) => {
  try {
    const userupdatedata = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!userupdatedata) {
      return res.status(404).json({ message: 'No data found' });
    }
    res.status(200).json(userupdatedata);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

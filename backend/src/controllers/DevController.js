const Dev = require("../models/Dev");
const axios = require("axios");

module.exports = {
  async index(req, res) {
    const { user } = req.headers;
    const loggedUser = await Dev.findById(user);

    const users = await Dev.find({
      $and: [
        { _id: { $ne: user } },
        { _id: { $nin: loggedUser.likes } },
        { _id: { $nin: loggedUser.dislikes } }
      ]
    });

    return res.json(users);
  },

  async store(req, res) {
    const { user } = req.body;
    const userExists = await Dev.findOne({ user });

    if (userExists) {
      console.log("Usuario existente");
      return res.json(userExists);
    }

    const response = await axios.get(`https://api.github.com/users/${user}`);
    const { bio, name, avatar_url: avatar } = response.data;

    const dev = await Dev.create({
      name,
      user,
      bio,
      avatar
    });

    return res.json(dev);
  }
};

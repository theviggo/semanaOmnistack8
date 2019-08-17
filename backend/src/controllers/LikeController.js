const Dev = require("../models/Dev");

module.exports = {
  async store(req, res) {
    const { user } = req.headers;
    const { devId } = req.params;

    const loggedUser = await Dev.findById(user);
    const targetUser = await Dev.findById(devId);

    if (targetUser.likes.includes(loggedUser._id)) {
      console.log("Match");
    }

    if (!loggedUser.likes.includes(targetUser._id)) {
      loggedUser.likes.push(targetUser._id);
      await loggedUser.save();
      console.log("Like Salvo");
    }

    return res.json(loggedUser);
  }
};

const Dev = require("../models/Dev");

module.exports = {
  async store(req, res) {
    const { user } = req.headers;
    const { devId } = req.params;

    const loggedUser = await Dev.findById(user);
    const targetUser = await Dev.findById(devId);

    if (!loggedUser.dislikes.includes(targetUser._id)) {
      loggedUser.dislikes.push(targetUser._id);
      await loggedUser.save();
      console.log("Dislike Salvo");
    }

    return res.json(loggedUser);
  }
};

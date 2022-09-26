const model = require('../../models');

module.exports = async (req, res) => {
  const { code, userId } = req.body;

  const checkIfRoomExists = await model.UserGameRoom.findOne({
    where: { roomCode: code },
  });

  // handle when romm exist
  if (checkIfRoomExists) {
    checkIfRoomExists.gameGuestUserId = userId;
    await checkIfRoomExists.save();

    return res.json({
      status: true,
      code,
      mode: 'guest',
      message: 'you are guest',
    });
  }

  await model.UserGameRoom.create({
    roomCode: code,
    gameMasterUserId: userId,
  });

  res.json({
    status: true,
    code,
    mode: 'master',
    message: 'you are game master',
  });
};

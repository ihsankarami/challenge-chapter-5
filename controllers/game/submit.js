const model = require('../../models');

module.exports = async (req, res) => {
  const { code, pick, userId } = req.body;

  const checkIfRoomExists = await model.UserGameRoom.findOne({
    where: { roomCode: code },
  });

  // handle when romm exist
  if (!checkIfRoomExists) {
    return res.json({
      success: false,
      status: 'settled',
      message: 'room not found',
    });
  }

  const payload = {
    UserGameRoomId: checkIfRoomExists.id,
  };

  if (userId == checkIfRoomExists.gameMasterUserId) {
    Object.assign(payload, {
      playerOneUserId: userId,
      playerOnePick: pick,
    });

    await model.UserGameHistories.create(payload);
    return res.json({
      success: true,
      status: 'pending',
    });
  }

  // handle player 2 atau guest
  const checkUserGameHistory = await model.UserGameHistory.findOne({
    where: {
      UserGameRoomId: checkIfRoomExists.id,
    },
  });

  if (!checkUserGameHistory) {
    return res.json({
      success: false,
      status: 'settled',
      message: 'history not found',
    });
  }

  checkUserGameHistory.playerTwoUserId = userId;
  checkUserGameHistory.playerTwoPick = pick;
  await checkUserGameHistory.save();

  // logic untuk menentukan siapa yang menang
  const { playerOnePick, playerTwoPick } = checkUserGameHistory;
  const result = calculate(playerOnePick, playerTwoPick);

  if (typeof result == 'undefined') {
    checkUserGameHistory.playerOneStatus = 'draw';
    checkUserGameHistory.playerTwoStatus = 'draw';
    checkUserGameHistory.winnerUserId = null;
  } else if (result === true) {
    checkUserGameHistory.playerOneStatus = 'win';
    checkUserGameHistory.playerTwoStatus = 'lose';
    checkUserGameHistory.winnerUserId = checkUserGameHistory.playerOneUserId;
  } else if (result === false) {
    checkUserGameHistory.playerOneStatus = 'lose';
    checkUserGameHistory.playerTwoStatus = 'win';
    checkUserGameHistory.winnerUserId = checkUserGameHistory.playerTwoUserId;
  }

  await checkUserGameHistory.save();

  res.json({
    success: true,
    status: 'settled',
    code,
  });
};

function calculate(p1Pick, p2Pick) {
  const schema = {
    scissor: {
      rock: false,
      paper: true,
    },
    rock: {
      paper: false,
      scissor: true,
    },
    paper: {
      scissor: false,
      rock: true,
    },
  };

  return schema[p1Pick][p2Pick];
}

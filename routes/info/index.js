const router = require('express').Router();

const Info = require('../../database/info');
const { catchError } = require('../../utils/helper');

const getInfo = catchError(async (req, res) => {
  const admin = await Info.countAdmin();
  const user = await Info.countUser();
  const poster = await Info.countPoster();

  return res.status(200).send({
    message: "Info data",
    data: { countAdmin: admin[0].count, countUser: user[0].count, countPoster: poster[0].count }
  })
});


router.get('/', getInfo);

module.exports = router;
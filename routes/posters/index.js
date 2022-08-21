const fs = require('fs')
const path = require('path')

const { v4: uuidv4 } = require('uuid');
const router = require('express').Router();

const Poster = require('./../../database/poster');
const {
  createPosterSchema,
} = require('./schema');

const { catchError } = require('../../utils/helper');

const createPoster = catchError(async (req, res, next) => {
  const { error, value } = createPosterSchema.validate(req.body);
  if (error) {
    return next({
      status: 400,
      message: error.details[0].message
    })
  }

  value.image = value.image.replace('data:image/jpeg;base64,', '').replace('data:image/png;base64,', '');
  const foldername = 'images'
  const filename = `${uuidv4()}.jpg`;
  fs.writeFileSync(path.join(process.cwd(), 'uploads', foldername, filename), Buffer.from(value.image, 'base64'));

  let result = await Poster.createPoster([
    `${foldername}/${filename}`,
    value.content,
    value.link
  ]);

  if (result.length) {
    const poster = {
      image: 'http://' + req.headers.host + `/${foldername}/${filename}`,
      content: value.content,
      link: value.link
    }

    sendMessage(poster);

    return res.status(201).send({
      message: 'Poster created',
      data: result
    })
  } else {
    return res.status(500).send({
      message: 'Internal server error'
    })
  }
})

router.post('/', createPoster);


async function sendMessage(poster) {
  const { Telegraf } = require("telegraf");

  const { BOT_TOKEN } = require('./../../config');
  const bot = new Telegraf(BOT_TOKEN);

  const User = require('../../database/user');
  const result = await User.getUsers();


  try {

    await bot.telegram.sendPhoto(result[0].chat_id, 'https://picsum.photos/id/237/200/300')

  } catch (err) {
    console.log(err);
  }


  // result.forEach(user => {
  //   console.log(user)

  //   // bot.telegram.sendMessage(user.chat_id, `Новый постер`);
  // })
}

module.exports = router;
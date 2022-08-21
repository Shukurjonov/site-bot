const path = require('path');

const cors = require('cors');
const helmet = require('helmet');
const express = require('express');
const moment = require('moment');
const { replaceAll, saveLog } = require('./utils/functions');

/* ############################ */
// Telegram bot
const { Telegraf } = require("telegraf");

const { APP, BOT_TOKEN } = require('./config');
const { start } = require('./modules/command');
const bot = new Telegraf(BOT_TOKEN);

bot.command("start", start);
bot.launch();

/* ############################ */


const { errorMessageHandler } = require('./utils/helper');

const app = express();

const authMiddleware = require('./middlewares/auth');

const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');
const posterRouter = require('./routes/posters');
const infoRouter = require('./routes/info');

app.use(cors());
app.use(helmet());
app.use(express.json({ limit: '10mb' }));

app.use('/auth', authRouter);
app.use('/api/user', authMiddleware, userRouter);
app.use('/api/poster', authMiddleware, posterRouter);
app.use('/api/info', authMiddleware, infoRouter);

app.use(express.static(path.join(__dirname, 'uploads')));

app.use((err, req, res, next) => {
  saveLog(path.join(process.cwd(), 'logs', `${replaceAll(req._parsedUrl.pathname, '/', '_')}.txt`), `
    \n\n || ============================================================= ||
    Log Time: ${moment().format('DD.MM.YYYY hh:mm:ss')}
    || ===>   Req query: ${JSON.stringify(req.query)} 
    || ===>   Req params: ${JSON.stringify(req.params)} 
    || ===>   Req body: ${JSON.stringify(req.body)} 
    || ===>   Req method: ${req.method} 
    || ===>   Endpoint: ${req.originalUrl}
    || ===>   Error message: ${err.message}
  `)
  const error = errorMessageHandler(err.status, err.message);
  res.status(err.status || 500).send(error);
});

app.listen(APP.PORT, () => {
  console.log(`${APP.ENV} server is running on port ${APP.PORT}`);
});
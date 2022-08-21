const { Pool } = require('pg');
const { DB } = require('./../config');
const { Markup, Telegraf } = require("telegraf");

// const pool = new Pool(DB);
const pool = new Pool({ connectionString: DB.url });

const start = async (ctx) => {
  const { update } = ctx;
  const { from: { id: chatId, first_name: firstName, username } } = update.message

  try {
    const result = await pool.query(`
    INSERT INTO 
      users(first_name, username, chat_id) 
    VALUES 
      ('${firstName}', '${username}', ${chatId})
    RETURNING id, chat_id`);
  }
  catch (err) {
    console.log(err.detail);
  }
  ctx.reply("Bizni kuzatib borayotganingiz uchun rahmat",
    Markup.keyboard([
      Markup.button.text("📃 Biz haqimizda"),
    ], { columns: 1 }
    ).resize())
}

module.exports = { start }
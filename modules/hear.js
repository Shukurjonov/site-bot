const { Markup } = require("telegraf");

const near = (ctx) => {
  return ctx.reply("Iltimos bizga joylashgan mazilingizni yuboring!", Markup.keyboard([
    Markup.button.locationRequest('Send Location'),
    Markup.button.text('🔙 Orqaga')
  ]).resize())
}

module.exports = { near }
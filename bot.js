const { Telegraf } = require('telegraf');
const express = require('express');
require('dotenv').config();

const TOKEN = process.env.TOKEN;
if (!TOKEN) {
    throw new Error("Bot token is not defined in .env file");
}

const bot = new Telegraf(TOKEN);
const app = express();
app.use(express.json());

const web_link = "https://okapibot.me/";
const community_link = "https://t.me/okapicommunity";

bot.start((ctx) => {
    const startPayload = ctx.startPayload || "default"; // Default payload if none is provided
    const urlSent = `${web_link}?ref=${startPayload}`;
    
    // Send the inline keyboard with the web app link
    ctx.replyWithHTML(`<b>Welcome to OKAPI GAME!</b>\n\nTap the button below to start your journey to riches and wealth on the Ton Blockchain.`, {
        reply_markup: {
            inline_keyboard: [
                [
                    { text: "👋 Start now!", web_app: { url: urlSent } }
                ],
                [
                    { text: "Join our Community", url: community_link }
                ]
            ]
        }
    }).catch(err => {
        console.error('Failed to send message:', err);
    });
});

// Start the bot
bot.launch().catch(err => {
    console.error('Failed to start bot:', err);
});

// Start the express server
app.listen(3000, () => {
    console.log("Server is up and running");
}).on('error', err => {
    console.error('Failed to start server:', err);
});

// Log a message for successful bot launch
console.log("Bot is running. Share the link: https://t.me/okapitapping_bot?startapp");
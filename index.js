require("dotenv").config();
const Discord = require("discord.js");
const qr = require("qrcode");
const fs = require("fs");
const sharp = require("sharp");

const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on("messageCreate", async (msg) => {
  if (msg.content === "ping") {
    msg.reply("Pong!");
  } else if (msg.content.startsWith("!qr")) {
    const _msg = msg.content.split(" ");
    const res = qr.toString(_msg[1], { type: "svg" });
    fs.writeFileSync("image.svg", (await res).toString());
    sharp("./image.svg").resize(200, 200).png().toFile("new-file.png");
    msg.channel.send({
      content: "Your Image",
      files: ["new-file.png"],
    });
  }
});

client.login(process.env.CLIENT_TOKEN);

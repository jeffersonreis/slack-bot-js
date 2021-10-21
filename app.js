import fetch from "node-fetch";
import pkg from '@slack/bolt';
const { App } = pkg;

const SLACK_USER_TOKEN = "xoxp-2854134760-1861381846580-2621624978021-bb38b5c5ebb3569cd61c9d040d0b2fa8";
const SLACK_BOT_TOKEN = "xoxb-2854134760-2617929986694-Y2nPJGutgrDiUqfDkHkyqGNU";
const SLACK_SIGNING_SECRET = "1dbcdbaabd198e33d15f4651169cfee7";
const APP_TOKEN="xapp-1-A02J5RDFXEJ-2626922105220-1c5d9be6d37542270d42b9adf82c1fff07cbca98c1da23c6520070c6f9cfe967";


// Initializes your app with your bot token and signing secret
const app = new App({
  token: SLACK_BOT_TOKEN,
  signingSecret: SLACK_SIGNING_SECRET,
  socketMode:true, // enable the following to use socket mode
  appToken: APP_TOKEN
});


async function sendAndDeleteMsg(say, msg){
  let mes = await say(msg);
  await new Promise(r => setTimeout(r, 30000));
  apagarMsg(mes);
}

async function sendMsg(msg, channel){
  app.client.chat.postMessage({
    channel: channel,
    text: msg
  });
}

async function verifyFile(files, say, user){
  files.map((file) => (
    (file.size > 1000000)?
    sendAndDeleteMsg(say, `<@${user}> Arquivo Grande! Tente enviar pelo drive ou outro lugar :)`)
    : 
    (file.filetype === "pdf" || file.filetype === "docx")?
    sendAndDeleteMsg(say, `<@${user}> Aconselho enviar esse documento por um link do drive!`)

    :
    (file.filetype === "mp4" || file.filetype === "vlc" || file.filetype === "mkv"  || file.filetype === "avi")?
    sendAndDeleteMsg(say, `<@${user}> Não mande vídeo por aqui! Upe no drive :)`)
    : {}
  ))
}

async function apagarMsg(message){
  try {
    await app.client.chat.delete({
      channel: message.channel,
      ts: message.ts
    });
  } catch (error) {
      console.log("err")
    console.error(error);
  }
};


app.message("hey bot", async ({ message, ack, say }) => {
  try {
    sendMsg("oi", message.channel);
  } catch (error) {
      console.log("err")
    console.error(error);
  }
});


// analisa todas as mensagens
app.message("", async ({ message, say }) => {

  // se tiver um file, analisa...
  if(message.files != undefined){
    verifyFile(message.files, say, message.user)
  };

  // verifica o tamanho da mensagem
  let size = message.text.length
  try {
    if(size > 1950){
      sendAndDeleteMsg(say, `<@${message.user}> Sua mensagem é muito grande, por favor, divida ela!`);
    }
  } catch (error) {
      console.log("err")
    console.error(error);
  }
});

app.event('app_mention',async ({ event, say }) => {
  try {
    say(`Hey <@${event.user}>`);
  } catch (error) {
      console.log("err")
    console.error(error);
  }
});

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

app.command("/caraoucoroa", async ({ command, ack, say }) => {
  try {
    await ack();
    let res = getRandomInt(0,2) // result is 0 or 1
    if (res === 0){
      say('Deu Coroa!')
    }
    else{
      say('Deu Cara!')
    }
  } catch (error) {
      console.log("err")
    console.error(error);
  }
});

app.command("/mktoucml", async ({ command, ack, say }) => {
  try {
    await ack();
    let res = getRandomInt(0,2) // result is 0 or 1
    if (res === 0){
      say('Marketing é melhor!')
    }
    else{
      say('Comercial é melhor!')
    }
  } catch (error) {
      console.log("err")
    console.error(error);
  }
});

(async () => {
  const PORT = process.env.PORT || 3000;
  // Start your app
  await app.start(process.env.PORT);
  console.log(`⚡️ Slack Bolt app is running on port ${PORT}!`);
})();
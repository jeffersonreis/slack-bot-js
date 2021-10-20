const { App } = require("@slack/bolt");
// const fetch = require("node-fetch");

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

app.command("/knowledge", async ({ command, ack, say }) => {
  try {
    await ack();
    say("HEIIII");
  } catch (error) {
      console.log("err")
    console.error(error);
  }
});

const payload = {
  channel: "C02HZ95765T",
  attachments: [
    {
      title: "Um titulo legal",
      text: "Uma mensagem legal",
      color: "#00FF00",
    },
  ],
};

// async function lorem(){
//   fetch("https://slack.com/api/chat.postMessage", {
//     method: "POST",
//     body: JSON.stringify(payload),
//     headers: {
//       "Content-Type": "application/json; charset=utf-8",
//       "Content-Length": payload.length,
//       Authorization: `Bearer ${process.env.SLACK_BOT_TOKEN}`,
//       Accept: "application/json",
//     },
//   })
//     .then((res) => {
//       if (!res.ok) {
//         throw new Error(`Server error ${res.status}`);
//       }

//       return res.json();
//     })
//     .catch((error) => {
//       console.log(error);
//     });

//   }

app.message("hey bot", async ({ message, ack, say }) => {
  console.log("Oi?", )
  try {
    say('Hey!');
  } catch (error) {
      console.log("err")
    console.error(error);
  }
});

app.message("test", async ({ message, ack, say }) => {
  try {
    // lorem()
    // payload;
  } catch (error) {
      console.log("err")
    console.error(error);
  }
});

// analisa todas as mensagens
app.message("", async ({ message, ack, say }) => {
  let size = message.text.length
  try {
    if(size > 1950){
      say(`Sua mensagem é muito grande, por favor, divida ela!`);
    }
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
      say('Coroa!')
    }
    else{
      say('Cara!')
    }
  } catch (error) {
      console.log("err")
    console.error(error);
  }
});

(async () => {
  const port = 3000
  // Start your app
  await app.start(process.env.PORT || port);
  console.log(`⚡️ Slack Bolt app is running on port ${port}!`);
})();
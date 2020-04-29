const WickrIOAPI = require('wickrio_addon');
const WickrIOBotAPI = require('wickrio-bot-api');
const WickrUser = WickrIOBotAPI.WickrUser;
const bot = new WickrIOBotAPI.WickrIOBot();

var fs = require('fs');

process.stdin.resume(); //so the program will not close instantly

var bot_username;

async function exitHandler(options, err) {
  try {
    var closed = await bot.close();
    if (err || options.exit) {
      console.log("Exit reason:", err);
      process.exit();
    } else if (options.pid) {
      process.kill(process.pid);
    }
  } catch (err) {
    console.log(err);
  }
}

//catches ctrl+c and stop.sh events
process.on('SIGINT', exitHandler.bind(null, {exit: true}));

// catches "kill pid" (for example: nodemon restart)
process.on('SIGUSR1', exitHandler.bind(null, {pid: true}));
process.on('SIGUSR2', exitHandler.bind(null, {pid: true}));

//catches uncaught exceptions
process.on('uncaughtException', exitHandler.bind(null, {exit: true}));


var responseMessageList = [
    "Hey there! Thanks for messaging me! I have a few helpful but random tips I can share in response to your messages, " + "so please bear with me☺ If you have more questions than I have answers, head to Settings > Support in Wickr Pro. " + "Way to go to protect your privacy!",

    "JavaScript API:\n\n" + "Have an idea for a cool integration for wickr? you can now implement it using our brand new Node.js API " + "It is also possible to code integrations in different languages using our WickrIO REST API. For more information visit https://github.com/WickrInc\n\n",

    "Here is how to set expiration on your messages:\n\n" + "Expiration is the max time your message will live. Burn-On-Read (BOR) is how long your message will live once the " + "recipient(s) has seen it. You can change both by tapping on the (i) next to any conversation name, at the top of " + "your screen.",

    "Fun fact\n" + "Wickr is used in over a 150 countries, and has over 600,000 registered users. " + "Congrats on being one of them, enjoy your security and privacy.",

    "Did you know that Wickr Pro has a Hubot integration?\n\n" + "When you add a bot, just select the hubot integration option from the menu." + "With Hubot you get access to cool features such as Giphy and pug bombs and exisiting Wickr Integrations such as Slack, Uber and Salesforce Chatter." + "You can also create your own custom integrations with Hubot or choose from hundreds of existing integrations and scripts available online on npmjs.com.\n\n",

    "Sending files on Wickr Pro:\n\n" + "You can now send photos, videos, and other ephemeral files up to 5GB via End-to-End encryption. Secure Screenshare & File Upload This feature supports collaboration " + "and maximum data hygiene for you and the contacts you TRUST. If you do not trust the person you’re talking to, do " + "not open files coming from them or send them photos/files you do not want to be saved. Stay safe!",

    "Verification\n\n" + "You’ll notice an orange dot around your contacts’ avatars – that means you have not yet verified them.\n\n" + "You don’t have to, but in case you want to make sure you are talking to the right person, send them a key video " + "verification request to establish trust between your Wickr Pro accounts.\n\n" + "Check out our blog on this: https://medium.com/cryptoblog/key-verification-in-secure-messaging-bd93a1bf3d40",

    "Passwords\n\n" + "Important to know: there is no password reset on Wickr Pro – we don't know who you are which prevents us from " + "verifying you to reset your password.\n\n" + "So please remember your password☺",

    "Privacy\n\n" + "We built Wickr Pro to provide private communications to everyone.\n" + "We take your privacy & security very seriously, learn more: www.wickr.com/security.\n\n" + "Source code https://github.com/WickrInc/wickr-crypto-c. FAQ www.wickr.com/faq"
];


async function main() {
  try {
    var tokens = JSON.parse(process.env.tokens);
    var status = await bot.start(tokens.WICKRIO_BOT_NAME.value)
    if (!status) {
      exitHandler(null, {
        exit: true,
        reason: 'Client not able to start'
      });
    }

    //Passes a callback function that will receive incoming messages into the bot client
    bot.startListening(listen);

  } catch (err) {
    return console.log(err);
  }
}





function listen(message) {
    var wickrUser;
    //Parses an incoming message and returns and object with command, argument, vGroupID and Sender fields
    var parsedMessage = bot.parseMessage(message);
    if (!parsedMessage) {
      return;
    }
    var vGroupID = parsedMessage.vgroupid;
    var userEmail = parsedMessage.userEmail;
    var convoType = parsedMessage.convoType;
    var personal_vGroupID = "";
    if (convoType === 'personal')
      personal_vGroupID = vGroupID;
    var user = bot.getUser(userEmail); //Look up user by their wickr email
    if (user === undefined) { //Check if a user exists in the database
      wickrUser = new WickrUser(userEmail, {
        index: 0,
        personal_vGroupID: personal_vGroupID,
        command: "",
        argument: ""
      });
      user = bot.addUser(wickrUser); //Add a new user to the database
    }
    var current = user.index;
    if (current > responseMessageList.length - 1) {
      user.index = 0;
    }
    current = user.index;
    if (current < responseMessageList.length && current != -1) {
      try {
        var csrm = WickrIOAPI.cmdSendRoomMessage(vGroupID, responseMessageList[current]);
        console.log(csrm);
      } catch (err) {
        console.log(err);
      }
      user.index = current + 1;
    }
}




main();

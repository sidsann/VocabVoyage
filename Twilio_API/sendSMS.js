require("dotenv").config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

getWordsByLanguageAndTopic("Spanish", "Animals");
// const textBody = "Today's word is \"" + "\", which is \"" + "\" in English, meaning ";

client.messages
    .create({
        body: 'Test Body 123',
        from: 'YOUR-TWILIO-#',
        to: 'NUMBER-TO-TEXT'
    })
    .then(message => console.log(message.sid));


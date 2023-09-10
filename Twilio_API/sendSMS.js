require("dotenv").config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);
// import helper functions from dbFunctions.js module
const dbHelpers = require('./../atlas_starter_nodejs/dbFunctions');

/**
 * This function will call Twilio API and send SMS to the specified phoneNumber.
 * Number of API calls is specified by the value of cycle.
 * @param language is the target language the user wants to learn
 * @param category is the category the usser is interested to learn words in
 * @param cycle specifies how many days a learning cycle consists of
 * @returns {Promise<void>}
 */
async function sendSMS(language, category, cycle, phoneNumber) {
    dbHelpers.getWordsByLanguageAndTopic(language, category)
        .then(wordsList => {
            for (let i = 1; i <= cycle; i++) {
                const textBody = "Day " + i + "\'s word is \"" + wordsList[i].GoalWord +
                    "\", which is \"" + wordsList[i].EnglishWord +
                    "\" in English, meaning \"" + wordsList[i].meaning + "\"";
                client.messages
                    .create({
                        body: textBody,
                        from: '+18336003823',
                        to: phoneNumber
                    })
                    .then(message => console.log(message.sid));
            }

            // Rest of your code here...
        })
        .catch(error => {
            console.error("An error occurred:", error);
        });
}

module.exports = sendSMS;
const { MongoClient } = require("mongodb");
require('dotenv').config();

// const URI = process.env.MONGODB_URI;
const URI = 'mongodb+srv://sid:4FwQKKQk4Xbi7zLC@cluster0.5wgr2ee.mongodb.net/?retryWrites=true&w=majority';
const dbName = "VocabLearningPlatform";
const usersCollectionName = "Users";
const topicsCollectionName = "VocabTopics";


async function addUser(newUser) {
    const client = new MongoClient(URI, { useUnifiedTopology: true });
    try {
        await client.connect();
        const database = client.db(dbName);
        const usersCollection = database.collection(usersCollectionName);

        const result = await usersCollection.insertOne(newUser);
        console.log(`New user created with the following id: ${result.insertedId}`);
    } catch (error) {
        console.log(`An error occurred while creating the user: ${error}`);
    } finally {
        await client.close();
    }
}

async function addQuizHistory(email, topicName, quizHistory) {
    const client = new MongoClient(URI, { useUnifiedTopology: true });
    try {
        await client.connect();
        const database = client.db(dbName);
        const usersCollection = database.collection(usersCollectionName);

        const result = await usersCollection.updateOne(
            { email },
            { $push: { quiz_history: { topic: topicName, ...quizHistory } } },
        );
        console.log(`${result.modifiedCount} document(s) was/were updated.`);
    } catch (error) {
        console.log(`An error occurred while adding quiz history: ${error}`);
    } finally {
        await client.close();
    }
}


async function checkLoginCredentials(email, password) {
    const client = new MongoClient(URI, { useUnifiedTopology: true });
    try {
        await client.connect();
        const database = client.db(dbName);
        const usersCollection = database.collection(usersCollectionName);

        const user = await usersCollection.findOne({ email, password });
        if (user) {
            console.log('Login successful');
            return user;
        } else {
            console.log('Invalid credentials');
            return null;
        }
    } catch (error) {
        console.log(`An error occurred while checking login credentials: ${error}`);
        return false;
    } finally {
        await client.close();
    }
}
async function getWordsForHighScoringTopics(email) {
    const client = new MongoClient(URI, { useUnifiedTopology: true });

    try {
        await client.connect();
        const database = client.db(dbName);

        // Fetching user details
        const usersCollection = database.collection(usersCollectionName);
        const user = await usersCollection.findOne({ email });

        if(!user) {
            console.log('No user found');
            return null;
        }

        // Identifying high scoring topics
        const highScoringTopics = user.quiz_history.filter(quiz => quiz.score >= 70).map(quiz => quiz.topic);

        // Fetching topic details
        const topicsCollection = database.collection(topicsCollectionName);
        const topics = await topicsCollection.find({ topicName: { $in: highScoringTopics } }).toArray();

        // Gathering words for high scoring topics
        const wordsByTopic = {};
        for(const topic of topics) {
            for(const language of topic.languages) {
                if(language.languageName === user.language_of_choice) {
                    wordsByTopic[topic.topicName] = language.words;
                }
            }
        }

        console.log(wordsByTopic);
        return wordsByTopic;
    } catch(error) {
        console.log(`An error occurred: ${error}`);
        return null;
    } finally {
        await client.close();
    }
}

async function getWordsByLanguageAndTopic(languageString, topicString) {
    const client = new MongoClient(URI, { useUnifiedTopology: true });

    try {
        await client.connect();
        const database = client.db(dbName);

        // Fetching topic details
        const topicsCollection = database.collection(topicsCollectionName);
        const topic = await topicsCollection.findOne({ topicName: topicString });

        if (!topic) {
            console.log("No topic found");
            return null;
        }

        // Finding the words for the specified language
        const languageDetails = topic.languages.find((language) => language.languageName === languageString);

        if (!languageDetails) {
            console.log("No language found");
            return null;
        }

        // Getting the words for the specified language
        const words = languageDetails.words;

        console.log(words);
        return words;
    } catch (error) {
        console.log(`An error occurred: ${error}`);
        return null;
    } finally {
        await client.close();
    }
}


module.exports = { addUser, addQuizHistory, checkLoginCredentials, getWordsForHighScoringTopics, getWordsByLanguageAndTopic};




//examples of how to use these functions

//getWordsForHighScoringTopics("bingbong@gmail.com");

// checkLoginCredentials("sannapareddysiddharth@gmail.com", "password")

// newUser = {
//     email: "bingbong@gmail.com",
//     password: "password",
//     phone_number: "9113",
//     language_of_choice: "Spanish",
//     quiz_history: [],
//   }

//   addUser(newUser)

// latestQuiz = {
//     topic: 'Animals',
//     score: 90,
// }

// addQuizHistory("bingbong@gmail.com", "Animals", latestQuiz)

//getWordsByLanguageAndTopic("Spanish", "Animals")


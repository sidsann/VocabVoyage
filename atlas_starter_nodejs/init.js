const { MongoClient } = require("mongodb");
require('dotenv').config();
const URI = process.env.MONGODB_URI;

const dbName = "VocabLearningPlatform";
const usersCollectionName = "Users";
const topicsCollectionName = "VocabTopics"; 

async function run() {
  console.log('URI:', URI);  // Add this line
  const uri = URI;

  // The MongoClient is the object that references the connection to our
  // datastore (Atlas, for example)
  const client = new MongoClient(uri, { useUnifiedTopology: true });

  // The connect() method does not attempt a connection; instead it instructs
  // the driver to connect using the settings provided when a connection
  // is required.
  await client.connect(); 

  // Create references to the database and collection in order to run
  // operations on them.
  const database = client.db(dbName);
  const usersCollection = database.collection(usersCollectionName);
  const topicsCollection = database.collection(topicsCollectionName);
  
  const users = [
    {
      email: "sannapareddysiddharth@gmail.com",
      password: "password",
      phone_number: "5592449760",
      language_of_choice: "Spanish",
      quiz_history: [
        {
          topic: 'Food',
          score: 80,
        },
      ],
    },
  ];

  await usersCollection.insertMany(users)

  const initialTopics = [
    {
      topicName: "Food",
      languages: [
        {
          languageName: "Spanish",
          words: [
            { GoalWord: "La cabeza", EnglishWord: "Head", meaning: "The uppermost part of the body, containing the brain and the eyes, ears, nose, mouth, and jaws." },
            { GoalWord: "El ojo", EnglishWord: "Eye", meaning: "The organ of sight" },
            { GoalWord: "El pelo", EnglishWord: "Hair", meaning: "The aggregation of numerous filaments, covering the human head" },
            { GoalWord: "La nariz", EnglishWord: "Nose", meaning: "The part of the human face which people smell and breathe" },
            { GoalWord: "La oreja", EnglishWord: "Ear", meaning: "The organ responsible for hearing, found on the sides of the head" },
            { GoalWord: "La boca", EnglishWord: "Mouth", meaning: "The opening in the lower part of the human face surrounded by lips, which is responsible for making noise and eating." },
          ]
        },
        {
          languageName: "French",
          words: [
            { GoalWord: "La tête", EnglishWord: "Head", meaning: "The uppermost part of the body, containing the brain and the eyes, ears, nose, mouth, and jaws." },
            { GoalWord: "L'œil", EnglishWord: "Eye", meaning: "The organ of sight" },
            { GoalWord: "Les cheveux", EnglishWord: "Hair", meaning: "The aggregation of numerous filaments, covering the human head" },
            { GoalWord: "Le nez", EnglishWord: "Nose", meaning: "The part of the human face which people smell and breathe" },
            { GoalWord: "L'oreille", EnglishWord: "Ear", meaning: "The organ responsible for hearing, found on the sides of the head" },
            { GoalWord: "La bouche", EnglishWord: "Mouth", meaning: "The opening in the lower part of the human face surrounded by lips, which is responsible for making noise and eating." },
          ]
        },
      ]
    },
    {
      topicName: "Animals",
      languages: [
        {
          languageName: "Spanish",
          words: [
            { GoalWord: "El perro", EnglishWord: "Dog", meaning: "A domesticated carnivorous mammal that typically has a long snout, an acute sense of smell, and a barking, howling, or whining voice." },
            { GoalWord: "El gato", EnglishWord: "Cat", meaning: "A small domesticated carnivorous mammal with soft fur, a short snout, and retractile claws." },
            { GoalWord: "El pájaro", EnglishWord: "Bird", meaning: "A warm-blooded egg-laying vertebrate distinguished by the possession of feathers, wings, and a beak and (typically) by being able to fly." },
            { GoalWord: "La serpiente", EnglishWord: "Snake", meaning: "A long limbless reptile which has no eyelids, a short tail, and jaws that are capable of considerable extension." },
            { GoalWord: "El pez", EnglishWord: "Fish", meaning: "A limbless cold-blooded vertebrate animal with gills and fins and living wholly in water." },
            { GoalWord: "El caballo", EnglishWord: "Horse", meaning: "A large plant-eating domesticated mammal with solid hoofs and a flowing mane and tail, used for riding, racing, and to carry and pull loads." },
          ]
        },
        {
          languageName: "French",
          words: [
            { GoalWord: "Le chien", EnglishWord: "Dog", meaning: "A domesticated carnivorous mammal that typically has a long snout, an acute sense of smell, and a barking, howling, or whining voice." },
            { GoalWord: "Le chat", EnglishWord: "Cat", meaning: "A small domesticated carnivorous mammal with soft fur, a short snout, and retractile claws." },
            { GoalWord: "L'oiseau", EnglishWord: "Bird", meaning: "A warm-blooded egg-laying vertebrate distinguished by the possession of feathers, wings, and a beak and (typically) by being able to fly." },
            { GoalWord: "Le serpent", EnglishWord: "Snake", meaning: "A long limbless reptile which has no eyelids, a short tail, and jaws that are capable of considerable extension." },
            { GoalWord: "Le poisson", EnglishWord: "Fish", meaning: "A limbless cold-blooded vertebrate animal with gills and fins and living wholly in water." },
            { GoalWord: "Le cheval", EnglishWord: "Horse", meaning: "A large plant-eating domesticated mammal with solid hoofs and a flowing mane and tail, used for riding, racing, and to carry and pull loads." },
          ]
        },
      ]
    }
    ,
    {
      topicName: "Nature",
      languages: [
        {
          languageName: "Spanish",
          words: [
            { GoalWord: "El árbol", EnglishWord: "Tree", meaning: "A tall plant with a wooden trunk, supporting branches and leaves." },
            { GoalWord: "La montaña", EnglishWord: "Mountain", meaning: "A large elevated landform, often with steep sides, higher than a hill." },
            { GoalWord: "El río", EnglishWord: "River", meaning: "A large natural stream of water flowing in a channel to the sea, a lake, or another river." },
            { GoalWord: "El lago", EnglishWord: "Lake", meaning: "A large body of water surrounded by land." },
            { GoalWord: "La flor", EnglishWord: "Flower", meaning: "The seed-bearing part of a plant, consisting of reproductive organs that are typically surrounded by a brightly colored corolla and a green calyx." },
            { GoalWord: "El bosque", EnglishWord: "Forest", meaning: "A large area covered chiefly with trees and undergrowth." },
          ]
        },
        {
          languageName: "French",
          words: [
            { GoalWord: "L'arbre", EnglishWord: "Tree", meaning: "A tall plant with a wooden trunk, supporting branches and leaves." },
            { GoalWord: "La montagne", EnglishWord: "Mountain", meaning: "A large elevated landform, often with steep sides, higher than a hill." },
            { GoalWord: "La rivière", EnglishWord: "River", meaning: "A large natural stream of water flowing in a channel to the sea, a lake, or another river." },
            { GoalWord: "Le lac", EnglishWord: "Lake", meaning: "A large body of water surrounded by land." },
            { GoalWord: "La fleur", EnglishWord: "Flower", meaning: "The seed-bearing part of a plant, consisting of reproductive organs that are typically surrounded by a brightly colored corolla and a green calyx." },
            { GoalWord: "La forêt", EnglishWord: "Forest", meaning: "A large area covered chiefly with trees and undergrowth." },
          ]
        },
      ]
    }
    ,
  ];
  
  
  await topicsCollection.insertMany(initialTopics);

  // Make sure to call close() on your client to perform cleanup operations
  await client.close();
}
run().catch(console.dir);




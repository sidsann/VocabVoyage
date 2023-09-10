const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dbFunctions = require('./atlas_starter_nodejs/dbFunctions.js'); 

const app = express();

app.use(bodyParser.json());

const corsOptions = {
origin: 'http://localhost:3001',  // replace with your front-end application's URL
methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
credentials: true,
optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
  
const PORT = 3000;

// Setting up your endpoints here
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


// Endpoint for adding a new user during signup
app.post('/sign-up', async (req, res) => {
    try {
      await dbFunctions.addUser(req.body);
      res.status(201).send({ message: 'User added successfully' });
    } catch (error) {
      res.status(500).send({ error: 'Failed to add user' });
    }
  });
  
  // Endpoint for checking login credentials
  app.post('/login', async (req, res) => {
    try {
      const user = await dbFunctions.checkLoginCredentials(req.body.email, req.body.password);
      if (user) {
        res.status(200).send(user);
      } else {
        res.status(401).send({ error: 'Invalid credentials' });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({ error: 'Failed to check credentials' });
    }
  });
  
  // Endpoint for fetching words by high-scoring topics
  app.get('/words/main', async (req, res) => {
    try {
      const words = await dbFunctions.getWordsForHighScoringTopics(req.query.email);
      if (words) {
        res.status(200).send(words);
      } else {
        res.status(404).send({ error: 'Words not found' });
      }
    } catch (error) {
      res.status(500).send({ error: 'Failed to fetch words' });
    }
  });
  
  
  
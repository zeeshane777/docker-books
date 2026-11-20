const express = require('express');
const mongoose = require('mongoose');
const booksRouter = require('./routes/books');

const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/books';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'API Livres opérationnelle' });
});

app.use('/books', booksRouter);

mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log('Connecté à MongoDB');
    app.listen(PORT, () => {
      console.log(`API démarrée sur le port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Erreur de connexion à MongoDB :', err.message);
    process.exit(1);
  });

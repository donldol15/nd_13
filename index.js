
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import Publisher from './models/Publisher.js';
import Magazine from './models/Magazine.js';
import Tag from './models/Tag.js';
import Article from './models/Article.js';

dotenv.config();

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

const testDatabase = async () => {
  try {
    const publisher = await Publisher.create({
      name: 'Test Publisher',
      location: 'Ukraine'
    });

    const magazine = await Magazine.create({
      title: 'Technology Magazine',
      issueNumber: 1,
      publisher: publisher._id
    });

    const tag = await Tag.create({
      name: 'Technology'
    });

    const article = await Article.create({
      title: 'Introduction to MongoDB',
      content: 'This article explains MongoDB and Mongoose.',
      tags: [tag._id]
    });

    tag.articles.push(article._id);
    await tag.save();

    console.log('All models tested successfully!');
    console.log('Publisher:', publisher);
    console.log('Magazine:', magazine);
    console.log('Tag:', tag);
    console.log('Article:', article);

  } catch (error) {
    console.error('Database test error:', error);
  }
};

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected successfully');
    testDatabase();
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

app.get('/', (req, res) => {
  res.send('Server is running');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

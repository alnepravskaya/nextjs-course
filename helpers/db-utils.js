import { MongoClient } from 'mongodb';

export const connectDB = async (collection) => {
  const client = await MongoClient.connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.ggqoqr6.mongodb.net/${collection}?retryWrites=true&w=majority`
  );

  return client;
};

export const insertDocument = async (client, collection, document) => {
  const db = client.db();

  return await db.collection(collection).insertOne(document);
};

export const getSelectedItem = async (client, collection, filter) => {
  const db = client.db();
  const documents = await db.collection(collection).find(filter).sort().toArray();

  return documents;
};

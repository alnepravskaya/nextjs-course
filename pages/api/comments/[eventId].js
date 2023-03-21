import { MongoClient } from 'mongodb';
import { connectDB, getSelectedItem, insertDocument } from '../../../helpers/db-utils';

const handler = async (req, res) => {
  const eventId = req.query.eventId;

  if (req.method === 'POST') {
    const { email, name, text } = req.body;
    if (!email.includes('@') || !name || name.trim() === '' || !text || text.trim() === '') {
      res.status(422).json({ message: 'Invalid input' });
    }

    const newComment = {
      email,
      name,
      text,
      eventId
    };
    try {
      const client = await connectDB('events');
      const result = await insertDocument(client, 'comments', newComment);

      res.status(200).json({ message: 'Added comment', comment: result });
      client.close();
    } catch (error) {
      res.status(500).json({ message: 'Connection to the database failed!' });
      return;
    }
  }

  if (req.method === 'GET') {
    try {
      const client = await connectDB('events');
      const documents = await getSelectedItem(client, 'comments', { eventId: eventId }); //await db.collection("comments").find({ eventId: eventId }).sort().toArray();

      res.status(200).json({ comments: documents });
      client.close();
    } catch (error) {
      res.status(500).json({ message: 'Connection to the database failed!', comments: [] });
      return;
    }
  }
};

export default handler;

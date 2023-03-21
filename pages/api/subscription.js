import { connectDB, insertDocument } from '../../helpers/db-utils';

const handler = async (req, res) => {
  if (req.method === 'POST') {
    const userEmail = JSON.parse(req.body).email;

    if (!userEmail || !userEmail.includes('@')) {
      res.status(422).json({ message: 'Invalid email address' });
      return;
    }

    try {
      const client = await connectDB('newLetters');
      await insertDocument(client, 'emails', { email: userEmail });
      client.close();
    } catch (error) {
      res.status(500).json({ message: 'Connection to the database failed! Try later' });
      return;
    }

    res.status(201).json({ message: 'Subscribed successfully' });
  }
};

export default handler;

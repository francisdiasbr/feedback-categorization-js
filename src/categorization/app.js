import 'dotenv/config';
import cors from 'cors';
import express from 'express';

import categorizationRoute from './categorizationRoute.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/categorization', categorizationRoute);

const PORT = 5001;

app.listen(PORT, () => {
  console.log(`Server is running on http://127.0.0.1:${PORT}`);
});

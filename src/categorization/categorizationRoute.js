import express from 'express';

import { commentCategorization } from './categorizationController.js';

const router = express.Router();

router.post('/', commentCategorization);

export default router;

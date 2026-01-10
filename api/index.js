import serverless from 'serverless-http';
import app from '../index.js';
import 'ejs';

export const handler = serverless(app);

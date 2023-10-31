import express from 'express';
import { AuthHelper, RedirectHelper } from './AuthHelper.js';

const app = express();

const PORT = 3001;
const HOST = 'http://localhost'




app.get('/', (req, res) => {
    res.end('Welcome');
});

app.get('/api/linkedin/authorize', (req, res) => {
    return res.redirect(AuthHelper());
});

app.get('/api/linkedin/redirect', async(req, res) => {
    res.json(RedirectHelper(req.query.code));
});

app.listen(PORT, () => {
    console.log(`${HOST}:${PORT}`);
});
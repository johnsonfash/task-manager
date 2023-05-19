import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url))

const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'dist')));

app.use('*', function (_, res) {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`listening on port ${PORT} : http://localhost:${PORT}`);
});
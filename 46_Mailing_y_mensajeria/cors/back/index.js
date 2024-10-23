const express = require('express');
const app = express();
const cors = require('cors');

const corsOptions = {
    origin: ['https://example.com', "http://127.0.0.1:5500"],
    optionsSuccessStatus: 200,
}

app.use(cors(corsOptions));

const PORT = 3000;

app.get('/', (req, res) => {
    res.status(200).json({ message: "OK CORS" });
});

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));

const express = require('express');
const bodyParser = require('body-parser');
const nlp = require('./nlp');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/", async (req, res) => {
  try {
    const reqId = req.headers['x-request-id'];
    const data = await nlp(req.body.text);
    return res.json(data);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

app.listen(process.env.PORT, () => console.log(`Server running on Port ${process.env.PORT}`));
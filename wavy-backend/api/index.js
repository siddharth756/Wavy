const express = require('express');
const cors = require('cors');
const app = express()

app.use(cors())

app.get('/', (req, res) => {
    res.send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <title>Wavy</title>
        <style>
          body {
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            font-family: Arial, sans-serif;
            background: linear-gradient(to right, #6a11cb, #2575fc);
            color: white;
          }
          h1 {
            font-size: 8vw;
            text-align: center;
          }
        </style>
      </head>
      <body>
        <h1>Welcome to Wavy</h1>
      </body>
      </html>
    `);
});


module.exports = app
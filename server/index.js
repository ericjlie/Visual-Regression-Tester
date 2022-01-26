const express = require('express');
const controller = require('./controller/backstopController.js')
const webcrawler = require('./controller/webcrawler.js')
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
});

app.use(express.static(__dirname + '/../client/dist'));

// app.use('/backstop', express.static(__dirname + '/../backstop_data'));

app.get('/urls', webcrawler.fetchPages);

app.post('/reference', controller.reference);
app.post('/test', controller.test);

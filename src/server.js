const express = require('express');
const app = express();
const path = require('path');

app.get('/', (req, res) => {
  //res.send('Basic web server is running!')
  const htmlFile = path.resolve(__dirname, '../dist/index.html');
  res.sendFile(htmlFile);
})

app.use('/static', express.static(path.resolve(__dirname, '../dist')));

app.listen(3000, () => {
  console.log('Application is running at 3000')
})
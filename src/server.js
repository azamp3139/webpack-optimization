const express = require('express');
const app = express();
const path = require('path');
const expressStaticGzip = require('express-static-gzip');

app.get('/', (req, res) => {
  //res.send('Basic web server is running!')
  const htmlFile = path.resolve(__dirname, '../dist/index.html');
  res.sendFile(htmlFile);
})

//app.use('/static', express.static(path.resolve(__dirname, '../dist')));
app.use('/static', expressStaticGzip(
  path.resolve(__dirname, '../dist'),
  {
    enableBrotli: true,
    orderPreference: ['br', 'gz']
  }
));

app.listen(3000, () => {
  console.log('Application is running at 3000')
})
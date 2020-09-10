const express = require('express');

const app = express();

// static will load the index.html when no path is specified
app.use(express.static('./client'));

// exchange data with json format
app.use(express.json());
app.get('/game', (req, res) => {

});
app.listen(8080, () => {
  console.log('Server started at port: 8080');
});

// when using post rememer to include content-type: 'application/json'

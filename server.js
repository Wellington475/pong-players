const express = require('express');
const app     = express();

const server = app.listen(4242, () => {
  let port = server.address().port;

  console.log('\n\tListening at http://localhost:' + port+ '\n\n');
});

app.use(express.static('public'));

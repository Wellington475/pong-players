const express = require('express');
const app     = express();

const server = app.listen(3000, () => {
  let port = server.address().port;

  console.log('\n\tListening at http://localhost:' + port+ '\n\n');
});

 const http = require("http");
const app = require("./index");

const server = http.createServer(app);
server.listen(2400, (req, res) => {
  console.log("Server is listening on port 2400");
});




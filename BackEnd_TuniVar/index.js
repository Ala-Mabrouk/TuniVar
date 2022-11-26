const express = require("express")
var cors = require("cors")
const bodyParser = require("body-parser");

 const userRoute = require("./Routes/userRoutes")
// const filesRoute = require("./Routes/filesRoutes")
 const projectRoute = require("./Routes/projectsRoutes.js")
// const sharedDataRoute = require("./Routes/sharedInfoRoutes")

const app = express()
var mongo = require('mongodb');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
app.use(express.static('files'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static('./'))
app.use(cors())


MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  console.log("Database connected !");
  db.close();
});
app.use('/user', userRoute)
app.use('/project', projectRoute)
// app.use('/files', filesRoute)
// app.use("/info", sharedDataRoute)

module.exports = app 
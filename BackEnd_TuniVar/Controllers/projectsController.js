var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/";

const connectionDb = require("../connectionDb");
const jwt = require("jsonwebtoken");
const util = require("util");
//const query = util.promisify(connectionDb.query).bind(connectionDb);
//const Project = require("../Models/Project");
var mailtemp;

function getMailFromToken(req) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  jwt.verify(token, process.env.ACCESS_TOKEN, (err, response) => {
    if (!err) {
      //     console.log(response);
      console.log(response.email);
      mailtemp = response.email + "";
    } else {
      console.log(err);
    }
  });
}

const addProject = async (req, res) => {
  let tempProjectInfo = req.body;
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("TuniMocracysDB");
    dbo.collection("Projects").insertOne(tempProjectInfo, function (err, res) {
      if (err) throw err;
      console.log("1 document inserted");
      db.close();
      return res.status(200).json("project added successfully");
     
    });
  });
  return res.status(500).json(err);
}


const getprojectByName = async (req, res) => {
  var query = { projectName: req.params.nomProjet };

  MongoClient.connect(url, function (err, db) {
    dbo.collection("Projects").find({ query }, function (err, result) {
      if (err) throw err;
      if (result != null) {
        return res.status(200).json(result);
      }

      return res.status(401).json("project not found !!");
    });
  });

  console.log(a[0]);
  return res.status(200).json(a);
};

 
const getAllProjects = async (req, res) => {
  try {
    MongoClient.connect(url, function (err, db) {
      if (err) throw err;
      var dbo = db.db("TuniMocracysDB");
      dbo
        .collection("Projects")
        .find({})
        .toArray(function (err, result) {
          if (err) throw err;
          return res.status(200).json(result);
        });
    });
  } catch (errDataProjet) {
    console.log(errDataProjet);
    return res.status(500).json("smthing bad happend !");
  }
};


module.exports = {
  addProject,
  getAllProjects,
  getprojectByName,
};

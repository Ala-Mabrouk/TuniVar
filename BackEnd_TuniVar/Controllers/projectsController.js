var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/";
var ObjectId = require('mongoose').Types.ObjectId;
const connectionDb = require("../connectionDb");
const jwt = require("jsonwebtoken");
const util = require("util");
const {spawn} = require('child_process');
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


const getProjectById = async (req, res) => {
   var query = { _id: req.params.idProjet };
  console.log(query)

  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("TuniMocracysDB");
    dbo.collection("Projects").findOne({ query }, function (err, result) {
      if (err) throw err;
      if (result != null) {
        return res.status(200).json(result);
      }

      
    });
  });
  return res.status(401).json("project not found !!");
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
const addComment = async (req,res)=>{
  resWeb=req.body
  console.log(resWeb)
  var commentResult;
  var process = spawn('python',["./untitled4.py ", "check ",
                            req.body.commentContent] ); 

    process.stdout.on('data', function(data) { 
    console.log(data[0].toString());
           commentResult=data[0].toString() 
    } ) 
    if(commentResult=="Offensive Speech"){
      return res.status(401).json("bad word are not allowed ")
    }
  try {
    var myquery={_id:req.body.projectId}
    MongoClient.connect(url, function (err, db) {
      if (err) throw err;
      var dbo = db.db("TuniMocracysDB");
      dbo
        .collection("Projects").updateOne({myquery},{$push:{"comments":{userName:resWeb.userName,dateComment:resWeb.commentDate,commentContent:resWeb.commentContent}}})
        return res.status(200).json("comment is done !");
    });
  } catch (errDataProjet) {
    console.log(errDataProjet);
    return res.status(500).json("smthing bad happend !");
  }


} 

module.exports = {
  addProject,
  getAllProjects,
  getProjectById,
  addComment,
};

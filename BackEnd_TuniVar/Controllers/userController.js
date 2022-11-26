const jwt = require("jsonwebtoken");
const connction = require("../connectionDb");
const cryptPass = require("bcrypt");
const authServices = require("../Services/authentication");
const util = require("util");
const query = util.promisify(connction.query).bind(connction);
var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/";

function generateCryptedPass(plainPass) {
  const hash = cryptPass.hashSync(plainPass, 5);
  return hash;
}
function verifPass(plainPass, hashedPass) { 
  return cryptPass.compareSync(plainPass, hashedPass); 
}

const userSignUp = (req, res) => {
  let newUser = req.body;

  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("TuniMocracysDB");
    var query = { numUniqueWeb: newUser.userUniqueNum };
    dbo.collection("users").find({ query }).toArray( function (err, result) {
      if (err) throw err;
      if (result[0] != null) {
        return res.status(400).json("user already exist !");
      }
    });
    //checking the web num
    query={uniqueId:newUser.userUniqueNum}
    dbo.collection("usersWebNum").find({ query }).toArray( function (err, result) {
        if (err) throw err;
        if (result[0] == null|| result[0].userPhone!=newUser.userPhone) {
            return res.status(400).json("num web invalid or doesn't match info  ! ");
        }
      });

    const cryptedpass = generateCryptedPass(newUser.userPassword);
    newUser.userPassword = cryptedpass;
    dbo.collection("users").insertOne(newUser, function (err, res) {
      if (err) throw err;
      console.log("1 document inserted");
      db.close();
      
    });
   // return res.status(500).json(err);
  });
};

const userLogin = (req, res) => {
  const logedUser = req.body;
  var query = { userEmail: logedUser.userEmail };
 

  MongoClient.connect(url, function (err, db) {
    var dbo = db.db("TuniMocracysDB");
  dbo.collection("users").find({ query }).toArray(function (err, result) {
    if (err) throw err;
    if (result != null) {  
        return res.status(200).json("{ token: "+result.toString()+" }");
    }else{
        return res.status(401).json("check your credentinals");
    }
  });})


};
const userVote=(req,res)=>{

  const resWeb=req.body // have user id- projectid-datevote-repVote
  var myquery={userId:resWeb.idUser}
  MongoClient.connect(url, function (err, db) {
    var dbo = db.db("TuniMocracysDB");

    dbo.collection("users").find({ myquery }, function (err, result) {
      if (err) throw err;
      if (result != null) {
         dbo.collection("users").updateOne({myquery},{$push:{"votes":{project:resWeb.idProject,dateVote:resWeb.voteDate,repVote:resWeb.repUser}}})
        
      }else{
          return res.status(401).json("problem occured ");
      }
      return res.status(200).json("vote saved");

    });})
}

// const userInfo = async (req, res) => {
//   const userToken = req.params.token;
//   userEmail = authServices.getMailFromToken(userToken);

//   let queryUser = "select u.* from users u where u.userEmail=?";
//   resRech = await query(queryUser, [userEmail]);

//   if (resRech != null) return res.status(200).json(resRech);

//   return res.status(500).json("user not found");
// };
const userToken = (req, res) => {
  let tres = authServices.validateToken(req);
  if (tres) {
    return res.status(200).json("valid token");
  } else {
    return res.status(401).json("invalid token");
  }
};

const userInfoById = async (req, res) => {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    var query = { numUniqueWeb: "" };
    dbo.collection("users").findOne({}, function (err, result) {
      if (err) throw err;
      console.log(result.name);
      db.close();
    });
  });

  return res.status(500).json("user not found");
};

module.exports = {
  userSignUp,
  userLogin,
   userToken,
  userInfoById,
};

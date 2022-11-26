const mySql = require("mysql");
var connction = mySql.createConnection({
  port: 3306,
  host: "localhost",
  user: "root",
  password: "",
  database: "TuniVarDB"
});
connction.connect((err) => {
  if (!err) {
    console.log("connected to database .");
  } else {
    console.log("No Connection to DB");
    console.log(err);
  }
});
 
module.exports = connction;
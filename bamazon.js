var mysql = require("mysql");
var inquirer = require('inquirer');

var connection = mysql.createConnection({
 host: "localhost",

 // Your port; if not 3306
 port: 3306,

 // Your username
 user: "root",

 // Your password
 password: "rootLola",
 database: "bamazonDB"
});
connection.connect(function(err) {
   if (err) throw err;

});

 connection.query('SELECT * FROM products', (err,rows) => {
    if(err) throw err;
    start();
   
    console.log(rows);
   
 
  });

  function start() {
    // prompt for info about the item being put up for auction
    inquirer
      .prompt([
        {
          name: "item",
          type: "input",
          message: "ID of product you want to buy?"
        },
        {
          name: "category",
          type: "input",
          message: "How many would you like?"
        },
        
      ])
    }
    start();
 
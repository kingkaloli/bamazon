require ('dotenv').config()
var mysql = require("mysql");
var inquirer = require('inquirer');
var console_table = require('console.table')

var connection = mysql.createConnection({
  host: "localhost",

  // port
  port: 3306,

  // username
  user: "root",

  // password
  password: process.env.password,
  database: "bamazonDB"
})

connection.connect(function (err) {
  if (err) throw err;
  


})




var purchaseTable = function () {
    connection.query("SELECT * FROM products", function (err, res) {
      if (err) throw err
      console.table(res)
     
    
    })
    
  
  }
  var lowInv= function () {
    connection.query("select * FROM products where stockquanity < 3", function (err, res) {
      if (err) throw err
      console.table(res)
     
    
    })
    
  
  }
    var addInv= function () {
    connection.query("select * FROM products where stockquanity < 3", function (err, res) {
      if (err) throw err
      console.table(res)
     
    
    })
    
  
  }




    inquirer
      .prompt({
        name: "manager",
        type: "list",
        message: "hello sir, how can I help you?",
        choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory","Add New Product"]
      
    })
    .then(function(answer) {
        // based on their answer, either call the bid or the post functions
        if (answer.manager === "View Products for Sale") {
            
            purchaseTable()
          
        }
        if (answer.manager === "View Low Inventory" ) {
            lowInv()

 
        }
        if (answer.manager ===  "Add to Inventory") {
            inquirer.prompt([{
                type: 'input',
                name: 'choice',
                message: "What item ID Boss Man?",
                validate: function (val) {
             
                }
              }])

 
        }
    
    })
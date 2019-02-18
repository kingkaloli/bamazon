var mysql = require("mysql");
var inquirer = require('inquirer');

var connection = mysql.createConnection({
    host: "localhost",

    // port
    port: 3306,

    // username
    user: "root",

    // password
    password: "rootLola",
    database: "bamazonDB"
});

connection.connect(function (err) {
    if (err) throw err;
    purchaseTable()
 

})
var purchaseTable = function() {
connection.query("SELECT * FROM products", function(err,res){
for(var i=0; i<res.length; i++){
    console.log(res[i].itemid+"  "+res[i].productname+"||"+
    res[i].departmentname+"||"+res[i].price+"||"+res[i].
    stockquanity+"\n");
    
}
customerOrder(res);
})


 }

var customerOrder = function (res){
inquirer
       .prompt([{
        type: "input",
        name: "name",
        message: "What would you like to buy? "
    
       }])
       .then(function(answer){
         var correct= false;
         for(var i=0; i<res.legth; i++){
          if (res[i].productname==answer.choice) {
            correct=true;
            var product=answer.choice;
            var id=i;
          }
         }
        })
      }

//  .then(function(user) {

  

//   console.log(user.name);
  
//     })
  

//take in user input 

//compare to mysql databas = stockqunaity 

//

// Once the customer has placed the order, your application should check if your store has enough of the product to meet the customer's request.

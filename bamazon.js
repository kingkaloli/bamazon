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
               name: "item",
               type: "input",
               message: "ID of product you want to buy?"
           },
         {
                name: "howMany",
                type: "input",
                message: "How many would you like?"
                
          },

        ])
 }



// Once the customer has placed the order, your application should check if your store has enough of the product to meet the customer's request.
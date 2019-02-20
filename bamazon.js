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
})

connection.connect(function (err) {
  if (err) throw err;
  purchaseTable()


})
var purchaseTable = function () {
  connection.query("SELECT * FROM products", function (err, res) {
    for (var i = 0; i < res.length; i++) {
      console.log(res[i].itemid + "  " + res[i].productname + "||" +
        res[i].departmentname + "||" + res[i].price + "||" + res[i].stockquanity+ "\n");

    }
    promptCustomer(res);
  })

}

var promptCustomer = function (res) {
  inquirer.prompt([{
    type: "input",
    name: "choice",
    message: "what do you want to buy? "
  }]).then(function (answer) {
    var correct  = false;
    for (var i = 0; i < res.length; i++) {
      if (res[i].productname== answer.choice) {
        correct = true;
        var product = answer.choice;
        var id = i;
        inquirer.prompt({
          type: "input",
          name: "quant",
          message: "How many dude?  ",
          validate: function (value) {
            if (isNaN(value) == false) {
              return true;
            } else {
              return false;
            }
          }
      
        }).then(function (answer){
          if((res[id].stockquanity-answer.quant)>0){
            connection.query("UPDATE products SET stockquanity = stockquanity - ? WHERE itemid = ?", [stockquanity, product.itemid],function (err, res2){
            console.log("You got it bro!");
                purchaseTable();
               
              })

          } else {
            console.log("What dude? Just pick something");
            promptCustomer(res);
          }
        })
      }
     }
  })
}










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
  purchaseTable()


})

var purchaseTable = function () {
  connection.query("SELECT * FROM products", function (err, res) {
    if (err) throw err
    // for (var i = 0; i < res.length; i++) {
    //   console.log(res[i].itemid + "  " + res[i].productname + "||" +
    //     res[i].departmentname + "||" + res[i].price + "||" + res[i].stockquanity + "\n");
    console.table(res)
    promptCustomer(res);
  
  })

}

var promptCustomer = function (inventory) {
  inquirer.prompt([{
    type: 'input',
    name: 'choice',
    message: "What is the ID of the item want to buy? [Cancel Purchase with C]",
    validate: function (val) {
      return !isNaN(val) || val.toLowerCase() === 'c'
    }
  }]).then(function (val) {
    promptExit(val.choice);
    var choiceId = parseInt(val.choice)
    var product = checkInventory(choiceId, inventory)
    if (product) {
      promptQuantity(product)
    } else {
      console.log('\nSorry, we do not carry that item.')
      purchaseTable()
    }
  })
}

function promptQuantity(product) {
  inquirer.prompt([{
    type: 'input',
    name: 'quantity',
    message: "How many dude? [Cancel Purchase with C]",
    validate: function (val) {
      return val > 0 || val.toLowerCase() === 'c'
    }
    // if (isNaN(value) == false) {
    //   return true;
    // } else {
    //   return false;
    // }
  }]).then(function (val) {
    promptExit(val.quantity)
    var quantity = parseInt(val.quantity)
    //console.log(product.stockquantity)
    //console.log(answer.quant)
    if (quantity > product.stockquanity) {
      console.log('\nInsufficient quantity!')
      console.log('\n===================================================')
      purchaseTable()
    } else {
      purchase(product, quantity)
    }
  })
}

function purchase(product, quantity) {
  connection.query(
    "UPDATE products SET stockquanity = stockquanity - ? WHERE itemid = ?", [quantity, product.itemid],
    function (err, res) {
      console.log("\nYou got it bro! Successfully purchased " + quantity + " " + product.productname + "'s!");
      console.log('\n========================================================')
      purchaseTable()
    }
  )
}
// } else {
//   console.log("What dude? Just pick something");
//   promptCustomer(res);
// }

function checkInventory(choiceId, inventory) {
  // var correct = false;
  for (var i = 0; i < inventory.length; i++) {
    if (inventory[i].itemid === choiceId) {
      return inventory[i]
      //correct = true;
      //var product = answer.choice;
      //var id = i;
    }
  }
  return null;
}

function promptExit(choice) {
  if (choice.toLowerCase() === 'c') {
    console.log('Later dude!')
    process.exit(0)
  }
}
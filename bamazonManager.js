var inquire = require('inquirer');
var mysql = require('mysql');

var connection = mysql.createConnection({

    host:"localhost",
    port: 3306,

    user: "root",

    password: "sun123",
    database: "bamazon"
});

function viewProducts()
{
    connection.query("Select * from products;", function(error, results){
        if(error) throw error
        // console.log(result);
        for(var i = 0; i < results.length; i++)
        {
            console.log(results[i].item_id + "||"+"PRODUCT: "+results[i].product_name+ "|"+" DEPARTMENT: "+results[i].department_name+ "|"+" PRICE: $"+ +results[i].price
        + "|"+" STOCK LEFT: "+ +results[i].stock_quantity);
        console.log();
        }
        connection.end();
    })
}

function lowInventory()
{
    connection.query("Select * from products where stock_quantity < 5;", function(error, results){
        if(error) throw error
        // console.log(result);
        for(var i = 0; i < results.length; i++)
        {
            console.log(results[i].item_id + "||"+"PRODUCT: "+results[i].product_name+ "|"+" DEPARTMENT: "+results[i].department_name+ "|"+" PRICE: $"+ +results[i].price
        + "|"+" STOCK LEFT: "+ +results[i].stock_quantity);
        console.log();
        }
        connection.end();
    })
}



connection.connect(function(err)
{
    if(err)throw err
    console.log("Connected with ID: " + connection.threadId);
    // connection.end();
})

inquire.prompt([
    {
        type: 'list',
        name: 'menu',
        message: 'Please select from the following: ',
        choices: ["View Products for Sale","View Low Inventory","Add to Inventory","Add New Product"]
    }

]).then(function(answer)
{
    
    console.log(answer.menu);
    switch(answer.menu)
    {
        case "View Products for Sale":
        {
            viewProducts();
            break;
        }case "View Low Inventory":
        {
            lowInventory();
            break;
        }case "Add to Inventory":
        {
            break;
        }case "Add New Product":
        {
            break;
        }
    }
})
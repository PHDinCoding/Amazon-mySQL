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
        // connection.end();
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

function addQuantToInventory()
{
    viewProducts();
    inquire.prompt([
        {
            type: 'list',
            name: 'id',
            message: 'Pick an item ID to add its stock',
            choices: ["1","2","3","4","5","6","7","8","9","10"]
        },
        {
            type: 'input',
            name: 'qty',
            message: 'How much stock would you like to add?'
        }

    ]).then(function(answer){
        

            connection.query("update products set stock_quantity = stock_quantity + "+answer.qty+" where ?;",[{item_id: answer.id}], 
            function(error, results){
            if(error) throw error
            // console.log(result);
            console.log("Stock Added!");
            connection.end();

                })

    })
    
}

function addToInventory()
{
    inquire.prompt([
        {
            type: 'input',
            name: 'product',
            message: 'Type the name of the product: '
        },
        {
            type: 'input',
            name: 'deptName',
            message: 'Department Name: '
        },
        {
            type: 'input',
            name: 'price',
            message: 'Price of the product: '
        },
        {
            type: 'input',
            name: 'quant',
            message: 'How much stock to add?'
        }
    ]).then(function(answer)
    {
        console.log(answer.product);
         console.log(answer.deptName);
          console.log(answer.price);
           console.log(answer.quant);

           
           var post = {product_name:answer.product, department_name:answer.deptName, price:answer.price, stock_quantity:answer.quant};
        //    (product_name, department_name, price, stock_quantity)
           connection.query("insert into products set ?",post,function(error,
           results){
               if(error) throw error
               console.log("Added your item");

               connection.end();
           })
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
    
    // console.log(answer.menu);
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
            addQuantToInventory();
            break;
        }case "Add New Product":
        {
            addToInventory();
            break;
        }
    }
})
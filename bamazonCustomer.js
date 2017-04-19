var inquire = require('inquirer');
var mysql = require('mysql');

var connection = mysql.createConnection({

    host:"localhost",
    port: 3306,

    user: "root",
    //Input your pass please
    password: "",
    database: "bamazon"
});

var inputfromUser = function()
{
    inquire.prompt([
        {
            type:"list",
            name:"id",
            message:"Enter the id of the item you'd like to buy.",
            choices: ["1","2","3","4","5","6","7","8","9","10"]
        },
        {
            type:"input",
            name:"qty",
            message:"Please specify the quantity (numbers only please)",
        }
    ]).then(function(answer)
    {
        console.log(answer.id);
        console.log(answer.qty);

        connection.query("select * from products where ?",[{item_id: answer.id}], function(error, results)
        {
            if (error) throw error;

            console.log(results[0].item_id);
            if(answer.qty < results[0].stock_quantity)
            {
                
                var quantity = answer.qty;

                console.log("Order is in stock and it's being placed!" );   
                // var x = "update products set stock_quantity = stock_quantity - '"+quantity+"' where item_id = "+answer.id;
                // var x = "update products set stock_quantity = stock_quantity - '"+quantity+"' where item_id = "+answer.id;
                // console.log(x);    

                connection.query("update products set stock_quantity = stock_quantity - '"+quantity+"' where ?",[{item_id: answer.id}],function(error, results)
                {
                    
                    if (error) throw error;
                    console.log("\nSuccessfully placed an order!");
                    connection.query("select * from products where ?",[{item_id: answer.id}], function(error, results)
                        {
                            var x = results[0].price;
                            var y = answer.qty;
                            var z = x * y;
                            console.log("\nThis is the total price of your order: "+z);
                            if (error) throw error;
                            // console.log("your total cost is: " + resu);
                            console.log("\nYour shopping session has been closed...");
                        })
                    
                });
            }else
            {
                console.log("Sorry, the item is currently out of stock.")
            }
            
        })

    })
}


connection.connect(function(err){
    if(err) throw err;
    console.log("Connected as id" + connection.threadId);

});

console.log("These are some of the items for sale...");

connection.query("select * from products",
// [{

//     artist: answer.query
// }], 
function (error, results) 
{
    if (error) throw error;

    // console.log("item_id", Array(12 + 1).join(" ")+ ' ' 
    // +"product_name", Array(12 + 1).join(" ")+ ' ' 
    // +"department_name", Array(12 + 1).join(" ")+ ' ' 
    // +"price", Array(12 + 1).join(" ")+ ' ' 
    // +"stock_quantity");

    for(var i = 0; i < results.length; i++)
    {
        
        console.log(results[i].item_id + "||"+"PRODUCT: "+results[i].product_name+ "|"+" DEPARTMENT: "+results[i].department_name+ "|"+" PRICE: $"+ +results[i].price
        + "|"+" STOCK LEFT: "+ +results[i].stock_quantity);
        console.log();
        
        
    }

    inputfromUser();
    

    
    // console.log("Connection Closed");
    

        
        


    
});


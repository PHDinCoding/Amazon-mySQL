var inquire = require('inquirer');
var mysql = require('mysql');

var connection = mysql.createConnection({

    host:"localhost",
    port: 3306,

    user: "root",

    password: "sun123",
    database: "bamazon"
});

connection.connect(function(err){
    if(err) throw err;
    console.log("Connected as id" + connection.threadId);

});

console.log("These are some of the items for sale...");

connection.query("select * from products",
// [{

//     artist: answer.query
// }], 
function (error, results) {
    if (error) throw error;
    console.log("item_id", Array(12 + 1).join(" ")+ ' ' +"product_name", Array(12 + 1).join(" ")+ ' ' 
    +"department_name", Array(12 + 1).join(" ")+ ' ' +"price", Array(12 + 1).join(" ")+ ' ' 
    +"stock_quantity");
    for(var i = 0; i < results.length; i++)
    {
        
        console.log(results[i].item_id + "||"+results[i].product_name+ "||" +results[i].department_name+ "||" +results[i].price
        + "||" +results[i].stock_quantity);
        
        
    }

    connection.end();
    console.log("Connection Closed");
    
    inquire.prompt([
    {
        type: "input",
        name: 'userInput',
        message: "Type the id of the item you'd like to place an order for."
    }
    ]).then(function(answers)
    {
        console.log(answers.userInput);
        
        if(answers.userInput != null){
    connection.query("select * from products",
// [{

//     artist: answer.query
// }], 
    function (error, results) 
    {
        if (error) throw error;
        console.log("item_id", Array(12 + 1).join(" ")+ ' ' +"product_name", Array(12 + 1).join(" ")+ ' ' 
        +"department_name", Array(12 + 1).join(" ")+ ' ' +"price", Array(12 + 1).join(" ")+ ' ' 
        +"stock_quantity");
            for(var i = 0; i < results.length; i++)
                {
        
                    console.log(results[i].item_id + "||"+results[i].product_name+ "||" +results[i].department_name
                        + "||" +results[i].price
                            + "||" +results[i].stock_quantity);
        
        
                }
    });
        }
        


    
});


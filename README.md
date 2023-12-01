# Loginer
EN: This simple node.js & mysql repo will make developing sign in, sing up and similar forms with node.js easier.

## How to use:
1. Require a mysql or mysql2 module and create a connection variable
2. Require loginer module.
3. Create an instance of loginer class and provide connection variable to the class. You can also povide default table name as a second parameter.

## Methods:
1. **loginer.signup(data: object, tableName(optional): string):**  
Requires an object keys of that need to be named as columns in your DB. Also, you can provide tableName if you need to add data to other table, if you didn't provide a tableName during initialization, you will need to provide tableName in this method.
The method will create an INSERT query. If successful will return "Success", will return sql err variable.
2. **loginer.login(data: object, tableName(optional): string, callback(rows, fields): function):**  
Parameters have identical requirements as in loginer.signup() method.
The method will create a SELECT ... WHERE ... query and return a callback.
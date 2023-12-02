# Loginer
EN: This simple npm package will make developing sign in, sing up and similar forms with node.js and mysql2 easier.
**Github:** https://github.com/ImEnotYoureNot/Loginer

## Instalation:
The package is available at npm: 
```console
npm i loginer.js
```

## How to use:
1. Require a mysql or mysql2 module and create a connection variable
2. Require loginer module.
3. Create an instance of loginer class and provide connection variable to the class. You can also provide default table name as a second parameter.

## Methods:
1. **loginer.signup(data: object, tableName(optional): string, callback(status: string): function):**  
Requires an object keys of that need to be named as columns in your DB. Also, you can provide tableName if you need to add data to other table or if you didn't provide a tableName during initialization.
The method will create an INSERT query. If successful will return err === "200", if not it will return an sql err.
2. **loginer.login(data: object, tableName(optional): string, callback(err, rows, fields): function):**  
Parameters have identical requirements as in loginer.signup() method.
The method will create a SELECT ... WHERE ... query and return a callback with err === "200".
3. **loginer.updateData(data: object, conditions: object, tableName: string, callback(status): function):**
Data parameter: requires an object keys of which must be the same as table column names. Conditions: WHERE key = value.

## Variables:
1. **loginer.connection:** your mysql2 connection.
2. **loginer.tableName:** default name of the db table.
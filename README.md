EN: This simple node.js & mysql repo will make developing sign in, sing up and similar forms with node.js easier.

HOW TO USE:
1. Require a mysql module and create a connection variable
2. Create an instance of loginer class and provide connection variable to the class. You can also povide default table name as a second parameter.

METHODS:
1. loginer.signup(data: object, tableName(optional): string):
Requires an object keys of that need to be named as columns in your DB. Also, you can provide tableName if you need to add data to other table, if you didn't provide a tableName during initialization, you will need to provide tableName in this method.
The method will create an INSERT query. If successful will return "Success", will return sql err variable.
2. loginer.login(data: object, tableName(optional): string)
Parameters have identical requirements as in loginer.signup() method.
The method will create a SELECT ... WHERE ... query and return rows and fields from the answer.
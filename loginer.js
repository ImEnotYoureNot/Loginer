class loginer{
    constructor(connection, usersTableName = ""){
        if(typeof usersTableName != "string"){
            return console.log(Error("Table name must be a string."))
        }

        this.connection = connection
        this.tableName = usersTableName
    }

    signup(signupInfo, tableName = "", callback){
        if(typeof signupInfo != "object"){
            return console.log(Error("Loginer.signup err: Signup info must be an object."))
        }

        let sqlTableName = this.tableName
        if(tableName != ""){
            sqlTableName = tableName
        }else if(this.tableName == ""){
            return console.log(Error("Table name needed."))
        }

        let i = 0
        let insertKeys = ""
        let insertValues = ""
        while(Object.keys(signupInfo).length > i){
            insertKeys = insertKeys + ',' +  Object.keys(signupInfo)[i]
            insertValues = insertValues + ', "' + signupInfo[Object.keys(signupInfo)[i]] + '"';
            i++
        }

        insertKeys = insertKeys.substring(1)
        insertValues = insertValues.substring(1)

        let sql = "INSERT INTO " + sqlTableName + "(" + insertKeys + ") VALUES(" + insertValues + ");"

        this.connection.query(sql, (err, rows, fields) => {
            if(err){
                return console.log(Error(err))
            }else{
                callback("Success")
            }
        })
    }

    login(credentials, tableName = "", callback){
        if(typeof credentials != "object"){
            return console.log(Error("Loginer.login err: Credentials must be an object."))
        }

        let sqlTableName = this.tableName
        if(tableName != ""){
            sqlTableName = tableName
        }

        let i = 0
        let whereClause = ""
        while(Object.keys(credentials).length > i){
            whereClause = whereClause + " AND " + Object.keys(credentials)[i] + " = '" + credentials[Object.keys(credentials)[i]] + "'"
            i++
        }
        whereClause = whereClause.substring(4) + ";"

        let sql = "SELECT * FROM " + sqlTableName + " WHERE" + whereClause

        this.connection.query(sql, (err, queryRows, queryFields) => {
            if(err){
                return console.log(Error(err))
            }

            callback(queryRows, queryFields)
        })
    }
}


module.exports = loginer
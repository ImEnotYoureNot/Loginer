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
        let Qmarks = ""
        const insertValues = []

        while(Object.keys(signupInfo).length > i){
            insertKeys = insertKeys + ',' +  Object.keys(signupInfo)[i]
            Qmarks = Qmarks + ',' + "?"
            insertValues.push(signupInfo[Object.keys(signupInfo)[i]])
            i++
        }

        insertKeys = insertKeys.substring(1)
        Qmarks = Qmarks.substring(1)

        let sql = "INSERT INTO " + sqlTableName + "(" + insertKeys + ") VALUES(" + Qmarks + ");"

        this.connection.execute(
            sql,
            insertValues,
            function(err, results, fields){
                if(err) callback(err)

                callback("200")
            }
        )
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
        const data = []
        while(Object.keys(credentials).length > i){
            whereClause = whereClause + " AND " + Object.keys(credentials)[i] + " = ?"
            data.push(signupInfo[Object.keys(signupInfo)[i]])
            i++
        }
        whereClause = whereClause.substring(4) + ";"

        let sql = "SELECT * FROM " + sqlTableName + " WHERE" + whereClause

        this.connection.execute(
            sql,
            data,
            function(err, results, fields){
                if(err) callback(Error(err), null,  null)

                callback("200", results, fields)
            }
        )
    }

    updateData(data, conditions, tableName = "", callback){
        console.log(typeof data)
        if(typeof data != "object" || typeof conditions != "object" || typeof tableName != "string"){
            return console.log(Error("loginer.updateData: Check your parameter types."))
        }

        let sqlTableName = this.tableName
        if(tableName != ""){
            sqlTableName = tableName
        }

        let i = 0
        const dataArr = []
        let fields = ""
        while(Object.keys(data).length > i){
            fields = fields + "," + Object.keys(data) + " = ?"
            dataArr.push(data[Object.keys(data)[i]])
            i++
        }
        fields = fields.substring(1)

        i = 0
        let conditionsData = ""
        while(Object.keys(conditions).length > i){
            conditionsData = conditionsData + "," + Object.keys(conditions)[i] + " = ?"
            dataArr.push(conditions[Object.keys(conditions)[i]])
            i++
        }
        conditionsData = conditionsData.substring(1)

        let sql = "UPDATE " + sqlTableName + " SET " + fields + " WHERE " + conditionsData

        this.connection.execute(
            sql,
            dataArr,
            function(err, rows, fields){
                if(err) return callback(err)

                return callback("200")
            }
        )
    }
}


module.exports = loginer
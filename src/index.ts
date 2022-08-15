import { createConnection } from "typeorm"
import { Banker } from "./entities/Banker"
import { Client } from "./entities/Client"
import { Transactions } from "./entities/Transaction"
console.log('lets see')

const main = async () => {
    try {
        await createConnection({
            type: "postgres",
            host: "localhost",
            port: 5432,
            username: "postgres",
            password: "admin",
            database: 'ormtut',
            entities: [Client, Banker, Transactions],
            synchronize: true
        })
        console.log("connected to psql")
    } catch (error) {
        console.log('error', error)
        throw new Error("Uanble to coonect to DB")
    }
}
main()
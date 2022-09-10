import { createConnection } from "typeorm"
import { Banker } from "./entities/Banker"
import { Client } from "./entities/Client"
import { Transactions } from "./entities/Transaction"
import clientRoute from './routes/clientsRoutes'
import bankerRoute from './routes/bankerRoutes'
import transcationRoute from "./routes/transactionClient"
import bankerClientRoute from "./routes/bankerClientRoute"
import fetchClient from "./routes/fetchClients"
import express from "express"

const app = express();
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

        app.use(express.json())
        app.use(clientRoute)
        app.use(bankerRoute)
        app.use(transcationRoute)
        app.use(bankerClientRoute)
        app.use(fetchClient)

        app.listen(5000, () => console.log(`server is running on port ${5000}...`))
    } catch (error) {
        console.log('error', error)
        throw new Error("Uanble to coonect to DB")
    }
}
main()
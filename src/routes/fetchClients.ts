import express from "express"
import { Client } from "../entities/Client";
import { createQueryBuilder } from "typeorm";

const router = express.Router()

router.route("/api/clients").get(async (req, res) => {
    const client = await createQueryBuilder('client')
        .select('client.first_name').addSelect('client.last_name')
        // .addSelect("SUM(transaction)","sum")        //sum of the transaction and named them sum
        .from(Client, 'client')
        .leftJoinAndSelect('client.transactions','astableheadname')
        .where('client.id = :clientId', { clientId: 3 })
        .where('client.balance >= :minbalance AND client.balance <= :maxbalance', { minbalance: 500000, maxbalance:1000000 })
        .getMany()
        // .getOne()

    return res.json(client)
})

export default router;
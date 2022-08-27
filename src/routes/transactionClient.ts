import express from "express";
import { Transactions, TransactionType } from "../entities/Transaction"
import { Client } from "../entities/Client";
const router = express.Router();

router.route("/api/client/:cleintId/transaction").post(async (req, res) => {
    try {
        const { cleintId } = req.params;
        const { type, amount } = req.body
        const client = await Client.findOne({ where: { id: parseInt(cleintId) } });
        if (!client) {
            return res.json({ msg: "client not found" })
        }

        const transaction = Transactions.create({
            amount,
            type,
            client
        })

        await transaction.save()

        if (type === TransactionType.DEPOSIT) {
            client.balance = client.balance + amount
        } else if (type === TransactionType.WITHDRAW) {
            client.balance = client.balance - amount
        }

        await client.save()

        return res.json({ msg: "transcation successfull" })

    } catch (error) {
        console.log('error', error)
        return res.json(error)

    }

});

export default router

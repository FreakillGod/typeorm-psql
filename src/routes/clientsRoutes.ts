import express from "express";
import { Client } from "../entities/Client"
const router = express.Router();

router.route("/api/client").post(async (req, res) => {
    try {
        const { firstName, lastName, email, cardNumber, balance } = req.body
        const client = Client.create({
            first_name: firstName,
            last_name: lastName,
            email,
            card_number: cardNumber,
            balance
        })

        await client.save()
        return res.json(client)
    } catch (error) {
        console.log('error', error)
        return res.json(error)

    }

});

router.route("/api/client/:clientId").delete(async (req, res) => {
    const { clientId } = req.params;

    const response = await Client.delete(parseInt(clientId))

    return res.json(response)
})

export default router

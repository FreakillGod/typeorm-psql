import express from "express";
import { Banker } from "../entities/Banker";
import { Client } from "../entities/Client";
const router = express.Router();

router.route("/api/backer/:bankerId/client/:clientId").put(async (req, res) => {
    try {
        const { bankerId, clientId } = req.params;
        const { type, amount } = req.body
        const banker = await Banker.findOne({ where: { id: parseInt(bankerId) } });
        const client = await Client.findOne({ where: { id: parseInt(clientId) } });

        if (!client || !banker) {
            return res.json({ msg: "banker or client not found" })
        }

        banker.clients = [
            client
        ]

        await banker.save()

        return res.json({ msg: "banker connected to cleint successfull" })

    } catch (error) {
        console.log('error', error)
        return res.json(error)

    }

});

export default router

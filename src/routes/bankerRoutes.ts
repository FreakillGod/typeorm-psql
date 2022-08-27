import express from "express";
import { Banker } from "../entities/Banker"
const router = express.Router();

router.route("/api/banker").post(async (req, res) => {
    try {
        const { firstName, lastName, email, cardNumber, employeeNumber, balance } = req.body
        const banker = Banker.create({
            first_name: firstName,
            last_name: lastName,
            email,
            card_number: cardNumber,
            employee_number: employeeNumber,
        })

        await banker.save()
        console.log('banker', banker)
        return res.json(banker)
    } catch (error) {
        console.log('error', error)
        return res.json(error)
    }
});

export default router

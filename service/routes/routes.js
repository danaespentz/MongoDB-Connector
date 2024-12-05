const express = require('express');
const router = express.Router();
const Person = require('../models/Person');

/**
 * @swagger
 * /api/details/{visaNumber}:
 *   get:
 *     summary: Retrieve data from collection
 *     description: Retrieve data from collection based on visaNumber
 *     tags:
 *       - "Data Retrieve"
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: visaNumber
 *         description: Visa Number to retrieve data from collection.
 *         schema:
 *           type: string
 *           required: true
 *     responses:
 *       '200':
 *         description: Success
 *       '400':
 *         description: Bad request
 *       '404':
 *         description: Person not found
 */
router.get('/details/:visaNumber', async (req, res) => {
    const visaNumber = req.params.visaNumber;

    if (!visaNumber) {
        return res.status(400).json({ error: "Visa number is required" });
    }

    try {
        const person = await Person.findOne({ "visa.number": visaNumber });

        if (!person) {
            return res.status(404).json({ error: "Person not found" });
        }

        res.status(200).json(person);
    } catch (err) {
        console.error("Error fetching person:", err);
        res.status(500).json({ error: "Internal server error" });
    }
});

/**
 * @swagger
 * /api/all:
 *   get:
 *     summary: Retrieve all person objects
 *     description: Retrieve all person objects from the database
 *     tags:
 *       - "Data Retrieve"
 *     produces:
 *       - application/json
 *     responses:
 *       '200':
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: Unique identifier for the person
 *                   person:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                         description: Name of the person
 *                       idcard:
 *                         type: string
 *                         description: ID card number of the person
 *                       alert:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             category:
 *                               type: string
 *                               description: Alert category
 *                             description:
 *                               type: string
 *                               description: Description of the alert
 *                             action:
 *                               type: string
 *                               description: Recommended action
 *                             photo:
 *                               type: string
 *                               description: Photo in base64 format
 *                   visa:
 *                     type: object
 *                     properties:
 *                       number:
 *                         type: string
 *                         description: Visa number
 *                       status:
 *                         type: string
 *                         description: Visa status
 *                       issuer:
 *                         type: string
 *                         description: Issuing authority
 *                       date:
 *                         type: string
 *                         format: date-time
 *                         description: Visa issue date
 *                       type:
 *                         type: string
 *                         description: Visa type
 *                   vehicle:
 *                     type: object
 *                     properties:
 *                       make:
 *                         type: string
 *                         description: Vehicle make
 *                       model:
 *                         type: string
 *                         description: Vehicle model
 *                       year:
 *                         type: integer
 *                         description: Manufacturing year
 *       '500':
 *         description: Internal server error
 */
router.get('/all', async (req, res) => {
    try {
        const persons = await Person.find({});
        console.log("Fetched persons:", persons); 
        res.status(200).json(persons);
    } catch (err) {
        console.error("Error fetching all persons:", err);
        res.status(500).json({ error: "Internal server error" });
    }
});


module.exports = router;
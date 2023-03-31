import express from 'express';
import { GoogleSpreadsheet } from 'google-spreadsheet'
import * as dotenv from 'dotenv';
import fs from 'fs';
dotenv.config()

const PORT = process.env.PORT || 8080

const app = express()
app.use(express.json())

const CREDENTIALS = JSON.parse(fs.readFileSync('service_account.json'))
// console.log(CREDENTIALS);
const doc = new GoogleSpreadsheet(process.env.SHEET_ID);
await doc.useServiceAccountAuth({
    client_email: CREDENTIALS.client_email,
    private_key: CREDENTIALS.private_key,
});
await doc.loadInfo(); // loads document properties and worksheets
// console.log(doc.title);
const sheet = doc.sheetsByIndex[0]; // or use doc.sheetsById[id] or doc.sheetsByTitle[title]


app.get('/', (req, res) => {
    res.status(200).send({
        messege: 'Your server is up and running'
    })
})

app.post('/', async (req, res) => {
    const body = req.body
    const session = body.session
    const params = body.queryResult.parameters
    const intent = body.queryResult.intent.displayName
    // console.log(session, params, intent);
    let resData = {}
    try {
        if (intent === 'bookRide') {
            const { name, vehical, from, to } = params
            await sheet.addRow({
                name,
                vehical,
                from,
                to,
                session
            })
            resData.fulfillmentText = `Ok ${name}, You ${vehical} has been booked from ${from} to ${to}`
            //  {
            //     "fulfillmentMessages": [
            //         {
            //             "text": {
            //                 "text": [
            //                     `Ok ${name}, You ${vehical} has been booked from ${from} to ${to}`

            //                 ]
            //             }
            //         }
            //     ],
            // }
        }
    } catch (error) {
        console.log(error);
        resData = {
            fulfillmentMessages: [
                {
                    "text": {
                        "text": [
                            `something went wrong`

                        ]
                    }
                }
            ]
        }
    }

    res.send(resData)
})


app.listen(PORT, () => console.log(`server is running on ${PORT}`))

//https://cloud.google.com/dialogflow/es/docs/fulfillment-webhook
//https://cloud.google.com/dialogflow/es/docs/reference/rest/v2beta1/WebhookResponse
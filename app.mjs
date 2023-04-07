import express from 'express';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import webhookRoute from './routers/webhook.mjs'
dotenv.config()

const PORT = process.env.PORT || 8080

const app = express()
app.use(express.json())

const dbUri = process.env.DB_URI
mongoose.connect(dbUri)

app.get('/', (req, res) => {
    res.status(200).send({
        messege: 'Your server is up and running'
    })
})

app.use('/webhook', webhookRoute)


app.listen(PORT, () => console.log(`server is running on ${PORT}`))

//https://cloud.google.com/dialogflow/es/docs/fulfillment-webhook
//https://cloud.google.com/dialogflow/es/docs/reference/rest/v2beta1/WebhookResponse
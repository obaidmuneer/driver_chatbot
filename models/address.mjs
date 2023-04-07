import { Schema, model } from "mongoose";

const addressSchema = new Schema({
    name: { type: String, required: true },
    address: { type: String, required: true }
})

const addressModel = model('Addresses', addressSchema)

export default addressModel
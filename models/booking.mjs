import { Schema, model } from "mongoose";

const bookingSchema = new Schema({
    name: { type: String, required: true },
    vehical: { type: String, required: true },
    from_town: { type: String, required: true },
    to_town: { type: String, required: true },
})

const bookingModel = model('bookings', bookingSchema)

export default bookingModel


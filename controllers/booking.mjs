import bookingModel from "../models/booking.mjs"

const create_booking = async (req) => {
    const { name, vehical, from_town, to_town } = req.body.queryResult.parameters
    const bookerName = name.name
    await bookingModel.create({ name: bookerName, vehical, from_town, to_town })
}

export default { create_booking }
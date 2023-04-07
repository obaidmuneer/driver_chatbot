import addressModel from '../models/address.mjs'

const create_fav_address = async (req) => {
    const { fav, add } = req.body.queryResult.parameters
    await addressModel.create({ name: fav, address: add })
}

const update_fav_address = async (req) => {
    const { oldFav, newFav } = req.body.queryResult.parameters
    await addressModel.findOneAndUpdate({ name: oldFav }, { name: newFav })
}

export default { create_fav_address, update_fav_address }
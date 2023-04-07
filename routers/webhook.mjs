import { Router } from 'express'
import UTILS from '../helper/utils.mjs'
import CONTROLLERS from '../controllers/export_controller.mjs'
const router = Router()

router.post('/', async (req, res) => {
    let response = {}

    try {
        const body = req.body
        const session = body.session
        const params = body.queryResult.parameters
        const intent = body.queryResult.intent.displayName

        console.log(intent);
        console.log(params);

        switch (intent) {
            case "booking":
                await CONTROLLERS.booking.create_booking(req)
                response = UTILS.response(`ok ${params.name.name} Your ${params.vehical} is ready from ${params.from_town} to ${params.to_town} the total cost is 10 rs please confirm`)
                break;

            case "favorite":
                await CONTROLLERS.address.create_fav_address(req)
                response = UTILS.response(`ok your favorite address is ${params.add} with name of ${params.fav}`)
                break;

            case "favorite-change":
                await CONTROLLERS.address.update_fav_address(req)
                response = UTILS.response(`Your favorite name has been changed.Do you want to update your address?`)
                break;

            default:
                break;
        }

        res.send(response)

    } catch (error) {
        console.log(error);
        response = UTILS.response(error.message)
        res.send(response)
    }
})

export default router
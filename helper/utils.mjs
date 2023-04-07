const response = (msg, outputcontext) => {
    const response = {}
    response.fulfillmentMessages = [
        {
            "text": { "text": [msg] }
        }
    ]
    return response
}

export default { response }
const url = require('url')
const express = require('express')
const router = express.Router()
const needle = require('needle')
const apicache = require('apicache')



//Env vars
const API_BASE_URL = process.env.API_BASE_URL
const API_KEY_NAME = process.env.API_KEY_NAME
const API_KEY_VALUE = process.env.API_KEY_VALUE

//Init cache
let cache = apicache.middleware

router.post('/', cache('2 minutes'), async (req, res) => {
    try {
        console.log(`POST received: ${req.body}`)
        //Forward client request to API using needle
        let options = {
            headers: {
                "Content-Type": "application/json",
                [API_KEY_NAME]: API_KEY_VALUE
            }
        }
        const apiRes = await needle.post(API_BASE_URL, req.body, options, (err, resp) => { //req.body must be used. Can't use whole stream
            console.log(resp.body)
            res.send(JSON.stringify(resp.body)) // stringifies the response body
        });
        console.log(apiRes.body)
    } catch (error) {
        res.status(500).json({
            error
        })
    }
})

/* router.post('/', cache('2 minutes'), async (req, res) => {
    try {
        console.log(url.parse(req.url, true).query)

        const params = new URLSearchParams({
            [API_KEY_NAME]: API_KEY_VALUE,
            ...url.parse(req.url, true).query //spread operator to spread url param values
        })

        const apiRes = await needle('post', `${API_BASE_URL}?${params}`)
        const data = apiRes.body

        if (process.env.NODE_ENV !== 'production') { //console logs post requests if not in production
            console.log(`REQUEST: ${API_BASE_URL}?${params}`)
        }

        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({
            error
        })
    }

}) */

module.exports = router
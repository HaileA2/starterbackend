const express = require('express')
const tourrouter = express.Router()
const app = express()
const fs = require('fs')
const path = require('path')
const tourcontroller = require('../Controller/tourcontroller.js')
const Router=express.Router()

tourrouter.route('/:id')
Router.param('id',tourcontroller.checkid)


tourrouter.route('/:id')
    .get(tourcontroller.gettourbyid)
    .patch(tourcontroller.updaterout);

tourrouter.route('/')
    .get(tourcontroller.getalltours)
    .post(tourcontroller.creatingtour)

module.exports = tourrouter
const express = require('express')
const tourrouter = express.Router()
const app = express()
const fs = require('fs')
const path = require('path')
const tourcontroller = require('../Controller/tourcontroller.js')
const authcontroller= require('./../Controller/authcontroller.js')

tourrouter.route('/tour-stat')
.get(tourcontroller.gettourstats)
tourrouter.route('/monthlyplan/:year')
.get(tourcontroller.getmonthlyplan)

tourrouter.route('/:id')
    .get(tourcontroller.gettourbyid)
    .delete(tourcontroller.deletetour)
    .patch(tourcontroller.updatetour);
tourrouter.route('/')
    .get(authcontroller.protect, tourcontroller.getalltours)
    .post(tourcontroller.creatingtour)

module.exports = tourrouter
import express from 'express'
import { getBarCharts, getPie, getstats } from '../Controller/stats.controller.js'


export const dashroute = express.Router()


dashroute.get("/stats",getstats)


dashroute.get("/pie",getPie)


dashroute.get("/bar",getBarCharts)


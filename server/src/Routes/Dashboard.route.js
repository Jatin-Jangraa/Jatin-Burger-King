import express from 'express'
import { getBarCharts, getPie, getstats } from '../Controller/stats.controller.js'
import { checkadmin } from '../middleware/Checkadmin.js'

export const dashroute = express.Router()


dashroute.post("/stats",checkadmin,getstats)


dashroute.post("/pie",checkadmin,getPie)


dashroute.post("/bar",checkadmin,getBarCharts)


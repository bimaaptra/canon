const offeringRouter = require('express').Router()
const {
  createOffering,
  deleteOffering,
  getOffering,
  getOfferingById,
  updateOffering
} = require('../controllers/offering')

offeringRouter.get('/', getOffering)
offeringRouter.get('/:id', getOfferingById)
offeringRouter.post('/', createOffering)
offeringRouter.put('/:id', updateOffering)
offeringRouter.delete('/:id', deleteOffering)

module.exports = offeringRouter

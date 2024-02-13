const claimWarrantyRouter = require('express').Router()
const {
  createClaimWarranty,
  deleteClaimWarranty,
  getClaimWarranty,
  getClaimWarrantyById,
  updateClaimWarranty
} = require('../controllers/claim-warranty')

claimWarrantyRouter.get('/', getClaimWarranty)
claimWarrantyRouter.get('/:id', getClaimWarrantyById)
claimWarrantyRouter.post('/', createClaimWarranty)
claimWarrantyRouter.put('/:id', updateClaimWarranty)
claimWarrantyRouter.delete('/:id', deleteClaimWarranty)

module.exports = claimWarrantyRouter

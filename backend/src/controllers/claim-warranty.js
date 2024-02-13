const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

exports.getClaimWarranty = async (req, res) => {
  try {
    const getClaimWarranty = await prisma.claimWarranty.findMany()
    res.status(200).json({
      status: true,
      message: 'Success get claim warranty',
      results: getClaimWarranty
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      status: false,
      message: 'Internal server error'
    })
  }
}

exports.getClaimWarrantyById = async (req, res) => {
  try {
    const { id } = req.params
    const getClaimWarranty = await prisma.claimWarranty.findUnique({
      where: {
        id: parseInt(id)
      }
    })
    res.status(200).json({
      status: true,
      message: 'Success get claim warranty',
      results: getClaimWarranty
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      status: false,
      message: 'Internal server error'
    })
  }
}

exports.createClaimWarranty = async (req, res) => {
  try {
    const { body } = req
    const createClaimWarranty = await prisma.claimWarranty.create({
      data: {
        ...body
      }
    })
    res.status(200).json({
      status: true,
      message: 'Success create claim warranty',
      results: createClaimWarranty
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      status: false,
      message: 'Internal server error'
    })
  }
}

exports.updateClaimWarranty = async (req, res) => {
  try {
    const { id } = req.params
    const { body } = req
    const updateClaimWarranty = await prisma.claimWarranty.update({
      where: {
        id: parseInt(id)
      },
      data: {
        ...body
      }
    })
    res.status(200).json({
      status: true,
      message: 'Success update claim warranty',
      results: updateClaimWarranty
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      status: false,
      message: 'Internal server error'
    })
  }
}

exports.deleteClaimWarranty = async (req, res) => {
  try {
    const { id } = req.params
    const deleteClaimWarranty = await prisma.claimWarranty.delete({
      where: {
        id: parseInt(id)
      }
    })
    res.status(200).json({
      status: true,
      message: 'Success delete claim warranty',
      results: deleteClaimWarranty
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      status: false,
      message: 'Internal server error'
    })
  }
}

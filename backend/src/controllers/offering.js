const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

exports.getOffering = async (req, res) => {
  try {
    const getOffering = await prisma.offering.findMany()
    res.status(200).json({
      status: true,
      message: 'Success get offering',
      results: getOffering
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      status: false,
      message: 'Internal server error'
    })
  }
}

exports.getOfferingById = async (req, res) => {
  try {
    const { id } = req.params
    const getOffering = await prisma.offering.findUnique({
      where: {
        id: parseInt(id)
      }
    })
    res.status(200).json({
      status: true,
      message: 'Success get offering',
      results: getOffering
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      status: false,
      message: 'Internal server error'
    })
  }
}

exports.createOffering = async (req, res) => {
  try {
    const { body } = req
    const createOffering = await prisma.offering.create({
      data: {
        ...body
      }
    })
    res.status(200).json({
      status: true,
      message: 'Success create offering',
      results: createOffering
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      status: false,
      message: 'Internal server error'
    })
  }
}

exports.updateOffering = async (req, res) => {
  try {
    const { id } = req.params
    const { body } = req
    const updateOffering = await prisma.offering.update({
      where: {
        id: parseInt(id)
      },
      data: {
        ...body
      }
    })
    res.status(200).json({
      status: true,
      message: 'Success update offering',
      results: updateOffering
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      status: false,
      message: 'Internal server error'
    })
  }
}

exports.deleteOffering = async (req, res) => {
  try {
    const { id } = req.params
    const deleteOffering = await prisma.offering.delete({
      where: {
        id: parseInt(id)
      }
    })
    res.status(200).json({
      status: true,
      message: 'Success delete offering',
      results: deleteOffering
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      status: false,
      message: 'Internal server error'
    })
  }
}

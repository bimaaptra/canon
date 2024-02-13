const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

exports.getEquipment = async (req, res) => {
  try {
    const getEquipment = await prisma.equipment.findMany()
    res.status(200).json({
      status: true,
      message: 'Success get equipment',
      results: getEquipment
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      status: false,
      message: 'Internal server error'
    })
  }
}

exports.getEquipmentById = async (req, res) => {
  try {
    const { id } = req.params
    const getEquipment = await prisma.equipment.findUnique({
      where: {
        id: parseInt(id)
      }
    })
    res.status(200).json({
      status: true,
      message: 'Success get equipment',
      results: getEquipment
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      status: false,
      message: 'Internal server error'
    })
  }
}

exports.createEquipment = async (req, res) => {
  try {
    const { body } = req
    const createEquipment = await prisma.equipment.create({
      data: {
        ...body
      }
    })
    res.status(200).json({
      status: true,
      message: 'Success create equipment',
      results: createEquipment
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      status: false,
      message: 'Internal server error'
    })
  }
}

exports.updateEquipment = async (req, res) => {
  try {
    const { body, params } = req
    const updateEquipment = await prisma.equipment.update({
      where: {
        id: parseInt(params.id)
      },
      data: {
        ...body
      }
    })
    res.status(200).json({
      status: true,
      message: 'Success update equipment',
      results: updateEquipment
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      status: false,
      message: 'Internal server error'
    })
  }
}

exports.deleteEquipment = async (req, res) => {
  try {
    const { id } = req.params
    const deleteEquipment = await prisma.equipment.delete({
      where: {
        id: parseInt(id)
      }
    })
    res.status(200).json({
      status: true,
      message: 'Success delete equipment',
      results: deleteEquipment
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      status: false,
      message: 'Internal server error'
    })
  }
}

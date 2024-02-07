const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

exports.getServiceIn = async (req, res) => {
  try {
    const getServiceIn = await prisma.serviceIn.findMany();
    res.status(200).json({
      status: true,
      message: "Success get service in",
      results: getServiceIn,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};

exports.getServiceInById = async (req, res) => {
  try {
    const { id } = req.params;
    const getServiceIn = await prisma.serviceIn.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    res.status(200).json({
      status: true,
      message: "Success get service in",
      results: getServiceIn,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};

exports.createServiceIn = async (req, res) => {
  try {
    const { body } = req;
    const createServiceIn = await prisma.serviceIn.create({
      data: {
        ...body,
      },
    });
    res.status(200).json({
      status: true,
      message: "Success create service in",
      results: createServiceIn,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};

exports.updateServiceIn = async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const updateServiceIn = await prisma.serviceIn.update({
      where: {
        id: parseInt(id),
      },
      data: {
        ...body,
      },
    });
    res.status(200).json({
      status: true,
      message: "Success update service in",
      results: updateServiceIn,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};

exports.deleteServiceIn = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteServiceIn = await prisma.serviceIn.delete({
      where: {
        id: parseInt(id),
      },
    });
    res.status(200).json({
      status: true,
      message: "Success delete service in",
      results: deleteServiceIn,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};

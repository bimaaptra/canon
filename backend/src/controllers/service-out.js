const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

exports.getServiceOut = async (req, res) => {
  try {
    const getServiceOut = await prisma.serviceOut.findMany();
    res.status(200).json({
      status: true,
      message: "Success get service out",
      results: getServiceOut,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};

exports.getServiceOutById = async (req, res) => {
  try {
    const { id } = req.params;
    const getServiceOut = await prisma.serviceOut.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    res.status(200).json({
      status: true,
      message: "Success get service out",
      results: getServiceOut,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};

exports.createServiceOut = async (req, res) => {
  try {
    const { body } = req;
    const createServiceOut = await prisma.serviceOut.create({
      data: {
        ...body,
      },
    });
    res.status(200).json({
      status: true,
      message: "Success create service out",
      results: createServiceOut,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};

exports.updateServiceOut = async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const updateServiceOut = await prisma.serviceOut.update({
      where: {
        id: parseInt(id),
      },
      data: {
        ...body,
      },
    });
    res.status(200).json({
      status: true,
      message: "Success update service out",
      results: updateServiceOut,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};

exports.deleteServiceOut = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteServiceOut = await prisma.serviceOut.delete({
      where: {
        id: parseInt(id),
      },
    });
    res.status(200).json({
      status: true,
      message: "Success delete service out",
      results: deleteServiceOut,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};

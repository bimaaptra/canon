const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

exports.getPenawaran = async (req, res) => {
  try {
    const getPenawaran = await prisma.penawaran.findMany();
    res.status(200).json({
      status: true,
      message: "Success get penawaran",
      results: getPenawaran,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};

exports.getPenawaranById = async (req, res) => {
  try {
    const { id } = req.params;
    const getPenawaran = await prisma.penawaran.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    res.status(200).json({
      status: true,
      message: "Success get penawaran",
      results: getPenawaran,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};

exports.createPenawaran = async (req, res) => {
  try {
    const { body } = req;
    const createPenawaran = await prisma.penawaran.create({
      data: {
        ...body,
        updatedAt: new Date(),
      },
    });
    res.status(200).json({
      status: true,
      message: "Success create penawaran",
      results: createPenawaran,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};

exports.updatePenawaran = async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const updatePenawaran = await prisma.penawaran.update({
      where: {
        id: parseInt(id),
      },
      data: {
        ...body,
      },
    });
    res.status(200).json({
      status: true,
      message: "Success update penawaran",
      results: updatePenawaran,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};

exports.deletePenawaran = async (req, res) => {
  try {
    const { id } = req.params;
    const deletePenawaran = await prisma.penawaran.delete({
      where: {
        id: parseInt(id),
      },
    });
    res.status(200).json({
      status: true,
      message: "Success delete penawaran",
      results: deletePenawaran,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};

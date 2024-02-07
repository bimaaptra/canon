const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

exports.getClaimGaransi = async (req, res) => {
  try {
    const getClaimGaransi = await prisma.claimGaransi.findMany();
    res.status(200).json({
      status: true,
      message: "Success get claim garansi",
      results: getClaimGaransi,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};

exports.getClaimGaransiById = async (req, res) => {
  try {
    const { id } = req.params;
    const getClaimGaransi = await prisma.claimGaransi.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    res.status(200).json({
      status: true,
      message: "Success get claim garansi",
      results: getClaimGaransi,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};

exports.createClaimGaransi = async (req, res) => {
  try {
    const { body } = req;
    const createClaimGaransi = await prisma.claimGaransi.create({
      data: {
        ...body,
      },
    });
    res.status(200).json({
      status: true,
      message: "Success create claim garansi",
      results: createClaimGaransi,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};

exports.updateClaimGaransi = async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const updateClaimGaransi = await prisma.claimGaransi.update({
      where: {
        id: parseInt(id),
      },
      data: {
        ...body,
      },
    });
    res.status(200).json({
      status: true,
      message: "Success update claim garansi",
      results: updateClaimGaransi,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};

exports.deleteClaimGaransi = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteClaimGaransi = await prisma.claimGaransi.delete({
      where: {
        id: parseInt(id),
      },
    });
    res.status(200).json({
      status: true,
      message: "Success delete claim garansi",
      results: deleteClaimGaransi,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};

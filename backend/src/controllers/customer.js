const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

exports.getCustomer = async (req, res) => {
  try {
    const getCustomer = await prisma.customer.findMany();
    res.status(200).json({
      status: true,
      message: "Success get customer",
      results: getCustomer,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};

exports.getCustomerById = async (req, res) => {
  try {
    const { id } = req.params;
    const getCustomer = await prisma.customer.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    res.status(200).json({
      status: true,
      message: "Success get customer",
      results: getCustomer,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};

exports.createCustomer = async (req, res) => {
  try {
    const { body } = req;
    const createCustomer = await prisma.customer.create({
      data: {
        ...body,
        updatedAt: new Date(),
      },
    });
    res.status(200).json({
      status: true,
      message: "Success create customer",
      results: createCustomer,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};

exports.updateCustomer = async (req, res) => {
  try {
    const { body, params } = req;
    const updateCustomer = await prisma.customer.update({
      where: {
        id: parseInt(params.id),
      },
      data: {
        ...body,
      },
    });
    res.status(200).json({
      status: true,
      message: "Success update customer",
      results: updateCustomer,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};

exports.deleteCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteCustomer = await prisma.customer.delete({
      where: {
        id: parseInt(id),
      },
    });
    res.status(200).json({
      status: true,
      message: "Success delete customer",
      results: deleteCustomer,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

exports.getServiceIn = async (_, res) => {
  try {
    const getServiceIn = await prisma.serviceIn.findMany({
      include: {
        customer: true,
        kelengkapan: true,
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
        nomor_service: Math.random().toString(36).substring(2, 7),
        serial_number: body.serial_number,
        tipe: body.tipe,
        customerId: parseInt(body.customerId),
        status: "Pending",
      },
    });

    if (body.kelengkapan) {
      for (const equipment of body.kelengkapan) {
        await prisma.equipment.create({
          data: {
            nama: equipment,
            serviceInId: parseInt(createServiceIn.id),
          },
        });
      }
    }

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

    await prisma.equipment.deleteMany({
      where: {
        serviceInId: parseInt(id),
      },
    });

    if (body.kelengkapan) {
      for (const equipment of body.kelengkapan) {
        await prisma.equipment.create({
          data: {
            nama: equipment,
            serviceInId: parseInt(id),
          },
        });
      }
    }

    const updateServiceIn = await prisma.serviceIn.update({
      where: {
        id: parseInt(id),
      },
      data: {
        serial_number: body.serial_number,
        tipe: body.tipe,
        customerId: parseInt(body.customerId),
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

exports.updateStatusToComplete = async (req, res) => {
  try {
    const { id } = req.params;
    const updateStatus = await prisma.serviceIn.update({
      where: {
        id: parseInt(id),
      },
      data: {
        status: "Complete",
      },
      include: {
        customer: true,
        kelengkapan: true,
      },
    });

    await prisma.serviceOut.create({
      data: {
        nomor_service: Math.random().toString(36).substring(2, 7),
        serviceInId: parseInt(id),
      },
    });

    res.status(200).json({
      status: true,
      message: "Success update status to complete",
      results: updateStatus,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};

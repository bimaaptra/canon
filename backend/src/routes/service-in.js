const serviceInRouter = require("express").Router();
const {
  createServiceIn,
  deleteServiceIn,
  getServiceIn,
  getServiceInById,
  updateServiceIn,
} = require("../controllers/service-in");

serviceInRouter.get("/", getServiceIn);
serviceInRouter.get("/:id", getServiceInById);
serviceInRouter.post("/", createServiceIn);
serviceInRouter.put("/:id", updateServiceIn);
serviceInRouter.delete("/:id", deleteServiceIn);

module.exports = serviceInRouter;

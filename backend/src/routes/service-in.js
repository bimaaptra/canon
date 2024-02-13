const serviceInRouter = require("express").Router();
const {
  createServiceIn,
  deleteServiceIn,
  getServiceIn,
  getServiceInById,
  updateServiceIn,
  updateStatusToComplete,
} = require("../controllers/service-in");

serviceInRouter.get("/", getServiceIn);
serviceInRouter.get("/:id", getServiceInById);
serviceInRouter.post("/", createServiceIn);
serviceInRouter.put("/:id", updateServiceIn);
serviceInRouter.delete("/:id", deleteServiceIn);
serviceInRouter.put("/status/:id", updateStatusToComplete);

module.exports = serviceInRouter;

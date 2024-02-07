const serviceOutRouter = require("express").Router();
const {
  createServiceOut,
  deleteServiceOut,
  getServiceOut,
  getServiceOutById,
  updateServiceOut,
} = require("../controllers/service-out");

serviceOutRouter.get("/", getServiceOut);
serviceOutRouter.get("/:id", getServiceOutById);
serviceOutRouter.post("/", createServiceOut);
serviceOutRouter.put("/:id", updateServiceOut);
serviceOutRouter.delete("/:id", deleteServiceOut);

module.exports = serviceOutRouter;

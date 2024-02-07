const penawaranRouter = require("express").Router();
const {
  createPenawaran,
  deletePenawaran,
  getPenawaran,
  getPenawaranById,
  updatePenawaran,
} = require("../controllers/penawaran");

penawaranRouter.get("/", getPenawaran);
penawaranRouter.get("/:id", getPenawaranById);
penawaranRouter.post("/", createPenawaran);
penawaranRouter.put("/:id", updatePenawaran);
penawaranRouter.delete("/:id", deletePenawaran);

module.exports = penawaranRouter;

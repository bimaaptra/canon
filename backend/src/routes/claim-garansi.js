const claimGaransiRouter = require("express").Router();
const {
  createClaimGaransi,
  deleteClaimGaransi,
  getClaimGaransi,
  getClaimGaransiById,
  updateClaimGaransi,
} = require("../controllers/claim-garansi");

claimGaransiRouter.get("/", getClaimGaransi);
claimGaransiRouter.get("/:id", getClaimGaransiById);
claimGaransiRouter.post("/", createClaimGaransi);
claimGaransiRouter.put("/:id", updateClaimGaransi);
claimGaransiRouter.delete("/:id", deleteClaimGaransi);

module.exports = claimGaransiRouter;

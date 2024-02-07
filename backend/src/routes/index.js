const routersV1 = require("express").Router();
const { auth } = require("../middlewares/auth");

routersV1.use("/auth", require("./auth"));
routersV1.use("/claim-garansi", auth, require("./claim-garansi"));
routersV1.use("/customer", auth, require("./customer"));
routersV1.use("/penawaran", auth, require("./penawaran"));
routersV1.use("/service-in", auth, require("./service-in"));
routersV1.use("/service-out", auth, require("./service-out"));

module.exports = routersV1;

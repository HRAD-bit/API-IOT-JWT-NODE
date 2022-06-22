module.exports = (app) => {
  const devices = require("../controllers/devices.controller.js");
  const authController = require("../controllers/auth.controller");

  var router = require("express").Router();
  var routerAuth = require("express").Router();

  // devices --------------
  // Create a new devices
  router.post("/", devices.create);
  // Retrieve all devices
  router.get("/", devices.findAll);
  // Retrieve a single devices with id
  router.get("/:id", devices.findOne);
  // Update a devices with id
  router.put("/:id", devices.update);
  // Delete a devices with id
  router.delete("/:id", devices.delete);
  // Delete all devices
  router.delete("/", devices.deleteAll);

  // RUTAS PARA MÉTODOS AUTH
  routerAuth.post("/register", authController.register);
  routerAuth.post("/login", authController.login);
  routerAuth.get("/logout", authController.logout);
  app.use("/api/devices", router);
  app.use("/api", routerAuth);
};

const Devices = require("../models/api.model.js");
// Crear y guardar una mascota
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "No puede estar vacio!",
    });
  }
  // Create a Device
  const devices = new Devices({
    name: req.body.name,
    type: req.body.type,
    user_id: req.body.user_id,
    saverRule: req.body.saverRule
  });
  // Guardar el device en la base de datos
  Devices.create(devices, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Ocurrió algún error al momento de crear la mascota.",
      });
    else res.send(data);
  });
};
// Encontrar todas las devices desde la base de datos
exports.findAll = (req, res) => {
  const name = req.query.name;
  Devices.getAll(name, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Ocurrió un problema al buscar las devices 1.",
      });
    else res.json(data);
  });
};
exports.findAllPublished = (req, res) => {
  Devices.getAllPublished((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Ocurrió un problema al buscar las devices 2.",
      });
    else res.send(data);
  });
};
exports.findOne = (req, res) => {
  Devices.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `No se encontró a la mascota con el ID: ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error buscando la mascota ocn ID: " + req.params.id,
        });
      }
    } else res.send(data);
  });
};

// UPDATE
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "No puede estar vacío!!",
    });
  }
  console.log(req.body);
  Devices.updateById(req.params.id, new Devices(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `No se encontró el Device con ID: ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error actualizando el Device con ID: " + req.params.id,
        });
      }
    } else res.send(data);
  });
};
// DELETE
exports.delete = (req, res) => {
  Devices.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `No se encontró el Device con id: ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "No se pudo borrar el Device con Id: " + req.params.id,
        });
      }
    } else res.send({ message: `El Device se ha eliminado correctamente!` });
  });
};

exports.deleteAll = (req, res) => {
  Devices.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Algo ha ocurrido al eliminar todas las devices.",
      });
    else res.send({ message: `Todas las devices han sido eliminadas exitosamente!!` });
  });
};

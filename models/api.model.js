const sql = require("./db.js");
// constructor
const Device = function(device) {
  this.name = device.name;
  this.type = device.type;
  this.user_id = device.user_id;
  this.saverRule = device.saverRule;
}
Device.create = (newDevice, result) => {
  sql.query("INSERT INTO devices SET ?", newDevice, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created device: ", { id: res.insertId, ...newDevice });
    result(null, { id: res.insertId, ...newDevice });
  });
};
Device.findById = (id, result) => {
  sql.query(`SELECT devices.*, users.user FROM devices JOIN users WHERE users.id = devices.user_id AND devices.user_id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log("found device: ", res[0]);
      result(null, res[0]);
      return;
    }
    // not found Device with the id
    result({ kind: "not_found" }, null);
  });
};
Device.getAll = (name, result) => {
  let query = "SELECT devices.*, users.user FROM devices JOIN users WHERE users.id = devices.user_id";
  if (name) {
    query += ` WHERE name LIKE '%${name}%'`;
  }
  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("device: ", res);
    result(null, res);
  });
};
Device.updateById = (id, device, result) => {
  sql.query(
    "UPDATE devices SET name = ?, type = ?, user_id = ? WHERE id = ?",
    [device.name, device.type, device.user_id, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      if (res.affectedRows == 0) {
        // not found Device with the id
        result({ kind: "not_found" }, null);
        return;
      }
      console.log("updated device: ", { id: id, ...device });
      result(null, { id: id, ...device });
    }
  );
};
Device.remove = (id, result) => {
  sql.query("DELETE FROM devices WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    if (res.affectedRows == 0) {
      // not found device with the id
      result({ kind: "not_found" }, null);
      return;
    }
    console.log("deleted device with id: ", id);
    result(null, res);
  });
};
Device.removeAll = result => {
  sql.query("DELETE FROM devices", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log(`deleted ${res.affectedRows} devices`);
    result(null, res);
  });
};
module.exports = Device;
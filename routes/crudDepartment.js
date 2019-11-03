// DEPARTMENT CRUD

const express = require("express");
const router = express.Router();
const department = require("../models/department");

router.post("/department/create", async (req, res) => {
  try {
    const newDepartment = new department({
      title: req.body.title
    });
    await newDepartment.save();
    res.json({ message: "New department created" });
  } catch (error) {
    res.status(400).json({
      error: {
        message: "Department create : Bad request"
      }
    });
  }
});

router.get("/department", async (req, res) => {
  try {
    const departments = await department.find();
    res.send(departments);
    res.json({ message: "Department read Ok" });
  } catch (error) {
    res.status(400).json({
      error: {
        message: "Department read : Bad request"
      }
    });
  }
});

// http://localhost:3000/department/update
// http://localhost:3000?id=
// http://localhost:3000/title
//   si envoi par param "/departement/update/:title" => req.params.title
//   si on recupere du body (par express body parser) => req.body.title
router.put("/department/update", async (req, res) => {
  const id = req.query.id;
  const title = req.body.title;
  try {
    const department = await department.findOne({ _id: id });

    if (department !== null) {
      department.title = title;
      await department.save();
      res.json({ message: "Updated" });
    } else {
      return res.status(400).send({
        error: {
          message: "Department id not found"
        }
      });
    }
  } catch (error) {
    res.status(400).json({
      error: {
        message: "Department update : Bad request"
      }
    });
  }
});

router.post("/department/delete", async (req, res) => {
  const id = req.query.id;
  try {
    const department = await department.findOne({ _id: id });

    if (department !== null) {
      await department.remove();
      res.json({ message: "Removed" });
    }
  } catch (error) {
    res.status(400).json({
      error: {
        message: "Department remove : Bad request"
      }
    });
  }
});

module.exports = router;

const { Router } = require("express");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const router = Router();

router.get("/notes", function (req, res) {
  fs.readFile("./Develop/db/db.json", "utf8", function (err, data) {
    if (err) throw err;

    res.json(JSON.parse(data));
    console.log(data);
  });
});

router.delete("/notes/:id", function (req, res) {
  let id = req.params.id;

  fs.readFile("./Develop/db/db.json", "utf8", function (err, data) {
    if (err) throw err;

    let JSONraw = JSON.parse(data);

    for (let i = 0; i < JSONraw.length; i++) {
      if (id == JSONraw[i].id) {
        JSONraw.splice(i, 1);

        fs.writeFile(
          "./Develop/db/db.json",
          JSON.stringify(JSONraw),
          function (err) {
            if (err) throw err;

            console.log("deleted");
          }
        );
      }
    }
  });

  res.end();
});

router.post("/notes", function (req, res) {
  fs.readFile("./Develop/db/db.json", "utf8", function (err, data) {
    if (err) throw err;

    let JSONJSONraw = JSON.parse(data);

    JSONJSONraw.push({ ...req.body, id: uuidv4() });

    fs.writeFile(
      "./Develop/db/db.json",
      JSON.stringify(JSONJSONraw),
      function (err) {
        if (err) return err;

        console.log("successfully written");
      }
    );
  });

  res.end();
});

module.exports = router;

const express = require("express");
const app = express();
const swaggerUi = require("swagger-ui-express");
const fileUpload = require("express-fileupload");
const fs = require("fs");
const YAML = require("yaml");

const file = fs.readFileSync("./swagger.yaml", "utf8");
const swaggerDocument = YAML.parse(file);
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(fileUpload());

var users = [
  { id: 1, name: "Tom, Cruise" },
  { id: 2, name: "John Cena" },
  { id: 3, name: "Brad Pitt" },
];

app.get("/string", (req, res) => {
  res.status(200).send("This is a string");
});

app.get("/user", (req, res) => {
  const obj = { id: 1, name: "Tom Cruise" };
  res.status(200).send(obj);
});

app.get("/users", (req, res) => {
  res.status(200).send(users);
});

app.get("/users/:id", (req, res) => {
  res.status(200).send(users.find((x) => x.id === parseInt(req.params.id)));
});

app.post("/create", (req, res) => {
  users = [req.body, ...users];
  res.status(201).send(users);
});

app.get("/usersQuery", (req, res) => {
  res.status(200).send(users.find((x) => x.id === parseInt(req.query.id)));
});

app.post("/upload", (req, res) => {
  const file = req.files.file;
  let uploadPath = __dirname + "/upload/" + "file" + Date.now() + ".jpg";
  file.mv(uploadPath, (err) => {
    if (err) {
      return res.send(Err);
    }
  });
  res.sendStatus(200);
});

app.listen(3000, () => {
  console.log("Up and running");
});

const express = require("express");
const app = express();

app.use(express.json());

app.get("/sites/MLA/search?q=zapatillas", function (req, res) {
  console.log(req.query.results);
  res.send(req.query);
});

app.listen(3001, () => {
  console.log("listening on port 3001");
});

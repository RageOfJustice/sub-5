const express = require("express");
const app = express();
const apiRouter = express.Router();
const request = require("request");

apiRouter.get("/orders", (req, res) => {
  res.json([
    { identifier: 1, price: 20, description: "Hero guitar", status: 3 }
  ]);
  //   request("http://localhost:8081/api/orders", (err, response, body) => {
  //     if (!err && response && response.statusCode === 200) {
  //       res.json(body);
  //     }
  //   });
});

apiRouter.get("/orders/:id", (req, res) => {
  request(
    `http://localhost:8081/api/orders/${req.params.id}`,
    (err, response, body) => {
      if (!err && response && response.statusCode === 200) {
        res.json(body);
      }
    }
  );
});

apiRouter.get("/orders/:id/accept", (req, res) => {
  res.json({ result: true });
  //   request(
  //     `http://localhost:8081/api/orders/${req.params.id}/accept`,
  //     (err, response, body) => {
  //       if (!err && response && response.statusCode === 200) {
  //         res.json(body);
  //       }
  //     }
  //   );
});

apiRouter.get("/orders/:id/decline", (req, res) => {
  res.json({ result: true });
  //   request(
  //     `http://localhost:8081/api/orders/${req.params.id}/decline`,
  //     (err, response, body) => {
  //       if (!err && response && response.statusCode === 200) {
  //         res.json(body);
  //       }
  //     }
  //   );
});

app.use(express.static("public"));

app.use("/api", apiRouter);

app.listen(3000, () => {
  console.log("Server is listening on port 3000!");
});

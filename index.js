const express = require("express");

const app = express();

app.get("/", function (request, response) {
  response.send("Welcome! Please go to /api to test our service");
});

app.get("/api", function (request, response) {
  response.send(transformIntoDate(Date.now()));
});

// When calling /api, we should get the date object
app.get("/api/:date", function (request, response) {
  const date = transformIntoDate(Number(request.params.date));
  if (date.utc === "Invalid Date") {
    response.send({ error: "Invalid Date" });
  } else {
    response.send(date);
  }
});

function transformIntoDate(input) {
  return { unix: input, utc: new Date(input).toUTCString() };
}

app.listen(3001);

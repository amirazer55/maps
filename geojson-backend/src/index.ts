import express from "express";
import { randomBytes } from "crypto";
import { faker } from "@faker-js/faker";
import cors from "cors";
const app = express();
const port = 3044;

app.use(cors());

const generateRandomLocations = (num: number) => {
  const locations = [];
  for (let i = 0; i < num; i++) {
    locations.push({
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [
          parseFloat((Math.random() * 360 - 180).toFixed(6)),
          parseFloat((Math.random() * 180 - 90).toFixed(6)),
        ],
      },
      properties: {
        id: randomBytes(16).toString("hex"),
        name: faker.location.city(),
        score: Math.floor(Math.random() * 101),
        address: faker.streetAddress(),
      },
    });
  }
  return {
    type: "FeatureCollection",
    features: locations,
  };
};

const locations = generateRandomLocations(10000);

app.get("/locations", (req, res) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  const paginatedLocations = {
    type: "FeatureCollection",
    features: locations.features.slice(startIndex, endIndex),
  };

  res.json({
    page,
    limit,
    total: locations.features.length,
    allFeatures: locations.features,
    ...paginatedLocations,
  });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

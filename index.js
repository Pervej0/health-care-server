const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { MongoClient } = require("mongodb");
const ObjectId = require("mongodb").ObjectId;
const app = express();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.sjbgh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
console.log(uri);
const run = async () => {
  try {
    await client.connect();
    const database = client.db("healhCare_Services");
    const serviceCollection = database.collection("OurService");

    // POST API -
    app.post("/service", async (req, res) => {
      const doc = req.body;
      const result = await serviceCollection.insertOne(doc);
      res.send(result);
    });

    // GET API or FindMany -
    app.get("/services", async (req, res) => {
      const cursor = serviceCollection.find({});
      const services = await cursor.toArray();
      res.send(services);
    });

    // GET Single service data -
    app.get("/services/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await serviceCollection.findOne(query);
      res.json(result);
    });

    // DELETE Service data
    app.delete("/services/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await serviceCollection.deleteOne(query);
      // res.json(result);
    });
  } finally {
    // await client.close();
  }
};

run().catch(console.dir());

app.get("/", (req, res) => {
  res.send("HELLO SERVER WAKE UP!");
});

app.listen(port, () => {
  console.log("SErver is waking up from port: ", port);
});

/* 
user1: Pervej0/N3stgRChrXKZ1KQO
user2: Prapti0/dWsiRNQGVkfnqi3p
*/

const express = require("express");

const app = express();

const fs = require("fs");

app.use(express.json())

const cors = require("cors")

//using cors to avoid errors
app.use(cors({
    origin : "*"
}))

app.get("/", (req, res) => {
    
    fs.readFile("data.json", "utf8", (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "An error occurred while reading the JSON file" });
      }
      const jsonData = JSON.parse(data);
      res.json(jsonData);
    });
  });

  app.get("/:id", (req, res) => {

    const id = req.params.id;

    console.log(id, "print id")
    
    fs.readFile("data.json", "utf8", (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "An error occurred while reading the JSON file" });
      }
      const jsonData = JSON.parse(data);
      console.log("check 1",jsonData);
      console.log("check 2", jsonData.products);
      const final = jsonData.products.find((el)=>{
        if(parseInt(el.id) === parseInt(id))
        {
            console.log(el.id, id);
            return true;
        }
        console.log("didnt find");
        return false;
      })
      console.log(final, "final data")
      res.json(final);
    });
  });
  


app.listen(8081,()=>{
    console.log("running on server 8081.......")
})
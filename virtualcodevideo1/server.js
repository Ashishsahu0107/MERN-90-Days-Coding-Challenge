import express from 'express';
const app = express();
const port = 3000;

app.use(express.json())


const users = [
  {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "age": 25,
    "city": "New York"
  },
  {
    "id": 2,
    "name": "Jane Smith",
    "email": "jane@example.com",
    "age": 28,
    "city": "London"
  },
  {
    "id": 3,
    "name": "Michael Johnson",
    "email": "michael@example.com",
    "age": 30,
    "city": "Toronto"
  },
  {
    "id": 4,
    "name": "Emily Davis",
    "email": "emily@example.com",
    "age": 22,
    "city": "Sydney"
  },
  {
    "id": 5,
    "name": "David Wilson",
    "email": "david@example.com",
    "age": 35,
    "city": "Berlin"
  }
]


// app.get('/', (req, res) => {
//     res.json({name:"Ashish",age:20});
// });

// app.post("/", (req, res) => {
//     let aaa = req.body;
//     console.log(aaa)
//     res.send("Hello")
// })



app.get("/user/:id", (req, res) => { 
    let id = req.params.id

    let existingUser = users.find((user) => (user.id == id))
    
    if (!existingUser) { 
        res.send("404 not found")
    }
    
    res.json(existingUser)
})


app.listen(port, () => {
  console.log(`server started port ${port}`);
});
const multer = require("multer")
const fs = require("fs")
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const { authMiddleware } = require('./utils/auth');
const {uploadFile, getFileStream} = require("./s3")

const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});


console.log(path.join(__dirname, '../client/build'))

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}
const upload = multer({dest: "uploads/"})

app.get("/images/:key",(req,res)=>{

  const key = req.params.key
  const readStream = getFileStream(key)
  readStream.pipe(res)
})

app.post("/data/upload",upload.single("image"),async(req,res)=>{
  try{

    const file = req.file;
    const result = await uploadFile(file);
    console.log(result)
    const description = req.body.description
    res.send({imagePath:`/images/${result.Key}`})
  }catch(err){
    console.log(err)
  }
})


// app.post("/data/upload",upload.single("file"),async(req,res)=>{
//   const tempPath = req.file.path;
//   const num = Math.round(Math.random()*1000000000000000)
//   const targetPath = path.join(__dirname, "./uploads/img"+num+".png");

//   if (path.extname(req.file.originalname).toLowerCase() === ".png") {
//     fs.rename(tempPath, targetPath, err => {
//       if (err) return handleError(err, res);

//       res
//         .status(200)
//         .contentType("text/plain")
//         .json({image:num});
//     });
//   } else {
//     fs.unlink(tempPath, err => {
//       if (err) return handleError(err, res);

//       res
//         .status(403)
//         .contentType("text/plain")
//         .end("Only .png files are allowed!");
//     });
//   }
// }
// );

app.get('/', (req, res) => {
  console.log("req")
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

// uncomment this for production

app.get("*", (req, res) => {
  let url = path.join(__dirname, '../client/build', 'index.html');
  if (!url.startsWith('/app/'))
    url = url.substring(1);
  res.sendFile(url);
});

// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();
  server.applyMiddleware({ app });
  
  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    })
  })
  };
  
// Call the async function to start the server
  startApolloServer(typeDefs, resolvers);

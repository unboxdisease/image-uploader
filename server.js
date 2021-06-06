const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const methodOverride = require('method-override');
const app = express();
require('dotenv').config();
const path = require('path')
const crypto = require('crypto');
const port =  5000;

app.use(cors());
app.use(express.json());

const mongoURI = "mongodb+srv://new:abcd1234@cluster0.sm1gh.mongodb.net/test?retryWrites=true&w=majority";
mongoose.connect(mongoURI, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});

const conn = mongoose.connection;
conn.once('open', () => {
    console.log('mongo DB success');
});
// Mongo URI
// const mongoURI = 'mongodb://brad:brad@ds257838.mlab.com:57838/mongouploads';

// // Create mongo connection
// const conn = mongoose.createConnection(mongoURI);

// Init gfs
let gfs;

conn.once('open', () => {
  // Init stream
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads');
});

// Create storage engine
const storage = new GridFsStorage({
  url: mongoURI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: 'uploads'
        };
        resolve(fileInfo);
      });
    });
  }
});
const upload = multer({ storage });

app.post('/upload', upload.single('myImage'), (req, res) => {
	// res.json({ file: req.file });
	res.send("success");
  });

// const userRouter = require('./routes/images.js');
// app.use('/upload', userRouter);

app.get('/', (req, res) => {
	gfs.files.find().toArray((err, files) => {
	  // Check if files
	  if (!files || files.length === 0) {
		res.render('index', { files: false });
	  } else {
		files.map(file => {
		  if (
			file.contentType === 'image/jpeg' ||
			file.contentType === 'image/png'
		  ) {
			file.isImage = true;
		  } else {
			file.isImage = false;
		  }
		});
		res.send({ files });
	  }
	});
  });


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

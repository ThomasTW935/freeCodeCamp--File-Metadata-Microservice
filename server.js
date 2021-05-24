var express = require('express');
var cors = require('cors');
const multer = require('multer')
require('dotenv').config()


const upload = multer({dest: 'uploads/'})
var app = express();
app.use(express.urlencoded({extended: true}))
app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse', upload.single('upfile'), (req,res)=>{
  console.log(req.file)
  const file = req.file
  res.json({
    name: file.originalname,
    type: file.mimetype,
    size: file.size
  })
})


const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port http://localhost:' + port)
});

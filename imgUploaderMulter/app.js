const express = require('express');
const multer = require('multer');
const ejs = require('ejs');
const path = require('path');



// Set storage Engine
const storage = multer.diskStorage({
  // Destination that you want the file to be uploaded
    destination: './public/uploads/',
    filename: function(req, file, cb) {
      // This sets the file name of what's being uploaded. First thing is null bcus that's if there's an error.
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

// Initialize uploads
const upload = multer({
    storage: storage,
    // Setting a limit of the file size
    limits: {fileSize: 1000000},
    fileFilter: function(req, file, cb) {
      checkFileType(file, cb);
    }
}). single('myImage');

// Check file type
function checkFileType(file, cb) {
    // Create an expression for file extensions
    const filetypes = /jpeg|jpg|png|gif/;
    // Check the ext type
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check the mime? Idk what that is
    const mimetype = filetypes.test(file.mimetype);

    if(mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Images only.');
    }
}

// Initialize app - basics
const app = express();

// EJS Middleware - basics
app.set('view engine', 'ejs');

// Public folder - basics
app.use(express.static('./public'));

// Render the view - basics
app.get('/', (req, res) => res.render('index'));

// Post Route - this will upload
app.post('/upload', (req, res) => {
    upload(req, res, (err) => {
      // If an error, render the err message
        if(err){
          res.render('index', {
              msg: err
          });
        }
        // Else
        else {
          if(req.file == undefined){
            res.render('index', {
                msg: 'Error: No file selected'
            });
          } else {
            res.render('index', {
                msg: "File uploaded.",
                file: `uploads/${req.file.filename}`
            });
          }
        }
    })
});

// Port lauching - basics
const port = 3000;
app.listen(port, () => console.log(`Server running on ${port}`));

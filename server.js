const express = require("express");
const fileUpload = require("express-fileupload");

const app = express();

app.use(fileUpload());

//Upload Endpoint
app.post('/upload', (req, res) => {

// check om requesten er null - send fejlbesked hvis den er
    if(req.file === null){
        return res.status(400).json({msg: 'No file uploaded'})
    }

// denne variabel repræsenterer filen
    const file = req.files.file;

// file.mv står for at flytte (move) filen så den tager imod en path
// __dirname er "current dir" 
    file.mv(`${__dirname}/client/public/uploads/${file.name}`, err => {
    //check for fejl
        if(err) {
            console.log(err);
            return res.status(500).send(err) //500 er server error
        }

        res.json({ fileName: file.name, filePath: `/uploads/${file.name}`});
    })
})
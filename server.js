const express = require('express');
const fileUpload = require('express-fileupload');
const path = require('path');
const cors = require('cors');
const compression = require('compression')
const bodyParser = require('body-parser');
const fs = require('fs');

const mongoose = require('mongoose')
const connectDb = require('./config/mongoDb')
const { PythonShell } = require('python-shell');

const Suppliers = require('./models/Suppliers')
const Invoices = require('./models/Invoices')
const Costcenters = require('./models/Costcenters')
const Users = require('./models/Users')
const Accounts = require('./models/Accounts')

const app = express();
const { placeSignoToInvoice } = require('./utils/merge')

const projDir = path.resolve(process.cwd(), '.');

require('dotenv').config();
connectDb()

app.use(compression());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload())
app.use(express.json());
app.use("/static", express.static(path.resolve(__dirname, 'static')));

app.get('/suppliers', async function (req, res) {
    try {
        const suppliers = await Suppliers.find();
        if (!suppliers) {
            return {}
        } else {
            return res.status(200).json({suppliers});
        }

    } catch (err) {
        res.status(500).send(err);
    }
});

app.get('/invoices', async function (req, res) {
    try {
        const invoices = await Invoices.find();
        if (!invoices) {
            return {}
        } else {
            return res.status(200).json({invoices});
        }

    } catch (err) {
        res.status(500).send(err);
    }
})
app.get('/cost_centers', async function (req, res) {
    try {
        const costCenters = await Costcenters.find();
        if (!costCenters) {
            return {}
        } else {
            return res.status(200).json({costCenters});
        }

    } catch (err) {
        res.status(500).send(err);
    }
})

app.get('/users', async function (req, res) {
    try {
        const users = await Users.find();
        if (!users) {
            return {}
        } else {
            return res.status(200).json({users});
        }

    } catch (err) {
        res.status(500).send(err);
    }
})

app.get('/accounts', async function (req, res) {
    try {
        const accounts = await Accounts.find();
        if (!accounts) {
            return {}
        } else {
            return res.status(200).json({accounts});
        }

    } catch (err) {
        res.status(500).send(err);
    }
})

app.post('/add-invoice', async function (req, res) {
    let invoice = req.body.invoice
    console.log(req.body.invoice);
    try {
        const invoiceAdded = await new Invoices(invoice)
        await invoiceAdded.save()
        res.status(200).json({invoiceAdded})
        
    } catch (error) {
        
    }
})
// Document upload routes
app.get('/pdf-viewer/:file_name', function(req, res) {
    let docsFolder = req.params.file_name.includes('approved_') ? req.params.file_name.replace('approved_', '') : req.params.file_name;
    res.download(process.cwd() + '/static/documents/' + docsFolder + '/' + req.params.file_name, req.params.file_name);
})

app.post('/upload', (req, res) => {
    if(req.files === null) { return res.status(400).json({msg: 'No file uploaded'});}

    const file = req.files.file;
    const dir = `${projDir}/static/documents/${file.name}`;
    fs.mkdirSync(dir);
    
    file.mv(`${__dirname}/static/documents/${file.name}/${file.name}`, err => {
        if (err) {
            console.log(err);
            return res.status(500).send(err);
        }

        //Run python -> convert pdf to images
        let options = {
            mode: 'text',
            pythonOptions: ['-u'],
            scriptPath: process.cwd() + '/utils',
            args: [file.name]
        };
        PythonShell.run('convert_pdf_img.py', options, function (err, results) {
            if (err) throw err;
            console.log('results: %j', results);
        });
        
        res.json({ fileName: file.name, filePath: `/${file.name}` })
    })
})

app.post('/docs-approval', (req, res, err) => {
    let signature = req.body.signoData.replace(/^data:image\/png;base64,/, "");

    fs.writeFile('static/templates/signo.png', signature, 'base64', function(err) {
        if (err) {
            console.log(err);
            return res.end('end');
        }
    });

    placeSignoToInvoice(projDir,req.body.uploadedDocFileName,req.body.signoPageNo, req.body.width, req.body.height)

      //Run python -> convert images to pdf 
      let options = {
        mode: 'text',
        pythonOptions: ['-u'],
        scriptPath: process.cwd() + '/utils',
        args: [req.body.uploadedDocFileName]
    };
    PythonShell.run('convert_img_pdf.py', options, function (err, results) {
        if (err) throw err;
        console.log('results: %j', results[0]);
        res.json({ approvedFileName: results[0] })
    });

});


const port = process.env.PORT || 5000;

app.listen(port, () => { console.log(`Server started on port ${ port }`) })
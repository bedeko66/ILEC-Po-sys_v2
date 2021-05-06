const fs = require('fs')
const path = require('path')
const projDir = path.resolve(process.cwd(), '..');

console.log(projDir);

const createDirForUploadedDocs = folderName => {
    const dir = `${projDir}/static/documents/uploaded/${folderName}`;
    
    fs.mkdir(dir, (err) => {
        if (err) {
            throw err;
        }
        console.log("Directory is created.");
    });
}

// createDirForUploadedDocs('adobe.pdf')

exports.createDirForUploadedDocs = createDirForUploadedDocs
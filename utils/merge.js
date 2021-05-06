const fs = require('fs');
const gm = require('gm');


const placeSignoToInvoice = (projDir, uploadedFileName, signoPageNo_, width, height) => {
    let signoPageNo = signoPageNo_.toString()
    console.log(projDir)
    console.log(uploadedFileName)
    console.log(width)
    console.log(height)
    gm(`${projDir}/static/documents/${uploadedFileName}/out${signoPageNo}.png`)   // from
    .composite(`${projDir}/static/templates/signo.png`)
    .geometry(`+${width}+${height}`)
    .write(`${projDir}/static/documents/${uploadedFileName}/out${signoPageNo}.png`, function(err) {
        if(err) { console.log(err);} else {console.log("Written composite image.");}
    });
}

// placeSignoToInvoice('/Users/bedeko/app/posys_v2','refcard.pdf',2, 1000, 1800)

exports.placeSignoToInvoice = placeSignoToInvoice
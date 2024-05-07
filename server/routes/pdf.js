const router= require('express').Router();
const pdfkit= require('pdfkit')
const fs= require('fs');
router.get("/generatePdf", function(req, res){
const pdfDocument=new pdfkit

pdfDocument.pipe(fs.createWriteStream("output.pdf"))
pdfDocument.text("hello")
.fontSize(25)
pdfDocument.end()
})
module.exports= router;
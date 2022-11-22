import express from 'express';
import pdf from 'html-pdf'
import pdfTemplate from '../controllers/document/PDFInvoice.js'
const router = express.Router();


router.post('/create-pdf', (req, res, next) => {
    console.log("in back end");
    pdf.create(pdfTemplate(req.body), {}).toFile('result.pdf', (err) => {
        if (err) {
            res.send(Promise.reject())
        }

        res.send(Promise.resolve())
    });
});

router.get('/fetch-pdf', (req, res, next) => {
    console.log("in back end");
    res.sendFile(`${__dirname}/result.pdf`)
})
export default router;

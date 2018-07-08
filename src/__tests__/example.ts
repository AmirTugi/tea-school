import {GeneratePdfOptions, generatePdf} from '../index';
import * as path from 'path';

const options: GeneratePdfOptions = {
    htmlTemplatePath: path.resolve(__dirname, '..', 'poc', 'test.pug'),
    styleOptions: {
        file: path.resolve(__dirname, '..', 'poc', 'test.scss')
    },
    htmlTemplateOptions: {
        name: 'Timothy'
    },
    pdfOptions: {
        // Omit to get output as buffer solely
        path: path.resolve(__dirname, 'pdf-file.pdf'),
        format: 'A4',
        printBackground: true
    }
};

(async () => {
    const pdfBuffer: Buffer = await generatePdf(options);
})();
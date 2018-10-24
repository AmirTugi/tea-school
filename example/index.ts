import TeaSchool from '../src/index';
import * as pug from 'pug';
import * as path from 'path';
import {PDFOptions} from 'puppeteer';
import {Options as SassOptions} from "node-sass";

(async () => {
    const styleOptions: SassOptions = {
        // Get relative path from cwd to the desired file
        file: path.resolve(__dirname, 'test.scss')
    };

    // Get relative path from cwd to the desired file
    const htmlTemplatePath = path.resolve(__dirname, 'test.pug');

    const htmlTemplateOptions: pug.LocalsObject = {
        name: 'Timothy',
    };

    const pdfOptions: PDFOptions = {
        // Output path will be relative.
        path: path.resolve(__dirname, 'output', 'tea-school-example.pdf'),
        format: 'A4',
        printBackground: true
    };

    const teaSchoolOptions: TeaSchool.GeneratePdfOptions = {
        styleOptions,
        htmlTemplatePath,
        htmlTemplateOptions,
        pdfOptions
    };

    // We just wait for the pdf to generate, and then the program can exit
    await TeaSchool.generatePdf(teaSchoolOptions);
})();
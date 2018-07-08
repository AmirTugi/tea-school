import pug, {LocalsObject as PugLocalsObject, Options as PugOptions} from 'pug';
import * as sass from 'node-sass';
import puppeteer, {NavigationOptions, PDFOptions} from 'puppeteer';
import {Options as SassOptions} from "node-sass";

namespace TeaSchool{
    export interface GeneratePdfOptions {
        styleOptions?: SassOptions;
        htmlTemplatePath: string;
        htmlTemplateOptions?: PugOptions & PugLocalsObject;
        pdfOptions?: PDFOptions;
    }

    export const generatePdf = async (options: GeneratePdfOptions): Promise<Buffer> => {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        const compiledStyle = sass.renderSync({...options.styleOptions});
        const htmlTemplateOptions: PugOptions & PugLocalsObject = {
            ...options.htmlTemplateOptions,
            compiledStyle: compiledStyle.css
        };
        const renderedTemplate = pug.renderFile(options.htmlTemplatePath, htmlTemplateOptions);

        // Make puppeteer render the HTML from data buffer
        await page.goto(`data:text/html,${renderedTemplate}`, {waitUntil: ['load', 'domcontentloaded']} as NavigationOptions);

        const pdfBuffer = await page.pdf({...options.pdfOptions});

        await browser.close();

        return pdfBuffer
    };
}

export const generatePdf = TeaSchool.generatePdf;
export interface GeneratePdfOptions extends TeaSchool.GeneratePdfOptions {}

export default TeaSchool;
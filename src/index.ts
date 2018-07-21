import * as pug from 'pug';
import * as sass from 'node-sass';
import puppeteer, {NavigationOptions, PDFOptions} from 'puppeteer';
import {Options as SassOptions} from "node-sass";

namespace TeaSchool{
    export interface GeneratePdfOptions {
        styleOptions?: SassOptions;
        htmlTemplateFn?: pug.compileTemplate;
        htmlTemplatePath?: string;
        htmlTemplateOptions?: pug.Options & pug.LocalsObject;
        pdfOptions?: PDFOptions;
    }

    export const generatePdf = async (options: GeneratePdfOptions): Promise<Buffer> => {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        const compiledStyle = sass.renderSync({...options.styleOptions});
        const htmlTemplateOptions: pug.Options & pug.LocalsObject = {
            ...options.htmlTemplateOptions,
            compiledStyle: compiledStyle.css
        };
        let renderedTemplate;

        if (options.htmlTemplateFn) {
            renderedTemplate = options.htmlTemplateFn(htmlTemplateOptions);
        } else if (options.htmlTemplatePath) {
            renderedTemplate = pug.renderFile(options.htmlTemplatePath, htmlTemplateOptions)
        } else {
            throw Error('htmlTemplateFn or htmlTemplatePath must be provided')
        }

        // Make puppeteer render the HTML from data buffer
        await page.goto(`data:text/html,${renderedTemplate}`,
            {waitUntil: ['load', 'domcontentloaded', 'networkidle0']} as NavigationOptions);

        const pdfBuffer = await page.pdf({...options.pdfOptions});

        await browser.close();

        return pdfBuffer
    };
}

export const generatePdf = TeaSchool.generatePdf;
export interface GeneratePdfOptions extends TeaSchool.GeneratePdfOptions {}

export default TeaSchool;
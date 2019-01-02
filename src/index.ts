import * as pug from 'pug';
import * as sass from 'node-sass';
import puppeteer, {LaunchOptions, NavigationOptions, PDFOptions} from 'puppeteer';
import {Options as SassOptions} from 'node-sass';

namespace TeaSchool{
    export interface GeneratePdfOptions {
        styleOptions?: SassOptions;
        htmlTemplateFn?: pug.compileTemplate;
        htmlTemplatePath?: string;
        htmlTemplateOptions?: pug.Options & pug.LocalsObject;
        pdfOptions?: PDFOptions;
        puppeteerOptions?: LaunchOptions;
    }

    export const generatePdf = async (options: GeneratePdfOptions): Promise<Buffer> => {
        const browser = await puppeteer.launch(options.puppeteerOptions);
        const page = await browser.newPage();
        let htmlTemplateOptions: pug.Options & pug.LocalsObject = {...options.htmlTemplateOptions};
        let renderedTemplate;

        // This is conditional since the user could get his style in some other way.
        if (options.styleOptions) {
            const compiledStyle = sass.renderSync({...options.styleOptions});

            htmlTemplateOptions = {
                ...options.htmlTemplateOptions,
                compiledStyle: compiledStyle.css,
            };
        }

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

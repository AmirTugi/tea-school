import TeaSchool from '../index';
import {Options as SassOptions} from 'node-sass';
import * as pug from 'pug';
import {PDFOptions} from 'puppeteer';

describe('generatePdf function test', () => {
    it('should create a pdf in memory', async () => {

        const styleOptions: SassOptions = {
            data: `
                body {
                    background-color: yellow;
                }
            `
        };

        const htmlTemplateOptions: pug.LocalsObject = {
            name: 'Timothy',
        };

        const htmlTemplateFn: pug.compileTemplate = (locals?: pug.LocalsObject): string => {
            return `
                div#banner-message
                    p Hello, #{name}
                    button My god, this is amazing
                `
        };

        const teaSchoolOptions: TeaSchool.GeneratePdfOptions = {
            styleOptions,
            htmlTemplateFn,
            htmlTemplateOptions,
            pdfOptions: {} as PDFOptions
        };

        // We don't really care what happens with the pdf itself. This is Puppeteer responsibility.
        // We just don't want it to crash.
        await TeaSchool.generatePdf(teaSchoolOptions);
    });
});
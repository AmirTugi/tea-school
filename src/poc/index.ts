import puppeteer, {NavigationOptions} from 'puppeteer';
import pug from 'pug';
import * as sass from 'node-sass';

(async () => {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        const compiledStyle = sass.renderSync({file: 'test.scss'});

        const renderedTemplate = pug.renderFile('test.pug', {
            name: 'Timothy',
            styling: compiledStyle.css
        });

        await page.goto(`data:text/html,${renderedTemplate}`, {waitUntil: ['load', 'domcontentloaded']} as NavigationOptions);
        const pdfBuffer = await page.pdf({path: 'hn.pdf', format: 'A4', printBackground: true});

        await browser.close();
    } catch (error) {
        console.error(error);
    }
})();
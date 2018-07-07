import puppeteer, {NavigationOptions} from 'puppeteer';
import path from 'path';
// import fs from 'fs';

// const html = fs.readFileSync('test.html', 'utf-8');

(async () => {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(`file:${path.resolve(__dirname, 'test.html')}`, {waitUntil: ['load', 'domcontentloaded']} as NavigationOptions);
        await page.pdf({path: 'hn.pdf', format: 'A4'});

        await browser.close();
    } catch (error) {
        console.error(error);
    }
})();
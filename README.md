# Tea-School
Simplified `HTML + CSS --> PDF` Generator for Nodejs  
Basically just a method combining [PugJS](https://github.com/pugjs/pug), [Node-Sass](https://github.com/sass/node-sass), and [Puppeteer](https://github.com/GoogleChrome/puppeteer).

## Read More
Read more about the package in my [medium post](https://itnext.io/tea-school-js-generate-a-pdf-file-from-html-and-css-in-node-js-32529f9b0f37)

## Install
Using `npm`
```bash
> npm install tea-school
```
Using `yarn`
```bash
> yarn add tea-school
```

## Usage
All the power you need resides in PugJs, Node-Sass and Puppeteer.  
You have the documentation for each one of them, and you simply pass the same object of configuration.

#### Example in TypeScript
For further inspection look at the `examples` folder
```typescript
import {GeneratePdfOptions, generatePdf} from 'tea-school';
import * as path from 'path';

const options: GeneratePdfOptions = {
    htmlTemplatePath: path.resolve(__dirname, 'pdf-template.pug'),
    styleOptions: {
        file: path.resolve(__dirname, 'pdf-template.scss')
    },
    htmlTemplateOptions: {
        contextRelatedVar: 'Timothy'
    },
    pdfOptions: {
        // Omit to get output as buffer solely
        path: 'pdf-file.pdf',
        format: 'A4',
        printBackground: true
    }
}

(async () => {
    const pdfBuffer: Buffer = await generatePdf(options);
})();
```

##### template.pug
```pug
// Use !{var} to use unescaped conent
style(type="text/css") !{compiledStyle}

div#banner-message
    p Hello, #{name}
    button My god, this is amazing
```

##### template.scss
```scss
$blue: #0084ff;
$blue-darker: darken($blue, 5);

body {
  background: #20262E;
  padding: 20px;
  font-family: Helvetica;
}

#banner-message {
  background: #e0e0e0;
  border-radius: 4px;
  padding: 20px;
  font-size: 25px;
  text-align: center;
  transition: all 0.2s;
  margin: 0 auto;
  width: 300px;

  button {
    background: $blue-darker;
    border: none;
    border-radius: 5px;
    padding: 8px 14px;
    font-size: 15px;
    color: #fff;
  }
}
```

#### Running the examples in the package
Use [ts-node](https://github.com/TypeStrong/ts-node) to run the `index.ts` without pre-compiling it.  
```bash
> npm i -g ts-node
> ts-node examples/basic-usage/index.ts
```

Alternatively, just compile the `index.ts` using `tsc`.  
```bash
> npm i -g typescript
> cd examples && tsc
> node ./basic-usage/index.js
```

### Important
The key `compiledStyle` is reserved on the Pug options for the compiled style to be attached to the html.  
Please do not use this key (or use at your own risk)

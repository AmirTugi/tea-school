# Tea-School
Simplified `HTML + CSS --> PDF` Generetor for Nodejs  
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

## What Do We Have Here?
The library doesn't really do anything special.  
It just combines 3 libraries for:
* Generating HTML in run-time ([PugJS](https://github.com/pugjs/pug))
* Generating CSS (Using [Sass](https://sass-lang.com/)) in run-time ([Node-Sass](https://github.com/sass/node-sass))
* Generating a PDF from HTML ([Puppeteer](https://github.com/GoogleChrome/puppeteer))

## Usage
We will generate the following PDF:  
![image](https://user-images.githubusercontent.com/8065975/61318127-0a28d480-a80d-11e9-84e6-11f95399d596.png)

For further inspection look at the `examples` folder  

*The example will be in TypeScript, but can work in JavaScript in a matter of removing just a few words.
```typescript
import {GeneratePdfOptions, generatePdf} from 'tea-school';
import * as path from 'path';

const options: GeneratePdfOptions = {
    htmlTemplatePath: path.resolve(__dirname, 'pdf-template.pug'),

    // Here you put an object according to https://github.com/sass/node-sass#options 
    styleOptions: {
        file: path.resolve(__dirname, 'pdf-template.scss')
    },

    // Here you put an object according to https://pugjs.org/api/reference.html#options
    // You can add any additional key to be used as a variable in the template.
    htmlTemplateOptions: {
        contextRelatedVar: 'Timothy'
    },

    // Here you put an object according to https://github.com/GoogleChrome/puppeteer/blob/v1.18.1/docs/api.md#pagepdfoptions
    pdfOptions: {
        // Ignore `path` to get the PDF as buffer only
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
```bash
> npm run example

// OR

> npm run example:invoice
```

The examples run using [ts-node](https://github.com/TypeStrong/ts-node) to run without compiling the tests to JavaScript first.

### Important
The key `compiledStyle` is reserved on the Pug options for the compiled style to be attached to the html.  
Please do not use this key (or use at your own risk)

# Tea-School
Simplified `HTML + CSS --> PDF` Generetor for Nodejs  
Basically just a method combining [PugJS](https://github.com/pugjs/pug), [Node-Sass](https://github.com/sass/node-sass), and [Puppeteer](https://github.com/GoogleChrome/puppeteer).

## Install
```
npm install tea-school
```

## Usage
All the power you need resides in PugJs, Node-Sass and Puppeteer.  
You have the documentation for each one of them, and you simply pass the same object of configuration.

#### Example in TypeScript
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
style(type="text/css") #{compiledStyle}

div#banner-message
    p Hello, #{name}
    button Hover to change color
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

####Important
The key `compiledStyle` is reserved on the Pug options fro the compiled style to be attached to the html.  
Please do not use this key (or use at your own risk)
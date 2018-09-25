
Recently, I got caught in the hype over the TypeScript. Even though I have neutral feelings towards TypeScript, I came across a possible way to use TypeScript with AWS Lambda function. I stumbled upon this possibility while I was looking for different possibilities since I don't use Serverless. Before I move forward, I would like to acknowledge that, I haven't tested the particular approach in the production environment.

This idea was inspired by a flag used by the  [**Mocha**](https://www.npmjs.com/package/mocha)**.** The particular flag is as mentioned below.

```sh
--require ts-node/register
```

So, let's go ahead. (Drum roll please....)

You mainly need 2  **npm**  packages.

-   **TypeScript**  ([https://www.npmjs.com/package/typescript](https://www.npmjs.com/package/typescript))
-   **TypeScript Node** ([https://www.npmjs.com/package/ts-node](https://www.npmjs.com/package/ts-node))

Now, as the first order of the business, Let's create a new Node.Js Lambda package. My  **_package.json_**  is as follows.
```json
{
  "private": true,
  "name": "my-test-package",
  "description": "typeScript with lambda",
  "version": "1.0.0",
  "scripts": {},
  "devDependencies": {},
  "dependencies": {
    "typescript": "2.7.2",
    "ts-node": "5.0.0"
  }
}
```
Now, let's write the  **_index.js._**
```javascript
'use strict';
// Here we define all the configuration for the TypeScript compiler
require('ts-node').register({
  target: 'es6',
  module: 'commonjs',
  strict: true
});

let logic = require('./logic.ts');

module.exports.logic = logic.doSomeThing.bind(logic);
```
The '**_register_**' function of the  **_ts-node_**  module is important for TypeScript compilation on the fly.

Please read:

-   [https://www.npmjs.com/package/ts-node#programmatic](https://www.npmjs.com/package/ts-node#programmatic)
-   [https://www.npmjs.com/package/ts-node#how-it-works](https://www.npmjs.com/package/ts-node#how-it-works)

Then let's write  **logic.ts**
```typescript
interface SomeResponse {
  statusCode: number;
  body: string;
}

export function doSomeThing (event: any, context: any, callback: any): any {
  const response: SomeResponse = {
    statusCode: 200,
    body: JSON.stringify({
      message: Math.floor(Math.random() * 10)
    })
  };

  callback(undefined, response);
};
```
after that, let's bundle it using zip (don't forget to run  **_npm -i_**) before you bundle.

![](https://media.licdn.com/dms/image/C5612AQFcihZO_6-23Q/article-inline_image-shrink_1500_2232/0?e=1543449600&v=beta&t=c-VCBZOQY8geeTr8MgqWS3xgvTOEpC7hj_rySGTXgac)

let's upload and test the package.

![](https://media.licdn.com/dms/image/C5612AQFOmaZQzEw_JA/article-inline_image-shrink_1500_2232/0?e=1543449600&v=beta&t=CwOrte54zBQPVka2uEllFokIkCk5Q5i5zixnvDn_GZk)

Now, let's test it. (Drum roll, again please....)

![](https://media.licdn.com/dms/image/C5612AQFZGlQE52k-7Q/article-inline_image-shrink_1500_2232/0?e=1543449600&v=beta&t=_VLKSRnUOJzgNhdJPIQp897ouqmw2amWkvsjZ8gAmnk)

And, there you are, a successful execution.

The size of the lambda package with only '**_ts-node_**' and '**_TypeScript_**' comes around  **_6.4MB._** Finally, I want to remind that, this method was not tested under production environment and this method has to be tested further.

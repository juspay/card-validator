## Contributing

0. Fork (<https://github.com/yourname/yourproject/fork>)
1. Create feature branch (`git checkout -b feature/foo-bar`)
2. For code styling, follow [this guide](https://google.github.io/styleguide/jsguide.html).
3. Commit your changes (`git commit -am 'Add some foo bar'`)
4. Push to the branch (`git push origin feature/foo-bar`)
5. Create a new Pull Request


## For publishing to NPM

### Minification
 - Use node-minifier: https://www.npmjs.com/package/minifier
 - Install minifier: `npm install -g minifier`

And minify, `npm run minify` or `minify --output dist/validator.js src/validator.js`


### Publishing to NPM
 - Get yourself added as a collaborator.
 - Increment the build version/project version in package.json

Run, `npm publish`

# Card Validator

Generic helpers for card number, expiry and CVV validations

## Usage: 
Import the library and initialize card object.

Install from npm:

`npm install simple-card-validator --save`

`var cardValidator = require('simple-card-validator');`

Or, you can simply use the file from `dist/validator.js` if you are not using node/npm.

`var card = new cardValidator('4242-4242-4242-4242');`

### Getting card details
`card.getCardDetails();`
This would output, card brand and different validation outputs like below:
```
{ card_type: 'visa',
  valid: true,
  luhn_valid: true,
  length_valid: true,
  cvv_length: [ 3 ] }
```
### Validations
To simply validate a card, call:
`card.validateCard();`
The result will be a validity boolean.

For validating expiry date, 
`card.validateExpiry('12/2018');`

Additionally, the base date can be set for expiry validations. The base month and date can be provided by using,
`card.setBaseDate(month, year);`

eg: `card.setBaseDate('02', '2016');`

For validating CVV, use:
`card.validateCvv(111);`
CVV will be validated based on the brand of the card.

## License

MIT license. Copyright © 2016 - [juspay.in](https://www.juspay.in).

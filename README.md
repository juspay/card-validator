# Card Validator

Generic helpers for card number, expiry and CVV validations

[![npm version](https://badge.fury.io/js/%40juspay%2Fsimple-card-validator.svg)](https://badge.fury.io/js/%40juspay%2Fsimple-card-validator)

## Usage:
Import the library and initialize card object.

Install from npm:

`npm i @juspay/simple-card-validator --save`

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
  cvv_length: [ 3 ],
  gaps: [ 4, 8, 12 ],
  supported_lengths: [ 16 ],
  max_length: 16 }
```

#### Output format

| Field             | Description                           | Type              |
| ----------------- | ------------------------------------- | ----------------- |
| card_type         | The card issuer for the provided card | String            |
| valid             | Are the card details valid            | Boolean           |
| luhn_valid        | Is the card number valid              | Boolean           |
| length_valid      | If the card number length is valid    | Boolean           |
| cvv_length        | If the CVV/CAVV length is valid       | Array [ Integer ] |
| gaps              | Gaps for UI as printed in cards       | Array [ Integer ] |
| supported_lengths | Supported lengths for the card type   | Array [ Integer ] |
| max_length        | Maximum length for the card type      | Integer           |


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


## Contribution

Read through the development
[guidelines](https://sites.google.com/a/juspay.in/card-validator-devel-guide/).

## License

MIT license. Copyright © 2018 - [juspay.in](https://www.juspay.in).


var __indexOf = [].indexOf;

var cardTypes = [
  {
    name: 'amex',
    pattern: /^3[47]/,
    valid_length: [15],
    cvv_length: [4]
  }, {
    name: 'diners_club_carte_blanche',
    pattern: /^30[0-5]/,
    valid_length: [14],
    cvv_length: [3]
  }, {
    name: 'diners_club_international',
    pattern: /^36/,
    valid_length: [14],
    cvv_length: [3]
  }, {
    name: 'jcb',
    pattern: /^35(2[89]|[3-8][0-9])/,
    valid_length: [16],
    cvv_length: [3]
  }, {
    name: 'laser',
    pattern: /^(6304|670[69]|6771)/,
    valid_length: [16, 17, 18, 19]
  }, {
    name: 'visa_electron',
    pattern: /^(4026|417500|4508|4844|491(3|7))/,
    valid_length: [16],
    cvv_length: [3]
  }, {
    name: 'visa',
    pattern: /^4/,
    valid_length: [16],
    cvv_length: [3]
  }, {
    name: 'mastercard',
    pattern: /^5[1-5]/,
    valid_length: [16],
    cvv_length: [3]
  }, {
    name: 'maestro',
    pattern: /^(5018|5081|5044|5020|5038|603845|6304|6759|676[1-3]|6220|504834|504817|504645)\d*/,
    valid_length: [12, 13, 14, 15, 16, 17, 18, 19],
    cvv_length: [0, 3]
  }, {
    name: 'discover',
    pattern: /^(6011|622(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[0-1][0-9]|92[0-5]|64[4-9])|65)/,
    valid_length: [16],
    cvv_length: [3]
  }
];

function cardValidator(cardNumber) {
  this.cardNumber = cardNumber;
  this.card = null;
  this.cardType = 'unknown';
  this.valid = false;
  this.luhnValid = false;
  this.lengthValid = false;
  this.cvvLength = [];
  this.month = null;
  this.year = null;

  getCardType = function(number) {
    var _j, _len;
    for (_j = 0, _len = cardTypes.length; _j < _len; _j++) {
      if (number.match(cardTypes[_j].pattern)) {
        return cardTypes[_j];
      }
    }
    return null;
  };

  isValidLuhn = function(number) {
    var digit, _n, sum, _j, _len, _ref;
    sum = 0;
    _ref = number.split('').reverse();
    for (_n = _j = 0, _len = _ref.length; _j < _len; _n = ++_j) {
      digit = _ref[_n];
      digit = +digit;
      if (_n % 2) {
        digit *= 2;
        if (digit < 10) {
          sum += digit;
        } else {
          sum += digit - 9;
        }
      } else {
        sum += digit;
      }
    }
    return sum % 10 === 0;
  };

  isValidLength = function(number, cardType) {
    var _ref1;
    return _ref1 = number.length, __indexOf.call(this.card.valid_length, _ref1) >= 0;
  };

  validateCardNumber = function(number) {
    this.card = this.getCardType(number);
    if(this.card && this.cardType) {
      this.cardType = this.card.name;
      this.luhnValid = this.isValidLuhn(number);
      this.lengthValid = this.isValidLength(number, this.card);
      this.cvvLength = this.card.cvv_length;
    }
    return {
      card_type: this.cardType,
      valid: this.luhnValid && this.lengthValid,
      luhn_valid: this.luhnValid,
      length_valid: this.lengthValid,
      cvv_length: this.cvvLength
    };
  };

  normalize = function(number) {
    return number.toString().replace(/[ -]/g, '');
  };

  getCardDetails = function() {
    if(!this.cardNumber)
      throw 'Invalid cardNumber property set';
    var number = this.normalize(this.cardNumber);
    return this.validateCardNumber(number);
  };

  setBaseDate = function(month, year) {
    if(isNaN(month) || isNaN(year) || parseInt(month) < 1 || parseInt(month) > 12)
      throw 'Invalid date format. Use MM, YYYY format';
    if(!month || !year) {
      var date = new Date();
      month = month || date.getMonth() + 1;
      year = year || date.getFullYear();
    }
    this.month = parseInt(month);
    this.year = parseInt(year);
  }

  validateCard = function() {
    if(!this.cardNumber)
      throw 'Invalid cardNumber property set';
    return getCardDetails().valid;
  };

  validateCvv = function(val) {
    val = val || ''
    if(!this.cardNumber)
      throw 'Invalid cardNumber property set';
    if(!this.card)
      this.validateCard();
    if(isNaN(val))
      throw 'CVV should be a number';
    // if CVV is null
    if(this.cardType && this.cardType == 'maestro')
      return (val == '') || (val && __indexOf.call(this.cvvLength, val.toString().length) >= 0) || false
    if(!val)
      throw 'CVV should be a number';
    return __indexOf.call(this.cvvLength, val.toString().length) >= 0;
  };

  validateExpiry = function(val) {
    var _re = /^(0[1-9]|1[0-2])\/2[0-9]{3}$/;
    if(!this.cardNumber)
      throw 'Invalid cardNumber property set';
    if(!val)
      throw 'Expiry should not be empty';
    if(!this.card)
      this.validateCard();
    if(!this.month || !this.year)
      this.setBaseDate(this.month, this.year);
    var expiry = val &&  val.toString().split('/') || [undefined, undefined];
    if(!expiry[0] || !expiry[1] || isNaN(expiry[0]) || isNaN(expiry[1]))
      throw 'Expiry should be in MM/YYYY format';
    if(expiry && expiry.length == 2 && expiry[1] == this.year && expiry[0] < this.month)
      return false
    return _re.test(val.toString()) && parseInt(expiry[0]) > 0 && parseInt(expiry[0]) < 13 && parseInt(expiry[1]) >= this.year;
  };

  return this;
};

module.exports = cardValidator;

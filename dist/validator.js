function cardValidator(t){return this.cardNumber=t,this.card=null,this.cardType="unknown",this.valid=!1,this.luhnValid=!1,this.lengthValid=!1,this.cvvLength=[],this.month=null,this.year=null,getCardType=function(t){var e,a
for(e=0,a=cardTypes.length;e<a;e++){if(cardTypes[e].hasOwnProperty("pattern")&&t.match(cardTypes[e].pattern))return cardTypes[e]
if(cardTypes[e].hasOwnProperty("range")){var r=t.substr(0,6)
if(isNaN(r))return null
r=Number.parseInt(r)
for(var n=0;n<cardTypes[e].range.length;n++)if(cardTypes[e].range[n][0]<=r&&r<=cardTypes[e].range[n][1])return cardTypes[e]}}return null},isValidLuhn=function(t){var e,a,r,n,i,h
for(r=0,h=t.split("").reverse(),a=n=0,i=h.length;n<i;a=++n)e=h[a],e=+e,a%2?(e*=2,r+=e<10?e:e-9):r+=e
return r%10===0},isValidLength=function(t,e){var a
return a=t.length,__indexOf.call(this.card.valid_length,a)>=0},validateCardNumber=function(t){return this.card=getCardType(t),this.card&&this.cardType&&(this.cardType=this.card.name,this.luhnValid=isValidLuhn(t),this.lengthValid=isValidLength.call(this,t,this.card),this.cvvLength=this.card.cvv_length),{card_type:this.cardType,valid:this.luhnValid&&this.lengthValid,luhn_valid:this.luhnValid,length_valid:this.lengthValid,cvv_length:this.cvvLength}},normalize=function(t){return t.toString().replace(/[ -]/g,"")},this.getCardDetails=function(){if(!this.cardNumber)throw"Invalid cardNumber property set"
var t=normalize(this.cardNumber)
return validateCardNumber.call(this,t)},this.setBaseDate=function(t,e){if(isNaN(t)||isNaN(e)||parseInt(t)<1||parseInt(t)>12)throw"Invalid date format. Use MM, YYYY format"
if(!t||!e){var a=new Date
t=t||a.getMonth()+1,e=e||a.getFullYear()}this.month=parseInt(t),this.year=parseInt(e)},this.validateCard=function(){if(!this.cardNumber)throw"Invalid cardNumber property set"
return this.getCardDetails().valid},this.validateCvv=function(t){if(t=t||"",!this.cardNumber)throw"Invalid cardNumber property set"
if(this.card||this.validateCard(),isNaN(t))throw"CVV should be a number"
if(this.cardType&&"maestro"==this.cardType)return""==t||t&&__indexOf.call(this.cvvLength,t.toString().length)>=0||!1
if(!t)throw"CVV should be a number"
return __indexOf.call(this.cvvLength,t.toString().length)>=0},this.validateExpiry=function(t){var e=/^(0[1-9]|1[0-2])\/2[0-9]{3}$/
if(!this.cardNumber)throw"Invalid cardNumber property set"
if(!t)throw"Expiry should not be empty"
this.card||this.validateCard(),this.month&&this.year||this.setBaseDate(this.month,this.year)
var a=t&&t.toString().split("/")||[void 0,void 0]
if(!a[0]||!a[1]||isNaN(a[0])||isNaN(a[1]))throw"Expiry should be in MM/YYYY format"
return!(a&&2==a.length&&a[1]==this.year&&a[0]<this.month)&&(e.test(t.toString())&&parseInt(a[0])>0&&parseInt(a[0])<13&&parseInt(a[1])>=this.year)},this}var __indexOf=[].indexOf,cardTypes=[{name:"amex",pattern:/^3[47]/,valid_length:[15],cvv_length:[4]},{name:"diners_club_carte_blanche",pattern:/^30[0-5]/,valid_length:[14],cvv_length:[3]},{name:"diners_club_international",pattern:/^36/,valid_length:[14],cvv_length:[3]},{name:"jcb",pattern:/^35(2[89]|[3-8][0-9])/,valid_length:[16],cvv_length:[3]},{name:"laser",pattern:/^(6304|670[69]|6771)/,valid_length:[16,17,18,19]},{name:"visa_electron",pattern:/^(4026|417500|4508|4844|491(3|7))/,valid_length:[16],cvv_length:[3]},{name:"visa",pattern:/^4/,valid_length:[16],cvv_length:[3]},{name:"mastercard",pattern:/^5[1-5]/,valid_length:[16],cvv_length:[3]},{name:"maestro",pattern:/^(5018|5081|5044|5020|5038|603845|6304|6759|676[1-3]|6220|504834|504817|504645)\d*/,valid_length:[12,13,14,15,16,17,18,19],cvv_length:[0,3]},{name:"discover",pattern:/^(6011|622(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[0-1][0-9]|92[0-5]|64[4-9])|65)/,valid_length:[16],cvv_length:[3]},{name:"rupay",range:[[508500,508999],[606985,607984],[608001,608100],[608101,608500],[652150,653149]],valid_length:[16],cvv_length:[3]}]
module.exports=cardValidator

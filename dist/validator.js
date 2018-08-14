function cardValidator(t){return this.cardNumber=t,this.card=null,this.cardType="unknown",this.valid=!1,this.luhnValid=!1,this.lengthValid=!1,this.cvvLength=[],this.gaps=[],this.supportedLengths=[],this.maxLength=null,this.month=null,this.year=null,getCardType=function(t){var a,e
for(a=0,e=cardTypes.length;a<e;a++){if(cardTypes[a].hasOwnProperty("pattern")&&t.match(cardTypes[a].pattern))return cardTypes[a]
if(cardTypes[a].hasOwnProperty("range")){var r=t.substr(0,6)
if(isNaN(r))return null
r=Number.parseInt(r)
for(var n=0;n<cardTypes[a].range.length;n++)if(cardTypes[a].range[n][0]<=r&&r<=cardTypes[a].range[n][1])return cardTypes[a]}}return null},isValidLuhn=function(t){var a,e,r,n,i,h
for(r=0,h=t.split("").reverse(),e=n=0,i=h.length;n<i;e=++n)a=h[e],a=+a,e%2?(a*=2,r+=a<10?a:a-9):r+=a
return r%10===0},isValidLength=function(t,a){var e
return e=t.length,__indexOf.call(this.card.valid_length,e)>=0},validateCardNumber=function(t){return this.card=getCardType(t),this.card&&this.cardType&&(this.cardType=this.card.name,this.luhnValid=isValidLuhn(t),this.lengthValid=isValidLength.call(this,t,this.card),this.cvvLength=this.card.cvv_length,this.gaps=this.card.gaps,this.supportedLengths=this.card.valid_length,this.maxLength=this.card.valid_length[this.card.valid_length.length-1]),{card_type:this.cardType,valid:this.luhnValid&&this.lengthValid,luhn_valid:this.luhnValid,length_valid:this.lengthValid,cvv_length:this.cvvLength,gaps:this.gaps,supported_lengths:this.supportedLengths,max_length:this.maxLength}},normalize=function(t){return t.toString().replace(/[ -]/g,"")},this.getCardDetails=function(){if(!this.cardNumber)throw"Invalid cardNumber property set"
var t=normalize(this.cardNumber)
return validateCardNumber.call(this,t)},this.setBaseDate=function(t,a){if(isNaN(t)||isNaN(a)||parseInt(t)<1||parseInt(t)>12)throw"Invalid date format. Use MM, YYYY format"
if(!t||!a){var e=new Date
t=t||e.getMonth()+1,a=a||e.getFullYear()}this.month=parseInt(t),this.year=parseInt(a)},this.validateCard=function(){if(!this.cardNumber)throw"Invalid cardNumber property set"
return this.getCardDetails().valid},this.validateCvv=function(t){if(t=t||"",!this.cardNumber)throw"Invalid cardNumber property set"
if(this.card||this.validateCard(),isNaN(t))throw"CVV should be a number"
if(this.cardType&&"maestro"==this.cardType)return""==t||t&&__indexOf.call(this.cvvLength,t.toString().length)>=0||!1
if(!t)throw"CVV should be a number"
return __indexOf.call(this.cvvLength,t.toString().length)>=0},this.validateExpiry=function(t){var a=/^(0[1-9]|1[0-2])\/2[0-9]{3}$/
if(!this.cardNumber)throw"Invalid cardNumber property set"
if(!t)throw"Expiry should not be empty"
this.card||this.validateCard(),this.month&&this.year||this.setBaseDate(this.month,this.year)
var e=t&&t.toString().split("/")||[void 0,void 0]
if(!e[0]||!e[1]||isNaN(e[0])||isNaN(e[1]))throw"Expiry should be in MM/YYYY format"
return!(e&&2==e.length&&e[1]==this.year&&e[0]<this.month)&&(a.test(t.toString())&&parseInt(e[0])>0&&parseInt(e[0])<13&&parseInt(e[1])>=this.year)},this}var __indexOf=[].indexOf,cardTypes=[{name:"amex",pattern:/^3[47]/,valid_length:[15],cvv_length:[4],gaps:[4,10]},{name:"diners_club_carte_blanche",pattern:/^30[0-5]/,valid_length:[14],cvv_length:[3],gaps:[4,10]},{name:"diners_club_international",pattern:/^3([689]|09)/,valid_length:[14],cvv_length:[3],gaps:[4,10]},{name:"jcb",pattern:/^35(2[89]|[3-8][0-9])/,valid_length:[16],cvv_length:[3],gaps:[4,10]},{name:"laser",pattern:/^(6304|670[69]|6771)/,valid_length:[16,17,18,19],gaps:[4,8,12,16]},{name:"visa_electron",pattern:/^(4026|417500|4508|4844|491(3|7))/,valid_length:[16],cvv_length:[3],gaps:[4,8,12]},{name:"visa",pattern:/^4/,valid_length:[16],cvv_length:[3],gaps:[4,8,12]},{name:"mastercard",pattern:/^5[1-5]/,valid_length:[16],cvv_length:[3],gaps:[4,8,12]},{name:"maestro",pattern:/^(5018|5081|5044|5020|5038|603845|6304|6759|676[1-3]|6220|504834|504817|504645)\d*/,valid_length:[12,13,14,15,16,17,18,19],cvv_length:[0,3],gaps:[4,8,12,16]},{name:"rupay",range:[[508500,508999],[606985,607384],[607385,607484],[607485,607984],[608001,608100],[608101,608200],[608201,608300],[608301,608350],[608351,608500],[652150,652849],[652850,653049],[653050,653149],[817200,819899],[819900,820199]],valid_length:[16],cvv_length:[3],gaps:[4,8,12]},{name:"discover",pattern:/^(6011|622(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[0-1][0-9]|92[0-5]|64[4-9])|65)/,valid_length:[16],cvv_length:[3],gaps:[4,8,12]},{name:"sodexo",pattern:/^(637513)/,valid_length:[16],cvv_length:[3],gaps:[4,8,12]}]
module.exports=cardValidator

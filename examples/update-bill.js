var fs         = require('fs');
var KeyUtils   = require('../lib/key-utils');
var HOME       = process.env['HOME'];
var BitPay     = require('../lib/rest-client');
var encPrivkey = fs.readFileSync(HOME + '/.bp/api.key').toString();
var config     = require('../config');
var privkey    = KeyUtils.decrypt(config.keyPassword, encPrivkey);
var client     = new BitPay(privkey);

client.on('ready', function() {

  client.get('bills', function(err, data) {
    var bill = data[0];
    console.log(bill);
    bill.put({ 
      status: 'ready', 
      buyerEmail: 'gordon@bitpay.com' 
    }, function(err, bill) {
      console.log(err || bill);
    });

  });

});
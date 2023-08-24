const { createHash } = require('crypto');

function hash() {
    var chrs = 'abdehkmnpswxzABDEFGHKMNPQRSTWXZ123456789';
    var str = '';
    for (var i = 0; i < 64; i++) {
        var pos = Math.floor(Math.random() * chrs.length);
        str += chrs.substring(pos,pos+1);
    }

  return "0x" + createHash('sha256').update(str).digest('hex');
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


function getCryptoCurrency(crypto_currency_name = "eth") {
    
    const crypto_currency = {
        "btc" : {
            "Name":"Bitcoin",
            "ShortName":"BTC",
            "Decimal":8
        },
        "eth" : {
            "Name":"Ethereum",
            "ShortName":"ETH",
            "Decimal":18
        },
        "usdt" : {
            "Name":"Tether",
            "ShortName":"USDT",
            "Decimal":6
        },
        "bnb" : {
            "Name":"BNB",
            "ShortName":"BNB",
            "Decimal":18
        },
        "xrp" : {
            "Name":"XRP",
            "ShortName":"XRP",
            "Decimal":6
        }
    }

    return crypto_currency[crypto_currency_name]
}

function getRandomCryptoCurrency(){
    const arr = ["btc", "eth", "usdt", "bnb", "xrp"]
    return getCryptoCurrency(arr[getRandomIntInclusive(0, 4)])
}

function card_number_to_chuks(str){
    let res_str = ''
    
    for(let i = 0; i < str.length; i++){
        res_str += str[i];
        if(i % 4 == 3){
            res_str += ' ';
        }
    }
    
    return res_str
}

module.exports = {hash, card_number_to_chuks}
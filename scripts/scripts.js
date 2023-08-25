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
function convertor(amount, from, to){
    if (to == "RUB"){
        if (from == "BRL"){
            return amount * 19.43;
        }
        if (from == "CNY"){
            return amount * 12.97;
        }
        if (from == "INR"){
            return amount * 1.14;
        }
        if (from == "ZAR"){
            return amount * 5.07;
        }
    }
    
    if (to == "BRL"){
        if (from == "RUB"){
            return amount * 0.05;
        }
        if (from == "CNY"){
            return amount * 0.67;
        }
        if (from == "INR"){
            return amount * 0.06;
        }
        if (from == "ZAR"){
            return amount * 0.26;
        }
    }

    if (to == "CNY"){
        if (from == "BRL"){
            return amount * 1.51;
        }
        if (from == "RUB"){
            return amount * 0.08;
        }
        if (from == "INR"){
            return amount * 0.09;
        }
        if (from == "ZAR"){
            return amount * 0.39;
        }
    }

    if (to == "INR"){
        if (from == "BRL"){
            return amount * 17.05;
        }
        if (from == "CNY"){
            return amount * 11.38;
        }
        if (from == "RUB"){
            return amount * 0.87;
        }
        if (from == "ZAR"){
            return amount * 4.45;
        }
    }

    if (to == "ZAR"){
        if (from == "BRL"){
            return amount * 3.83;
        }
        if (from == "CNY"){
            return amount * 2.56;
        }
        if (from == "INR"){
            return amount * 0.22;
        }
        if (from == "RUB"){
            return amount * 0.19;
        }
    }
}

module.exports = {hash, card_number_to_chuks, get_exchange_rate, convertor}

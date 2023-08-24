import requests
import json


def get_exchange_rates_from_cbr():
    raw_data = json.loads(requests.get("https://www.cbr-xml-daily.ru/daily_json.js").content)
    res_data = {
        "BRL": raw_data["Valute"]["BRL"]["Value"],
        "CNY": raw_data["Valute"]["CNY"]["Value"],
        "INR": raw_data["Valute"]["INR"]["Value"],
        "ZAR": raw_data["Valute"]["ZAR"]["Value"]
    }
    return res_data


print(get_exchange_rates_from_cbr())

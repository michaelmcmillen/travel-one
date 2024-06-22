import csv
import requests

def get_country_data():
    url = 'https://restcountries.com/v3.1/all'
    response = requests.get(url)
    if response.status_code == 200:
        countries = response.json()
        return countries
    else:
        print(f"Failed to fetch country data: {response.status_code}")
        return None

def generate_csv(filename):
    countries = get_country_data()
    if not countries:
        return
    
    headers = ['Country', 'Continent', 'Currency', 'Population', 'Capital City', 'ISO2', 'ISO3', 'Flag Icon Code']
    with open(filename, 'w', newline='', encoding='utf-8') as csvfile:
        writer = csv.writer(csvfile)
        writer.writerow(headers)

        for country in countries:
            name = country.get('name', {}).get('common', '')
            continent = country.get('region', '')
            population = country.get('population', '')
            capital = country.get('capital', [''])[0]
            iso2 = country.get('cca2', '')
            iso3 = country.get('cca3', '')
            flag_code = country.get('flag', [''])[0]
            currencies = country.get('currencies', {})
            for currency_info in currencies.values():
                currency = currency_info.get('name', '')

            writer.writerow([name, continent, currency, population, capital, iso2, iso3, flag_code])

if __name__ == '__main__':
    generate_csv('countries_data.csv')

import requests
import csv

# Function to convert symbol to hex codes
def symbol_to_hex(symbol):
    return ','.join(f'{ord(char):X}' for char in symbol)

# Fetch data from Rest Countries API
response = requests.get('https://restcountries.com/v3.1/all')
countries_data = response.json()

# Prepare data for CSV
csv_data = []
for country in countries_data:
    if 'currencies' in country:
        for code, info in country['currencies'].items():
            name = info.get('name', '')
            symbol = info.get('symbol', '')
            hex_symbol = symbol_to_hex(symbol) if symbol else ''
            csv_data.append([name, hex_symbol, code])

# Remove duplicate currency entries by converting to a set of tuples, then back to a list
csv_data = list(set(map(tuple, csv_data)))

# Export to CSV
csv_file = 'currencies.csv'
with open(csv_file, mode='w', newline='', encoding='utf-8') as file:
    writer = csv.writer(file)
    writer.writerow(['Currency Name', 'Symbol', 'Currency Code'])
    writer.writerows(csv_data)

print(f"Data has been written to {csv_file}")

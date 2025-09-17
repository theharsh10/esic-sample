# Check available sheet names
import pandas as pd

# Check sheet names in each file
files = [
    '5-Master-Workbook-for-AMO-Aug.xlsx',
    '4-Master-Workbook-for-AMO-July.xlsx', 
    '3-Master-Workbook-for-AMO-June.xlsx',
    '2-Master-Workbook-for-AMO-May.xlsx',
    '1-Master-Workbook-for-AMO-April.xlsx',
    'Hospital-Dhanwantari-adoption.xlsx'
]

for file in files:
    try:
        excel_file = pd.ExcelFile(file)
        print(f"\n{file}:")
        print(f"Sheet names: {excel_file.sheet_names}")
    except Exception as e:
        print(f"Error reading {file}: {e}")
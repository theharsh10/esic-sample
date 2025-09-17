import pandas as pd
import numpy as np

# Load all the data files to analyze current performance
files = {
    'August 2025': 'attached_file:1',
    'July 2025': 'attached_file:2', 
    'June 2025': 'attached_file:3',
    'May 2025': 'attached_file:4',
    'April 2025': 'attached_file:5',
    'Hospital Data': 'attached_file:6'
}

# Read the August data first to understand structure
aug_df = pd.read_excel('5-Master-Workbook-for-AMO-Aug.xlsx', sheet_name='Master sheet_Aug')
print("August 2025 Data Structure:")
print(aug_df.head())
print("\nColumns:", aug_df.columns.tolist())
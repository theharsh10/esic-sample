# Read all the dispensary data
dispensary_data = {}

# August data (note the leading space)
aug_df = pd.read_excel('5-Master-Workbook-for-AMO-Aug.xlsx', sheet_name=' Master sheet_Aug')
dispensary_data['August'] = aug_df

# July data
jul_df = pd.read_excel('4-Master-Workbook-for-AMO-July.xlsx', sheet_name='Master sheet_Jul')
dispensary_data['July'] = jul_df

# June data
jun_df = pd.read_excel('3-Master-Workbook-for-AMO-June.xlsx', sheet_name='Master sheet_Jun')
dispensary_data['June'] = jun_df

# May data
may_df = pd.read_excel('2-Master-Workbook-for-AMO-May.xlsx', sheet_name='Master sheet_May')
dispensary_data['May'] = may_df

# April data
apr_df = pd.read_excel('1-Master-Workbook-for-AMO-April.xlsx', sheet_name='Master sheet_April')
dispensary_data['April'] = apr_df

# Hospital data
hospital_df = pd.read_excel('Hospital-Dhanwantari-adoption.xlsx', sheet_name='Day wise')

print("Data loaded successfully!")
print(f"\nAugust data shape: {aug_df.shape}")
print(f"Columns: {list(aug_df.columns)}")

# Let's examine the structure better
print("\nFirst few rows of August data:")
print(aug_df.head(10))
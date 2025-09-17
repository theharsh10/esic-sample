# Clean and structure the data
def clean_dispensary_data(df):
    # Get the header row (row 1) for column names
    headers = df.iloc[1].tolist()
    
    # Create a clean dataframe
    clean_df = pd.DataFrame()
    
    # Extract dispensary data (skip header rows)
    data_rows = []
    
    for i in range(2, len(df)):
        if pd.notna(df.iloc[i, 0]):  # If there's a number in first column (dispensary ID)
            dispensary_id = df.iloc[i, 0]
            dispensary_name = df.iloc[i, 1]
            if "(Daily)" in str(dispensary_name):
                dispensary_name_clean = str(dispensary_name).replace(" (Daily)", "")
                row_type = "Daily"
            elif "(Monthly)" in str(dispensary_name):
                dispensary_name_clean = str(dispensary_name).replace(" (Monthly)", "")
                row_type = "Monthly"
            else:
                dispensary_name_clean = str(dispensary_name)
                row_type = "Unknown"
            
            row_data = {
                'Dispensary_ID': dispensary_id,
                'Dispensary_Name': dispensary_name_clean,
                'Type': row_type,
                'New_IP_Registration': df.iloc[i, 2],
                'Check_In_Generation': df.iloc[i, 4],
                'Total_Footfall': df.iloc[i, 6],
                'Online_Prescriptions': df.iloc[i, 10],
                'Offline_Prescriptions': df.iloc[i, 12],
                'Total_Prescriptions': df.iloc[i, 14],
                'Total_Referral_Online': df.iloc[i, 22],
                'Total_Referral_Offline': df.iloc[i, 30],
                'Total_Referral': df.iloc[i, 32],
                'Total_Certificate_Online': df.iloc[i, 38],
                'Total_Certificate_Offline': df.iloc[i, 44],
                'Total_Certificates': df.iloc[i, 46],
                'Old_Claim_File': df.iloc[i, 54],
                'New_Claims': df.iloc[i, 56],
                'Referred_to_AMO': df.iloc[i, 58],
                'Pending_Claims': df.iloc[i, 60],
                'Camp_Footfall': df.iloc[i, 65],
                'New_IP_Camp': df.iloc[i, 67],
                'Total_OPD': df.iloc[i, 69]
            }
            data_rows.append(row_data)
        elif pd.notna(df.iloc[i, 1]) and "(Monthly)" in str(df.iloc[i, 1]):
            # Handle monthly data for same dispensary
            dispensary_name = df.iloc[i, 1]
            dispensary_name_clean = str(dispensary_name).replace(" (Monthly)", "")
            
            row_data = {
                'Dispensary_ID': dispensary_id if 'dispensary_id' in locals() else None,
                'Dispensary_Name': dispensary_name_clean,
                'Type': "Monthly",
                'New_IP_Registration': df.iloc[i, 2],
                'Check_In_Generation': df.iloc[i, 4],
                'Total_Footfall': df.iloc[i, 6],
                'Online_Prescriptions': df.iloc[i, 10],
                'Offline_Prescriptions': df.iloc[i, 12],
                'Total_Prescriptions': df.iloc[i, 14],
                'Total_Referral_Online': df.iloc[i, 22],
                'Total_Referral_Offline': df.iloc[i, 30],
                'Total_Referral': df.iloc[i, 32],
                'Total_Certificate_Online': df.iloc[i, 38],
                'Total_Certificate_Offline': df.iloc[i, 44],
                'Total_Certificates': df.iloc[i, 46],
                'Old_Claim_File': df.iloc[i, 54],
                'New_Claims': df.iloc[i, 56],
                'Referred_to_AMO': df.iloc[i, 58],
                'Pending_Claims': df.iloc[i, 60],
                'Camp_Footfall': df.iloc[i, 65],
                'New_IP_Camp': df.iloc[i, 67],
                'Total_OPD': df.iloc[i, 69]
            }
            data_rows.append(row_data)
    
    return pd.DataFrame(data_rows)

# Clean all monthly data
clean_data = {}
months = ['August', 'July', 'June', 'May', 'April']

for month in months:
    clean_data[month] = clean_dispensary_data(dispensary_data[month])
    print(f"{month}: {len(clean_data[month])} records")

# Show August data structure
print("\nAugust clean data:")
print(clean_data['August'].head())
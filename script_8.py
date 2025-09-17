# Check hospital data structure
print("Hospital June 2025 data structure:")
print(hospital_june.head(15))
print(f"\nColumns: {list(hospital_june.columns)}")
print(f"Shape: {hospital_june.shape}")

# Let's also check the raw hospital data to understand format
print("\nFirst 10 rows of hospital data:")
for i in range(min(10, len(hospital_june))):
    print(f"Row {i}: {hospital_june.iloc[i].tolist()}")
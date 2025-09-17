# Analyze Hospital Dhanwantari data
hospital_june = pd.read_excel('Hospital-Dhanwantari-adoption.xlsx', sheet_name='June,2025')
hospital_may = pd.read_excel('Hospital-Dhanwantari-adoption.xlsx', sheet_name='May,2025')
hospital_april = pd.read_excel('Hospital-Dhanwantari-adoption.xlsx', sheet_name='April,2025')

print("=== DHANWANTARI HOSPITAL ANALYSIS ===\n")

# Clean June data (latest available)
print("JUNE 2025 - DHANWANTARI HOSPITAL DEPARTMENT-WISE PERFORMANCE:")
print(hospital_june.to_string(index=False))
print()

# Extract key metrics from June data
june_departments = []
for i, row in hospital_june.iterrows():
    if pd.notna(row.iloc[2]) and 'Dr.' in str(row.iloc[2]):  # Department with doctor name
        dept_name = str(row.iloc[2])
        checkin = row.iloc[3] if pd.notna(row.iloc[3]) else 0
        prescriptions = row.iloc[4] if pd.notna(row.iloc[4]) else 0
        diagnoses = row.iloc[6] if pd.notna(row.iloc[6]) else 0
        referrals = row.iloc[7] if pd.notna(row.iloc[7]) else 0
        investigations = row.iloc[8] if pd.notna(row.iloc[8]) else 0
        interventions = row.iloc[9] if pd.notna(row.iloc[9]) else 0
        
        june_departments.append({
            'Department': dept_name,
            'Check_In': float(checkin) if checkin != '' else 0,
            'Online_Prescriptions': float(prescriptions) if prescriptions != '' else 0,
            'Diagnoses': float(diagnoses) if diagnoses != '' else 0,
            'Referrals': float(referrals) if referrals != '' else 0,
            'Investigations': float(investigations) if investigations != '' else 0,
            'Interventions': float(interventions) if interventions != '' else 0
        })

hospital_df = pd.DataFrame(june_departments)
print("\nJUNE 2025 - CLEANED HOSPITAL DATA:")
print(hospital_df)

# Calculate totals
total_hospital_checkins = hospital_df['Check_In'].sum()
total_hospital_prescriptions = hospital_df['Online_Prescriptions'].sum()
total_hospital_interventions = hospital_df['Interventions'].sum()

print(f"\n🏥 DHANWANTARI HOSPITAL - JUNE 2025 TOTALS:")
print(f"   👥 Total Check-ins: {total_hospital_checkins:,.0f}")
print(f"   💊 Total Prescriptions: {total_hospital_prescriptions:,.0f}")
print(f"   🔬 Total Interventions/Surgeries: {total_hospital_interventions:,.0f}")
print(f"   🩺 Active Departments: {len(hospital_df)}")

# Top departments by patient volume
print(f"\n🏆 TOP HOSPITAL DEPARTMENTS BY PATIENT VOLUME (JUNE 2025):")
top_hospital_depts = hospital_df.nlargest(5, 'Check_In')[['Department', 'Check_In', 'Interventions']]
print(top_hospital_depts.to_string(index=False))
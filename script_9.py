# Extract hospital department data properly
hospital_departments = []

for i in range(3, len(hospital_june)):  # Start from row 3 where actual data begins
    dept_name = hospital_june.iloc[i, 3]  # Column 3 has department names
    if pd.notna(dept_name) and dept_name != 'Departments  ':
        checkin = hospital_june.iloc[i, 4] if pd.notna(hospital_june.iloc[i, 4]) else 0
        prescriptions = hospital_june.iloc[i, 5] if pd.notna(hospital_june.iloc[i, 5]) else 0
        diagnoses = hospital_june.iloc[i, 7] if pd.notna(hospital_june.iloc[i, 7]) else 0
        referrals = hospital_june.iloc[i, 8] if pd.notna(hospital_june.iloc[i, 8]) else 0
        investigations = hospital_june.iloc[i, 9] if pd.notna(hospital_june.iloc[i, 9]) else 0
        interventions = hospital_june.iloc[i, 10] if pd.notna(hospital_june.iloc[i, 10]) else 0
        
        # Clean the prescription data (handle cases like "239(112)")
        if isinstance(prescriptions, str) and '(' in str(prescriptions):
            prescriptions = str(prescriptions).split('(')[0]
        
        try:
            checkin = float(checkin) if checkin != '' else 0
            prescriptions = float(prescriptions) if prescriptions != '' else 0
            diagnoses = float(diagnoses) if diagnoses != '' else 0
            referrals = float(referrals) if referrals != '' else 0
            investigations = float(investigations) if investigations != '' else 0
            interventions = float(interventions) if interventions != '' else 0
        except:
            continue
            
        hospital_departments.append({
            'Department': dept_name,
            'Check_In': checkin,
            'Online_Prescriptions': prescriptions,
            'Diagnoses': diagnoses,
            'Referrals': referrals,
            'Investigations': investigations,
            'Interventions': interventions
        })

hospital_df = pd.DataFrame(hospital_departments)
print("=== DHANWANTARI HOSPITAL - JUNE 2025 DEPARTMENT ANALYSIS ===\n")
print(hospital_df.round(0))

# Calculate totals
total_hospital_checkins = hospital_df['Check_In'].sum()
total_hospital_prescriptions = hospital_df['Online_Prescriptions'].sum()
total_hospital_interventions = hospital_df['Interventions'].sum()
total_diagnoses = hospital_df['Diagnoses'].sum()

print(f"\n🏥 DHANWANTARI HOSPITAL - JUNE 2025 TOTALS:")
print(f"   👥 Total Check-ins: {total_hospital_checkins:,.0f}")
print(f"   💊 Total Online Prescriptions: {total_hospital_prescriptions:,.0f}")
print(f"   🩺 Total Diagnoses: {total_diagnoses:,.0f}")
print(f"   🔬 Total Interventions/Surgeries: {total_hospital_interventions:,.0f}")
print(f"   🏥 Active Departments: {len(hospital_df)}")

# Top departments by patient volume
print(f"\n🏆 TOP HOSPITAL DEPARTMENTS BY PATIENT VOLUME (JUNE 2025):")
top_hospital_depts = hospital_df.nlargest(5, 'Check_In')[['Department', 'Check_In', 'Interventions']]
print(top_hospital_depts.to_string(index=False))

# Create summary data for dashboard
print(f"\n📋 DEPARTMENT SPECIALIZATION INSIGHTS:")
specialized_services = hospital_df[hospital_df['Interventions'] > 50][['Department', 'Check_In', 'Interventions']]
print(specialized_services.to_string(index=False))
# Clean numeric data and create monthly summaries
def clean_numeric(value):
    if pd.isna(value) or value == '#VALUE!' or value == 'nan':
        return 0
    try:
        return float(value)
    except:
        return 0

# Create monthly summaries for dashboard
monthly_summaries = {}

for month, data in clean_data.items():
    # Filter for monthly records only
    monthly_data = data[data['Type'] == 'Monthly'].copy()
    
    # Clean numeric columns
    numeric_cols = ['New_IP_Registration', 'Check_In_Generation', 'Total_Footfall', 
                   'Online_Prescriptions', 'Offline_Prescriptions', 'Total_Prescriptions',
                   'Total_Referral_Online', 'Total_Referral_Offline', 'Total_Referral',
                   'Total_Certificate_Online', 'Total_Certificate_Offline', 'Total_Certificates',
                   'Old_Claim_File', 'New_Claims', 'Referred_to_AMO', 'Pending_Claims',
                   'Camp_Footfall', 'New_IP_Camp', 'Total_OPD']
    
    for col in numeric_cols:
        monthly_data[col] = monthly_data[col].apply(clean_numeric)
    
    # Calculate totals for this month
    total_footfall = monthly_data['Total_Footfall'].sum()
    total_prescriptions = monthly_data['Total_Prescriptions'].sum()
    total_referrals = monthly_data['Total_Referral'].sum()
    total_certificates = monthly_data['Total_Certificates'].sum()
    total_new_registrations = monthly_data['New_IP_Registration'].sum()
    total_claims = monthly_data['New_Claims'].sum()
    
    # Top performing dispensaries
    top_performers = monthly_data.nlargest(5, 'Total_Footfall')[['Dispensary_Name', 'Total_Footfall', 'Total_Prescriptions', 'Total_Referral', 'Total_Certificates']]
    
    monthly_summaries[month] = {
        'total_footfall': total_footfall,
        'total_prescriptions': total_prescriptions,
        'total_referrals': total_referrals,
        'total_certificates': total_certificates,
        'total_new_registrations': total_new_registrations,
        'total_claims': total_claims,
        'dispensary_count': len(monthly_data),
        'top_performers': top_performers,
        'data': monthly_data
    }

# Display key insights
print("=== ESIC PUNE HEALTHCARE NETWORK - KEY PERFORMANCE INSIGHTS ===\n")

for month, summary in monthly_summaries.items():
    print(f"📊 {month.upper()} 2025 SUMMARY:")
    print(f"   🏥 Active Dispensaries: {summary['dispensary_count']}")
    print(f"   👥 Total Footfall: {summary['total_footfall']:,.0f}")
    print(f"   💊 Total Prescriptions: {summary['total_prescriptions']:,.0f}")
    print(f"   🔄 Total Referrals: {summary['total_referrals']:,.0f}")
    print(f"   📋 Total Certificates: {summary['total_certificates']:,.0f}")
    print(f"   📝 New Registrations: {summary['total_new_registrations']:,.0f}")
    print(f"   💰 New Claims: {summary['total_claims']:,.0f}")
    print()

# Latest month (August) detailed analysis
aug_data = monthly_summaries['August']
print("🎯 AUGUST 2025 - TOP PERFORMING DISPENSARIES:")
print(aug_data['top_performers'].to_string(index=False))
print()
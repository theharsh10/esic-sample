import plotly.graph_objects as go
import plotly.express as px

# Data from the provided JSON
months = ["April", "May", "June", "July", "August"]
total_footfall = [16178, 23150, 24832, 29486, 28775]
total_prescriptions = [9330, 11425, 13464, 18207, 17749]
total_referrals = [2485, 2505, 2845, 3430, 3128]
total_certificates = [2078, 2089, 2047, 2503, 2300]

# Brand colors in order
colors = ['#1FB8CD', '#DB4545', '#2E8B57', '#5D878F']

# Create the line chart
fig = go.Figure()

# Add each line with abbreviated names (under 15 characters)
fig.add_trace(go.Scatter(x=months, y=total_footfall, mode='lines+markers', 
                         name='Total Footfall', line=dict(color=colors[0], width=3),
                         marker=dict(size=8)))

fig.add_trace(go.Scatter(x=months, y=total_prescriptions, mode='lines+markers', 
                         name='Prescriptions', line=dict(color=colors[1], width=3),
                         marker=dict(size=8)))

fig.add_trace(go.Scatter(x=months, y=total_referrals, mode='lines+markers', 
                         name='Referrals', line=dict(color=colors[2], width=3),
                         marker=dict(size=8)))

fig.add_trace(go.Scatter(x=months, y=total_certificates, mode='lines+markers', 
                         name='Certificates', line=dict(color=colors[3], width=3),
                         marker=dict(size=8)))

# Update layout with shortened title (under 40 characters)
fig.update_layout(
    title='ESIC Pune Monthly Performance',
    xaxis_title='Month',
    yaxis_title='Count',
    uniformtext_minsize=14, 
    uniformtext_mode='hide'
)

# Format y-axis to show numbers in thousands
fig.update_yaxes(tickformat='.0f')

# Add cliponaxis=False for line charts
fig.update_traces(cliponaxis=False)

# Save the chart
fig.write_image('esic_pune_trends.png')
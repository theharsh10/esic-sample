import plotly.express as px
import plotly.graph_objects as go
import pandas as pd

# Data from the provided JSON
departments = ["General Medicine (Dr. Dhage)", "Orthopaedics (Dr. Pallavi)", "Ayurveda (Dr. Sutar)", 
               "Eye (Ophthalmology)", "ENT (Dr. Rupalee)", "Gynaecology (Dr. Jadhav)", "Paediatrics (Dr. Giri)"]
checkins = [3686, 1922, 628, 433, 378, 358, 264]

# Abbreviate department names to 15 characters max
dept_abbrev = ["Gen Medicine", "Orthopedics", "Ayurveda", "Eye", "ENT", "Gynecology", "Pediatrics"]

# Create DataFrame
df = pd.DataFrame({
    'Department': dept_abbrev,
    'Checkins': checkins
})

# Sort by checkins descending for better visualization
df = df.sort_values('Checkins', ascending=True)  # ascending=True for horizontal bars to show highest at top

# Create horizontal bar chart
fig = go.Figure(data=go.Bar(
    y=df['Department'],
    x=df['Checkins'],
    orientation='h',
    marker=dict(color='#2E8B57')  # Sea green color for medical theme
))

# Update layout
fig.update_layout(
    title="Dhanwantari Dept Utilization (Jun 2025)",  # Shortened to under 40 chars
    xaxis_title="Check-ins",
    yaxis_title="Department"
)

# Update traces
fig.update_traces(cliponaxis=False)

# Format x-axis to show values in thousands
fig.update_xaxes(tickformat=".0f")

# Add hover template with abbreviated numbers
fig.update_traces(
    hovertemplate="<b>%{y}</b><br>Check-ins: %{x:,.0f}<extra></extra>"
)

# Save the chart
fig.write_image("hospital_department_utilization.png")
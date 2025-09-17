import plotly.graph_objects as go
import pandas as pd

# Data from the provided JSON
dispensary_names = ["Chinchwad", "Sanaswadi", "Chakan", "Talegaon", "Baramati", "Khed Shivapur", "Hadapsar", "Kurkumbh", "Uruli Kanchan", "Bhosari"]
footfall = [4177, 2790, 2439, 2376, 1735, 1949, 1638, 1441, 1127, 1251]

# Create DataFrame and sort by footfall in descending order
df = pd.DataFrame({'dispensary': dispensary_names, 'footfall': footfall})
df = df.sort_values('footfall', ascending=True)  # ascending=True for horizontal bar chart

# Format footfall numbers with 'k' for thousands
formatted_footfall = [f"{x/1000:.1f}k" for x in df['footfall']]

# Create horizontal bar chart
fig = go.Figure()

fig.add_trace(go.Bar(
    x=df['footfall'],
    y=df['dispensary'],
    orientation='h',
    marker_color='#1FB8CD',
    text=formatted_footfall,
    textposition='outside',
    cliponaxis=False
))

# Update layout
fig.update_layout(
    title="Top 10 ESIC Dispensaries - Aug 2025",
    xaxis_title="Patients",
    yaxis_title="Dispensary"
)

# Format x-axis to show values in thousands
fig.update_xaxes(
    tickformat='.0f',
    ticksuffix='',
    showgrid=True
)

fig.update_yaxes(
    showgrid=False
)

# Save the chart
fig.write_image("dispensary_footfall_chart.png")
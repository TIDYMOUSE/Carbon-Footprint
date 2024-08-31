# Coal Mine Carbon Footprint Web Application

## Problem Description

### Background

India faces a complex challenge in balancing its reliance on coal for energy with its climate change commitments. Coal mining is a major source of carbon emissions, a greenhouse gas contributing to global warming. To achieve carbon neutrality, the Indian coal sector needs to offset its emissions. This can be achieved through a combination of strategies such as reducing emissions from mining activities, adopting cleaner technologies, and offsetting remaining emissions by planting trees that absorb carbon dioxide.

A web-based application can be a powerful tool in this journey by helping quantify a mine's carbon footprint and evaluate potential pathways to carbon neutrality.

### Objectives

The web-based application has the following objectives:

1. **Activity-wise Quantification of Carbon Emission**: Quantify carbon emissions from various activities in coal mines.
2. **Estimation of Existing Carbon Sinks**: Evaluate the current carbon absorption capacity of natural sinks.
3. **Gap Analysis and Pathway Suggestions**: Analyze the gap between carbon emissions and sinks, and suggest pathways to achieve carbon neutrality.

### Expected Solution

A comprehensive software solution that includes:

- **Emission Estimation**:

  - Allow users to input data on various mining activities (e.g., excavation, transportation, equipment usage) and estimate the associated carbon emissions based on established emission factors.
  - Estimate per capita emissions of a mine.

- **Carbon Neutrality Pathways**:

  - Provide features for simulating different emission reduction strategies such as:
    - Clean technologies: Assess the impact of adopting electric vehicles, methane capture systems, and renewable energy sources for mine operations.
    - Afforestation offsets: Calculate the amount of land required for tree plantation to offset remaining emissions based on state-specific afforestation plans.
    - Other Renewables: Explore alternative energy sources to reduce direct electricity consumption.
    - Carbon Credits: Estimate potential carbon credits earned as per present market rates.

- **Data Visualization**:

  - Present results visually using charts and graphs to track emission trends and the effectiveness of implemented strategies.

### Benefits

- **Sustainability Goals**: Aid Indian coal mines in their journey towards carbon neutrality and support the country's overall climate goals.
- **Transparency**: Provide a clear picture of a mine's carbon footprint.
- **Decision Support**: Help mine operators make informed choices for emission reduction.
- **Cost Savings**: Identify opportunities to optimize operations and potentially reduce costs associated with emissions.

---

## Implementation Details

### Implemented Features

- **CO2 Emission Calculation**: Allows users to calculate CO2 emissions based on mining activities and equipment usage.
- **Afforestation Calculation**: Calculates the required land area for tree plantations to offset emissions.
- **Energy Savings Estimation**: Estimates energy savings by switching from petrol-powered to electric-powered equipment and vehicles.
- **Admin Page**: A dedicated admin page for managing user inputs, monitoring calculations, and handling application settings.

### To-Do Features

- [x] **Data Visualization**: Develop charts and graphs to present emission trends and reduction strategies.
- [] **Carbon Neutrality Pathways Simulation**: Implement features for simulating different emission reduction strategies, such as:
  - [x] Adoption of clean technologies (electric vehicles, methane capture).
  - [x] State-specific afforestation offsets.
  - [ ] Exploring alternative renewable energy options.
- [ ] **Carbon Credits Calculation**: Estimate potential carbon credits based on current market rates.
- [x] **User Authentication**: Integrate Firebase authentication for secure access to the app.
- [x] **Database Integration**: Use Firebase for data storage and retrieval.

---

## Tech Stack

- **Frontend**: React
- **Backend**: Firebase
- **Database**: Firebase Realtime Database / Firestore

---

## Team Information

- **Team Name**: AI-HTML
- **Team Members**:
  - Advait Yadav
  - Mrudul Pawar
  - Shreyash Borde
  - Vinit Gaikwad
  - Raj Sapale
  - Pranjali Narote

---

## SETUP

1. **Setting up repo**
   ```base
   git clone https://github.com/TIDYMOUSE/carbon-footprint
   npm install
   ```
2. **Running on Local machine**:
   ```bash
   npm start
   ```

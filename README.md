 B2B SaaS Revenue Pipeline Analysis & Onboarding Automation

An end-to-end RevOps portfolio project demonstrating data cleaning (ETL), financial modelling (Excel), operational process mapping (onboarding and billing), and leadership presentation (PowerPoint) using simulated SaaS CRM data.

 Project Overview

This project simulates a real-world B2B SaaS quote-to-provisioning pipeline, diagnosing inefficiencies and proposing structured automation. It consists of the following key pillars:
1. Dirty CRM Data Generation: A Python script simulating a 12-week CRM log with data quality issues (missing values, inconsistent formats, duplicate entries, out-of-order logs, and incorrect MRR inputs).
2. ETL & Financial Modelling (Excel): A data-cleaning pipeline that takes the raw CRM data and outputs a polished, formula-driven Excel sheet (`revenue_pipeline_tracker.xlsx`) containing dynamic weekly metrics, funnel velocity, and segment analytics.
3.   Operational Process Mapping: Mapped onboarding and billing workflows across Sales, Finance, and Operations, identifying   3 critical gaps   where manual processes introduced a 6.3-day time-to-value lag. Mapped a future-state automation saving ~30% of manual overhead .
4.   Leadership Deck (PowerPoint): A programmatically generated 16:9 widescreen PowerPoint deck summarising findings and proposing the automation ROI for executive approval.
5.   Interactive Portfolio Web Page: A beautiful, dark/light theme web dashboard (`index.html`) featuring interactive Chart.js visualisations, workflow tabs, an interactive slide deck viewer, and a download hub.

Directory Structure

internship/
├── data/
│   └── raw_crm_export.csv             # 565 rows of messy simulated CRM entries
├── scripts/
│   ├── generate_raw_data.py           # Simulates raw CRM dataset with quality flaws
│   ├── process_pipeline.py            # Cleans data and outputs formatted Excel report
│   └── generate_presentation.py       # Programmatically creates PPTX deck
├── workflows/
│   ├── gap_analysis.md                # Details 3 manual process gaps & current state
│   └── revised_sop.md                 # Revised automated SOP & future state
├── reports/
│   ├── cleaning_stats.json            # ETL metrics logged during processing
│   ├── revenue_pipeline_tracker.xlsx  # Polished Excel workbook with dynamic formulas
│   └── leadership_presentation.pptx   # Executive PowerPoint slide deck
├── index.html                         # Interactive Web Dashboard portfolio page
├── styles.css                         # Sleek, premium styling sheet
├── app.js                             # Tab navigation, Chart.js views, & deck viewer
└── README.md                          # Main project guide (this document)
```

---

 Running the Project Locally
1. Prerequisites
Ensure you have Python 3.8+ installed on your system. You will need to install the required libraries:
```bash
pip install pandas openpyxl python-pptx
```
 2. Running the Data Pipeline
Execute the scripts in order from the root folder:

```bash
# Step A: Generate the raw messy CRM data
python3 scripts/generate_raw_data.py

# Step B: Run ETL pipeline to clean data and create Excel report
python3 scripts/process_pipeline.py

# Step C: Generate PowerPoint slide deck
python3 scripts/generate_presentation.py
```

 3. Viewing the Web Dashboard Portfolio
Once the scripts complete, double-click `index.html` or open it in any web browser to view the interactive portfolio showcase. You can switch between light/dark themes, inspect charts, step through the slide deck, compare workflows, and download files directly!

---

 Data Cleansing & ETL Rules

The `scripts/process_pipeline.py` script enforces the following data audit rules:
-   Deduplication  : Rows with duplicate `Lead_ID`s are removed, keeping the first occurrence.
-   Contact Integrity  : Missing billing contact emails are generated dynamically based on company names.
-   Marketing Standardization  : Standardizes varied casings of Lead Sources (e.g. `google`, `google search`, `GOOGLE`) into clean tags.
-   Date Correction  : normalizes multiple date string schemas (`YYYY-MM-DD`, `DD/MM/YYYY`, `YYYY-MM-DD HH:MM:SS`) into clean date values.
-   Chronological Audits  : Verifies that `Trial_Date` is after `Lead_Date` and `Conversion_Date` is after `Trial_Date`. Out-of-order logs are corrected.
-   Revenue Valuation  : Corrects negative MRR values and zero values. Outlier MRR values (e.g. `999999`) are capped using median segment values.

---

 Operational Workflow Gaps Identified

1.   Gap 1: Sales-to-Finance Handshake (4.2-Day Processing Lag)  : Signed contracts are emailed as PDFs to Finance billing, leading to inbox processing bottlenecks.
2.   Gap 2: Double-Entry Profile Creation (~5.0% Data Error Rate)  : Finance manual copy-pasting customer details into Stripe billing. Mismatched formatting breaks financial audit trails.
3.   Gap 3: Siloed Onboarding Provisioning (2.1-Day Onboarding Lag)  : Access provisioning is delayed until Finance confirms bank transfer payments and messages Ops manually via Slack.

 Proposed Automation Solution
Configure Salesforce Opportunity triggers mapping directly to Stripe customer objects via iPaaS. Integrate Stripe payment completion webhooks directly into the application database APIs to automatically provision accounts and send welcome credentials instantly (reducing lag from 6.3 days to <2 minutes).

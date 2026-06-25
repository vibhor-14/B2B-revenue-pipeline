import csv
import random
from datetime import datetime, timedelta

# Set seed for reproducibility
random.seed(42)

def generate_data(num_records=550):
    company_suffixes = ["Inc", "Corp", "Group", "Solutions", "Technologies", "Co", "LLC", "Partners", "Global"]
    company_prefixes = ["Acme", "Apex", "Nova", "Vortex", "Sovereign", "Summit", "Quantum", "Synergy", "Beacon", "Stellar", "Core", "Flux", "Omega", "Helix", "Alpha", "Zenith", "Cloud", "Pulse", "Shift", "Bold"]
    
    segments = ["SMB", "Mid-Market", "Enterprise"]
    sources = ["Google", "google", "GOOGLE", "LinkedIn", "linkedin", "LinkedIn Ads", "Referral", "referral", "Cold Outreach", "cold outreach", "Webinar", "null", ""]
    
    start_date = datetime(2026, 3, 1)
    
    records = []
    
    # Generate valid records
    for i in range(1, num_records + 1):
        lead_id = f"LD-{1000 + i}"
        
        # Lead Date (spread over 12 weeks)
        days_offset = random.randint(0, 84)
        lead_dt = start_date + timedelta(days=days_offset)
        
        # Formats: 70% YYYY-MM-DD, 15% DD/MM/YYYY, 15% YYYY-MM-DD HH:MM:SS
        date_fmt_choice = random.random()
        if date_fmt_choice < 0.70:
            lead_date_str = lead_dt.strftime("%Y-%m-%d")
        elif date_fmt_choice < 0.85:
            lead_date_str = lead_dt.strftime("%d/%m/%Y")
        else:
            lead_date_str = (lead_dt + timedelta(hours=random.randint(9, 18), minutes=random.randint(0, 59))).strftime("%Y-%m-%d %H:%M:%S")
            
        company_name = f"{random.choice(company_prefixes)} {random.choice(company_suffixes)}"
        # Add random spaces occasionally
        if random.random() < 0.1:
            company_name = " " + company_name + "  "
            
        email = f"info@{company_name.lower().replace(' ', '')}.com"
        # 5% missing email
        if random.random() < 0.05:
            email = ""
            
        source = random.choice(sources)
        segment = random.choice(segments)
        
        # 65% become Trials
        has_trial = random.random() < 0.65
        trial_activated = "Yes" if has_trial else "No"
        trial_date_str = ""
        converted = "No"
        conversion_date_str = ""
        mrr = ""
        
        if has_trial:
            trial_dt = lead_dt + timedelta(days=random.randint(1, 10))
            
            # Match date format mix
            if date_fmt_choice < 0.70:
                trial_date_str = trial_dt.strftime("%Y-%m-%d")
            elif date_fmt_choice < 0.85:
                trial_date_str = trial_dt.strftime("%d/%m/%Y")
            else:
                trial_date_str = (trial_dt + timedelta(hours=random.randint(9, 18), minutes=random.randint(0, 59))).strftime("%Y-%m-%d %H:%M:%S")
                
            # 30% of Trials convert to Closed Won
            has_conversion = random.random() < 0.30
            if has_conversion:
                converted = "Yes"
                conv_dt = trial_dt + timedelta(days=random.randint(5, 20))
                
                if date_fmt_choice < 0.70:
                    conversion_date_str = conv_dt.strftime("%Y-%m-%d")
                elif date_fmt_choice < 0.85:
                    conversion_date_str = conv_dt.strftime("%d/%m/%Y")
                else:
                    conversion_date_str = (conv_dt + timedelta(hours=random.randint(9, 18), minutes=random.randint(0, 59))).strftime("%Y-%m-%d %H:%M:%S")
                
                # MRR by segment
                if segment == "SMB":
                    mrr = random.randint(100, 300)
                elif segment == "Mid-Market":
                    mrr = random.randint(500, 1500)
                else: # Enterprise
                    mrr = random.randint(3000, 8000)
                    
        records.append({
            "Lead_ID": lead_id,
            "Lead_Date": lead_date_str,
            "Company_Name": company_name,
            "Contact_Email": email,
            "Lead_Source": source,
            "Segment": segment,
            "Trial_Activated": trial_activated,
            "Trial_Date": trial_date_str,
            "Converted": converted,
            "Conversion_Date": conversion_date_str,
            "MRR": str(mrr)
        })
        
    # Introduce deliberate errors
    
    # 1. Duplicate leads (same Lead_ID and details, or slight variation)
    for i in range(15):
        dup_idx = random.randint(0, len(records) - 1)
        dup_record = records[dup_idx].copy()
        # Some are exact duplicates
        if i % 2 == 0:
            records.append(dup_record)
        else:
            # Some are duplicates with minor differences
            dup_record["Company_Name"] = dup_record["Company_Name"] + " (Duplicate Entry)"
            records.append(dup_record)
            
    # 2. Out-of-order dates: conversion before trial or trial before lead
    for i in range(5):
        # find a converted lead
        converted_leads = [r for r in records if r["Converted"] == "Yes"]
        if converted_leads:
            bad_lead = random.choice(converted_leads)
            # Make conversion date 5 days BEFORE lead date
            try:
                # Find standard parser
                lead_dt = None
                for fmt in ("%Y-%m-%d", "%d/%m/%Y", "%Y-%m-%d %H:%M:%S"):
                    try:
                        lead_dt = datetime.strptime(bad_lead["Lead_Date"], fmt)
                        break
                    except ValueError:
                        continue
                if lead_dt:
                    bad_conv_dt = lead_dt - timedelta(days=random.randint(3, 8))
                    bad_lead["Conversion_Date"] = bad_conv_dt.strftime("%Y-%m-%d")
            except Exception:
                pass
                
    # 3. Invalid negative / crazy MRR values
    for i in range(3):
        converted_leads = [r for r in records if r["Converted"] == "Yes"]
        if converted_leads:
            bad_lead = random.choice(converted_leads)
            if i == 0:
                bad_lead["MRR"] = "-1500" # Negative MRR
            elif i == 1:
                bad_lead["MRR"] = "999999" # Outlier MRR
            else:
                bad_lead["MRR"] = "0" # Zero MRR
                
    # Shuffle records to mimic messy logs
    random.shuffle(records)
    
    return records

def save_to_csv(records, filename="data/raw_crm_export.csv"):
    fields = [
        "Lead_ID", "Lead_Date", "Company_Name", "Contact_Email", 
        "Lead_Source", "Segment", "Trial_Activated", "Trial_Date", 
        "Converted", "Conversion_Date", "MRR"
    ]
    
    with open(filename, mode='w', newline='', encoding='utf-8') as f:
        writer = csv.DictWriter(f, fieldnames=fields)
        writer.writeheader()
        for record in records:
            writer.writerow(record)
            
    print(f"Successfully generated {len(records)} raw CRM rows in '{filename}'!")

if __name__ == "__main__":
    import os
    os.makedirs("data", exist_ok=True)
    records = generate_data()
    save_to_csv(records)

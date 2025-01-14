import csv
import random
from datetime import datetime, timedelta

# Expanded list of countries from around the world
countries = [
    "Afghanistan", "India", "Pakistan", "Iran", "Uzbekistan", "Tajikistan",
    "Russia", "China", "United States", "Germany", "France", "Brazil", "Italy",
    "Spain", "Japan", "Canada", "Australia", "South Africa", "Egypt",
    "Argentina", "Mexico", "Nigeria", "Kenya", "South Korea", "Indonesia",
    "Saudi Arabia", "Turkey", "Thailand", "Vietnam", "Philippines", "Colombia",
    "Chile", "Peru", "Malaysia", "Singapore", "New Zealand", "Sweden",
    "Norway", "Finland", "Denmark", "Iceland", "Greece", "Portugal",
    "Czech Republic", "Hungary", "Austria", "Switzerland", "Belgium", "Netherlands",
    "Ireland", "Russia", "Ukraine", "Romania", "Bulgaria", "Serbia",
    "Croatia", "Slovakia", "Slovenia", "Lithuania", "Latvia", "Estonia",
    "Moldova", "Belarus", "Kazakhstan", "Georgia", "Armenia", "Azerbaijan",
    "Bangladesh", "Sri Lanka", "Nepal", "Bhutan", "Maldives", "Afghanistan",
    "Cuba", "Dominican Republic", "Haiti", "Jamaica", "Trinidad and Tobago",
    "Barbados", "Bahamas", "Costa Rica", "Panama", "El Salvador", "Guatemala",
    "Nicaragua", "Uruguay", "Venezuela", "Bolivia", "Paraguay", "Ecuador",
    "Honduras", "Chile", "Syria", "Iraq", "Jordan", "Lebanon",
    "Oman", "Kuwait", "Qatar", "Bahrain", "United Arab Emirates", "Yemen",
    "Mongolia", "Kazakhstan", "Tajikistan", "Turkmenistan", "Kyrgyzstan",
    "Sierra Leone", "Ghana", "Ivory Coast", "Tanzania", "Uganda", "Rwanda",
    "Zambia", "Zimbabwe", "Botswana", "Namibia", "Angola", "Mozambique",
    "Malawi", "Cameroon", "Senegal", "Mali", "Niger", "Chad",
    "Central African Republic", "Congo", "Democratic Republic of the Congo",
    "South Sudan", "Sudan", "Lesotho", "Eswatini", "Seychelles", "Mauritius"
]

titles = [
    "President", "Prime Minister", "General Secretary", "Chancellor", "King",
    "Emperor", "Head of State", "Acting President"
]

# Function to generate random dates
def random_date(start, end):
    return start + timedelta(days=random.randint(0, (end - start).days))

# Create CSV file
with open('trip_data.csv', mode='w', newline='') as file:
    writer = csv.writer(file)
    
    # Write header
    writer.writerow([
        "TripID", "LeaderID", "LeaderCountry", "LeaderCountryISO", "LeaderR",
        "LeaderSt", "PriorityL", "LeaderRo", "LeaderTitle", "LeaderSurname",
        "LeaderFullName", "Exiled", "Country", "RegionVi", "SubRegic",
        "Disputed", "SemiAut", "TripYear", "TripStartDat", "TripEndDate"
    ])
    
    # Generate 1000 rows of data
    for i in range(1000):
        trip_id = f"{random.randint(100, 999)}-AFG-{random.choice(['SUN', 'IND', 'PAK', 'IRN', 'UZB', 'TJK'])}-{random.randint(33000, 99999)}"
        leader_id = random.randint(100, 2000)
        leader_country = random.choice(countries)  # Randomly select leader country
        leader_country_iso = "AFG"  # You can modify this to match the leader country if needed
        leader_r = "Asia"  # You can modify this based on the leader country
        leader_st = "Southern"  # You can modify this based on the leader country
        priority_l = random.choice(["Yes", "No"])
        leader_ro = random.choice(["De Facto", "S", "GS"])
        leader_title = random.choice(titles)
        leader_surname = random.choice(["Karzai", "Rabbani", "Najibullah", "Mojadedi"])
        leader_full_name = f"{leader_surname} {leader_surname}"
        exiled = random.randint(0, 1)
        country = random.choice(countries)
        
        # Determine region based on the selected country
        if country in ["Afghanistan", "India", "Pakistan", "Iran", "Uzbekistan", "Tajikistan"]:
            region_vi = "Asia"
            sub_regic = "Southern"
        elif country in ["United States", "Canada", "Brazil", "Argentina", "Mexico"]:
            region_vi = "America"
            sub_regic = "North/South"
        elif country in ["Germany", "France", "Italy", "Spain", "United Kingdom"]:
            region_vi = "Europe"
            sub_regic = "Western"
        elif country in ["Nigeria", "Kenya", "South Africa", "Egypt"]:
            region_vi = "Africa"
            sub_regic = "Northern/Southern"
        else:
            region_vi = "Other"
            sub_regic = "Other"

        disputed = random.choice(["No", "Yes"])
        semi_aut = random.choice(["No", "Yes"])
        trip_year = random.randint(1990, 2023)
        trip_start_date = random_date(datetime(trip_year, 1, 1), datetime(trip_year, 12, 31)).strftime("%m/%d/%Y")
        trip_end_date = random_date(datetime(trip_year, 1, 1), datetime(trip_year, 12, 31)).strftime("%m/%d/%Y")
        
        # Ensure end date is after start date
        if trip_start_date > trip_end_date:
            trip_start_date, trip_end_date = trip_end_date, trip_start_date
        
        # Write row
        writer.writerow([
            trip_id, leader_id, leader_country, leader_country_iso, leader_r,
            leader_st, priority_l, leader_ro, leader_title, leader_surname,
            leader_full_name, exiled, country, region_vi, sub_regic,
            disputed, semi_aut, trip_year, trip_start_date, trip_end_date
        ])

print("CSV file 'trip_data.csv' has been created with 1000 rows.")


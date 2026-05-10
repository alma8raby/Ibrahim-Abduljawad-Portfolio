
# SQL Analysis & Live Database Access

To support scalable analysis and collaborative experimentation, the project database was deployed online using Supabase PostgreSQL.

This setup allows team members and external users to:

- Access the datasets remotely
- Run SQL queries directly on the live database
- Connect using Power BI, Python, or PostgreSQL tools
- Reproduce the analytical results used in the dashboard and presentation

The SQL workflow was organized into modular query files for better readability, maintenance, and experimentation.

---

# 📂 SQL Queries Structure

## `initialization.sql`

Contains:

- Table creation queries for:
  - `global_data`
  - `egypt_data`
- Initial checks to verify successful CSV import into Supabase

---

## `validation.sql`

Contains data validation queries used before analysis, including:

- Missing values checks
- Range validation
- Category consistency validation
- Duplicate ID checks
- Logical consistency checks

These validations were performed to ensure the datasets were reliable before generating insights and visualizations.

---

## `global_analysis.sql`

Contains all SQL analysis queries related to the Global Dataset, including:

- KPI calculations
- Screen time analysis
- Social media usage analysis
- Wellbeing analysis
- Sleep risk analysis
- Mood stability analysis

The queries were designed to answer the core behavioral questions explored in the dashboard.

---

## `egypt_analysis.sql`

Contains all SQL analysis queries related to the Egypt Survey Dataset, including:

- Morning phone usage analysis
- Most used apps analysis
- Content format risk analysis
- Sleep and social media behavior analysis
- Irritability and doomscrolling analysis

The analysis focuses on identifying behavioral patterns specific to Egyptian Gen Z users.

---

# 🌐 Live Data Access & Experimentation

The project database is hosted online using **Supabase PostgreSQL** to make the datasets easy to access, query, and reuse.

This setup allows anyone from the team, or anyone reviewing the project, to access the live data and experiment with it using:

- Power BI
- Python
- pgAdmin / DBeaver

---

# 1. Power BI Live Connection

Power BI can connect to the live Supabase data using the REST API.

## Global Dataset API

```text
https://fzjzfclrgoqdhrskekyp.supabase.co/rest/v1/global_data
````

## Egypt Survey Dataset API

```text
https://fzjzfclrgoqdhrskekyp.supabase.co/rest/v1/egypt_data
```

## API Key

```text
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ6anpmY2xyZ29xZGhyc2tla3lwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc2Mzc3NjAsImV4cCI6MjA5MzIxMzc2MH0.rTyRL9xzfQ7exKN8tQF-WYqSJclw--cXNfw6Pjzapp0
```

## Steps

1. Open Power BI Desktop
2. Go to **Get Data**
3. Choose **Web**
4. Select **Advanced**
5. Add the API URL
6. Add the required headers:

```text
apikey: YOUR_ANON_KEY
Authorization: Bearer YOUR_ANON_KEY
```

7. Replace `YOUR_ANON_KEY` with the API key above
8. Load the returned JSON data
9. Convert the result into a table using Power Query
10. Start building visuals and dashboards

## Example

```text
https://fzjzfclrgoqdhrskekyp.supabase.co/rest/v1/global_data?limit=100
```

## Purpose

This allows the dashboard to connect to online data instead of depending only on local CSV files.

---

# 2. Python API Analysis

The live dataset can also be accessed using Python for analysis, EDA, and testing new insights.

## Requirements

```bash
pip install requests pandas
```

## Python Example

```python
import requests
import pandas as pd

url = "https://fzjzfclrgoqdhrskekyp.supabase.co/rest/v1/global_data?limit=100"

headers = {
    "apikey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ6anpmY2xyZ29xZGhyc2tla3lwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc2Mzc3NjAsImV4cCI6MjA5MzIxMzc2MH0.rTyRL9xzfQ7exKN8tQF-WYqSJclw--cXNfw6Pjzapp0",

    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ6anpmY2xyZ29xZGhyc2tla3lwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc2Mzc3NjAsImV4cCI6MjA5MzIxMzc2MH0.rTyRL9xzfQ7exKN8tQF-WYqSJclw--cXNfw6Pjzapp0"
}

response = requests.get(url, headers=headers)

data = response.json()

df = pd.DataFrame(data)

print(df.head())
```

## Egypt Dataset Example

```python
import requests
import pandas as pd

url = "https://fzjzfclrgoqdhrskekyp.supabase.co/rest/v1/egypt_data?limit=100"

headers = {
    "apikey": "YOUR_ANON_KEY",
    "Authorization": "Bearer YOUR_ANON_KEY"
}

response = requests.get(url, headers=headers)

df = pd.DataFrame(response.json())

print(df.head())
```

## Example Filter

```python
url = "https://fzjzfclrgoqdhrskekyp.supabase.co/rest/v1/global_data?Sleep_Risk=eq.High&limit=50"
```

## Purpose

Python access allows users to:

* Load the live dataset
* Perform exploratory data analysis
* Create charts
* Test new analysis ideas
* Reuse the data without downloading CSV files

---

# 3. pgAdmin / PostgreSQL Connection

Users can also connect directly to the live PostgreSQL database using pgAdmin, DBeaver, or any PostgreSQL-compatible DBMS.

This method is useful for anyone who wants to write SQL queries directly on the hosted database.

## Connection Settings

```text
Host: aws-0-eu-west-1.pooler.supabase.com
Port: 5432
Database: postgres
Username: data_viewer.fzjzfclrgoqdhrskekyp
Password: 12345678
SSL Mode: Require
```

## pgAdmin Steps

1. Open pgAdmin
2. Right-click on **Servers**
3. Choose **Register → Server**
4. In the **General** tab, set a server name:

```text
GenZ Mental Health DB
```

5. Open the **Connection** tab
6. Add the connection settings above
7. Open the **SSL** tab
8. Set:

```text
SSL Mode: Require
```

9. Click **Save**
10. Open **Query Tool**

## Test Query

```sql
select *
from public.global_data
limit 10;
```

## Egypt Data Test Query

```sql
select *
from public.egypt_data
limit 10;
```

## Example Analysis Query

```sql
select
    "SM_Usage",
    round(avg("Wellbeing_Index"), 2) as avg_wellbeing
from public.global_data
group by "SM_Usage"
order by avg_wellbeing desc;
```

## Purpose

This allows users to:

* Write SQL queries directly
* Explore the database schema
* Test joins and aggregations
* Reproduce the dashboard analysis
* Practice PostgreSQL on a live dataset

---

# ⚠️ Security Note

The shared database user is a **read-only user**.

It can:

* Read tables
* Run SELECT queries
* Explore the data

It cannot:

* Insert data
* Update records
* Delete records
* Drop tables

This makes the database safe for public exploration and team collaboration.

---

# 📝 Notes

* The queries are written specifically for the Supabase PostgreSQL structure used in this project.
* Columns containing spaces or capital letters are wrapped in double quotes.
* Each query includes a short description explaining:

  * its purpose
  * analytical objective
  * expected insight

```
```

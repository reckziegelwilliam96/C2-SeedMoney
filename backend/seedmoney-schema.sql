-- Creating the users table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(50),
  last_name VARCHAR(50),
  password VARCHAR(256),
  email VARCHAR(100)
);

-- Creating the businesses table
CREATE TABLE businesses (
  id SERIAL PRIMARY KEY,
  business_name VARCHAR(100),
  business_address VARCHAR(200),
  tax_id VARCHAR(50),
  user_id INT REFERENCES users(id)
);

-- Creating the farms table
CREATE TABLE farms (
  id SERIAL PRIMARY KEY,
  size INT,
  years_of_experience INT,
  types_of_crops TEXT[],
  organic_certification BOOLEAN,
  sustainability_practices BOOLEAN,
  annual_farm_revenue INT,
  profitability INT,
  farm_address VARCHAR(200),
  farm_city VARCHAR(100),
  farm_state VARCHAR(100),
  farm_zip_code VARCHAR(10),
  filing_status VARCHAR(100),
  tax_forms_filed TEXT[],
  previous_application BOOLEAN,
  grant_outcome BOOLEAN,
  business_id INT REFERENCES businesses(id)
);

-- Creating the programs table
CREATE TABLE programs (
  id SERIAL PRIMARY KEY,
  title TEXT,
  link TEXT,
  description TEXT
);

-- Creating the grants table
CREATE TABLE grants (
  id SERIAL PRIMARY KEY,
  grant_name TEXT,
  grant_link TEXT,
  grant_funds NUMERIC,
  application_window BOOLEAN,
  program_description TEXT,
  applicant_eligibility TEXT,
  eligible_area TEXT,
  use_of_funds TEXT,
  grant_terms TEXT,
  getting_started TEXT,
  contact_information TEXT,
  governing_law TEXT,
  program_id INT REFERENCES programs(id)
);

-- Creating the applications table
CREATE TABLE applications (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    grant_id INTEGER REFERENCES grants(id),
    farm_name VARCHAR(255),
    farm_size INTEGER,
    farm_location VARCHAR,
    farm_revenue NUMERIC,
    crops_grown TEXT[],
    animals_raised TEXT[],
    app_proposal VARCHAR(500),
    app_status VARCHAR(30) DEFAULT 'Pending Response',
    app_submission_date DATE DEFAULT CURRENT_DATE,
    app_response_date DATE
);

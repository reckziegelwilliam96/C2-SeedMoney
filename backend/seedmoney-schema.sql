-- Creating the users table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50),
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
  business_id INT REFERENCES businesses(id)
);



-- Creating the programs table
CREATE TABLE programs (
  id SERIAL PRIMARY KEY,
  title VARCHAR(100),
  link VARCHAR(200),
  description TEXT
);

-- Creating the grants table
CREATE TABLE grants (
  id SERIAL PRIMARY KEY,
  grant_name VARCHAR(100),
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
  userId VARCHAR(30),
  grantId INT REFERENCES grants(id),
  grant_response VARCHAR(500),
  application_status VARCHAR(30),
  application_submission_date DATE,
  application_response_date DATE
);


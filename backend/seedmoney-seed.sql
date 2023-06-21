-- -- Inserting data into the users table
-- INSERT INTO users (id, first_name, last_name, password, email)
-- VALUES 
-- (1, 'John', 'Smith', 'password123', 'john@email.com'),
-- (2, 'Jane', 'Doe', 'password456', 'jane@email.com');

-- -- Inserting data into the businesses table
-- INSERT INTO businesses (id, business_name, business_address, tax_id, user_id)
-- VALUES 
-- (1, 'John''s Farm', '123 John Street', '123456789', 1),
-- (2, 'Jane''s Farm', '456 Jane Avenue', '987654321', 2);

-- Inserting data into the programs table
INSERT INTO programs (title, link, description)
VALUES 
('Program 1', 'www.example.com/program1', 'Description for program 1'),
('Program 2', 'www.example.com/program2', 'Description for program 2');

-- Inserting data into the grants table
INSERT INTO grants (grant_name, application_window, program_description, applicant_eligibility, eligible_area, use_of_funds, grant_terms, getting_started, contact_information, governing_law, program_id)
VALUES 
('Grant 1', true, 'Description for grant 1', 'Eligibility for grant 1', 'Area 1', 'Use of funds for grant 1', 'Terms for grant 1', 'Getting started for grant 1', 'Contact for grant 1', 'Law 1', 1),
('Grant 2', false, 'Description for grant 2', 'Eligibility for grant 2', 'Area 2', 'Use of funds for grant 2', 'Terms for grant 2', 'Getting started for grant 2', 'Contact for grant 2', 'Law 2', 2),
('Grant 3', false, 'Description for grant 3', 'Eligibility for grant 3', 'Area 3', 'Use of funds for grant 3', 'Terms for grant 3', 'Getting started for grant 3', 'Contact for grant 3', 'Law 3', 2),
('Grant 1', true, 'Description for grant 1', 'Eligibility for grant 1', 'Area 1', 'Use of funds for grant 1', 'Terms for grant 1', 'Getting started for grant 1', 'Contact for grant 1', 'Law 1', 1),
('Grant 2', false, 'Description for grant 2', 'Eligibility for grant 2', 'Area 2', 'Use of funds for grant 2', 'Terms for grant 2', 'Getting started for grant 2', 'Contact for grant 2', 'Law 2', 2),
('Grant 3', false, 'Description for grant 3', 'Eligibility for grant 3', 'Area 3', 'Use of funds for grant 3', 'Terms for grant 3', 'Getting started for grant 3', 'Contact for grant 3', 'Law 3', 2);

-- -- Inserting data into the farms table
-- INSERT INTO farms 
-- (id, size, organic_certification, sustainability_practices, annual_farm_revenue, profitability, farm_address, farm_city, farm_state, farm_zip_code, filing_status, tax_forms_filed, previous_application, grant_outcome, years_of_experience, types_of_crops, business_id)
-- VALUES 
-- (1, 100, true, true, 10000, 2000, 'Farm Address 1', 'Farm City 1', 'Farm State 1', 'Zip 1', 'Single', ARRAY['1040'], false, true, 10, ARRAY['Wheat', 'Corn'], 1),
-- (2, 200, true, false, 20000, 5000, 'Farm Address 2', 'Farm City 2', 'Farm State 2', 'Zip 2', 'Married', ARRAY['1040', '1120'], true, false, 5, ARRAY['Corn', 'Soy'], 2);

-- -- Inserting data into the applications table
-- INSERT INTO applications (userId, grantId, grant_response, application_status, application_submission_date, application_response_date)
-- VALUES 
-- (1, 1, 'Response for application 1', 'Status 1', '2023-01-01', '2023-01-02'),
-- (2, 2, 'Response for application 2', 'Status 2', '2023-02-02', '2023-02-03');

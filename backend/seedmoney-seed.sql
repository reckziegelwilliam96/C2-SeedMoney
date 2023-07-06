INSERT INTO users (first_name, last_name, password, email)
VALUES
  ('John', 'Doe', 'password123', 'john@example.com'),
  ('Jane', 'Smith', 'password456', 'jane@example.com');

-- Insert fake records into the businesses table
INSERT INTO businesses (business_name, business_address, tax_id, user_id)
VALUES
  ('ABC Company', '123 Main St', '123456789', 1),
  ('XYZ Corp', '456 Elm St', '987654321', 2);

-- Insert fake records into the farms table
INSERT INTO farms (size, years_of_experience, types_of_crops, organic_certification, sustainability_practices, annual_farm_revenue, profitability, farm_address, farm_city, farm_state, farm_zip_code, filing_status, tax_forms_filed, previous_application, grant_outcome, business_id)
VALUES
  (100, 5, ARRAY['Wheat', 'Corn'], true, true, 50000, 4, '123 Farm Rd', 'Farmville', 'CA', '12345', 'Single', ARRAY['Form 1040'], true, true, 1),
  (200, 10, ARRAY['Potato', 'Carrot'], false, true, 80000, 3, '456 Farm St', 'Farmington', 'NY', '67890', 'Married', ARRAY['Form 1065'], true, false, 2);

-- Insert fake records into the programs table
INSERT INTO programs (title, link, description)
VALUES
  ('Renewable Energy Program', 'https://example.com/renewable-energy', 'Program supporting innovative renewable energy projects'),
  ('Youth Entrepreneurship Program', 'https://example.com/youth-entrepreneurship', 'Program providing resources and mentorship for young entrepreneurs'),
  ('Healthy Communities Program', 'https://example.com/healthy-communities', 'Program promoting community health and wellness initiatives'),
  ('Artistic Expression Program', 'https://example.com/artistic-expression', 'Program supporting creativity and artistic projects'),
  ('Cutting-Edge Science Program', 'https://example.com/cutting-edge-science', 'Program advancing groundbreaking scientific research'),
  ('Farm Sustainability Program', 'https://example.com/farm-sustainability', 'Program promoting sustainable farming practices'),
  ('Community Arts and Culture Program', 'https://example.com/community-arts-culture', 'Program fostering community-based arts and cultural initiatives'),
  ('Green Technology Research Program', 'https://example.com/green-technology-research', 'Program supporting research in green technologies'),
  ('Rural Development Program', 'https://example.com/rural-development', 'Program driving development in rural communities'),
  ('AgriTech Innovation Program', 'https://example.com/agritech-innovation', 'Program supporting innovation in agricultural technologies'),
  ('Community Food Security Program', 'https://example.com/community-food-security', 'Program promoting local food production and access');


-- Insert fake records into the grants table
INSERT INTO grants (grant_name, application_window, program_description, applicant_eligibility, eligible_area, use_of_funds, grant_terms, getting_started, contact_information, governing_law, program_id)
VALUES
  ('Renewable Energy Innovation Grant', true, 'Grant supporting innovative renewable energy projects', 'Open to individuals, businesses, and nonprofits', 'Nationwide', 'Funds can be used for research, development, and implementation of renewable energy technologies', 'Grant terms and conditions apply', 'Visit our website to get started', 'For more information, contact grants@example.com', 'Laws of the jurisdiction where the grant is offered', 1),
  ('Youth Entrepreneur Startup Grant', true, 'Grant providing seed funding for young entrepreneurs', 'Applicants must be between 18 and 25 years old', 'Local area within the state', 'Funds can be used for business setup costs and initial operations', 'Grant terms and conditions apply', 'Attend an information session to learn how to apply', 'For inquiries, contact youthgrantinfo@example.com', 'Laws of the jurisdiction where the grant is offered', 2),
  ('Healthy Communities Initiative Grant', true, 'Grant supporting community health and wellness programs', 'Open to nonprofits and community organizations', 'Specific neighborhoods and communities in need', 'Funds can be used for health education, fitness programs, and community outreach', 'Grant terms and conditions apply', 'Download the application package from our website', 'For assistance, call (555) 123-4567', 'Laws of the jurisdiction where the grant is offered', 3),
  ('Artistic Expression Project Grant', true, 'Grant supporting creative projects in various art forms', 'Open to individual artists and arts organizations', 'Nationwide', 'Funds can be used for project development, production, and exhibition', 'Grant terms and conditions apply', 'Submit your project proposal through our online portal', 'For questions, email artsgrants@example.com', 'Laws of the jurisdiction where the grant is offered', 4),
  ('Cutting-Edge Science Research Grant', true, 'Grant supporting groundbreaking scientific research', 'Open to scientists and research institutions', 'International', 'Funds can be used for equipment, lab expenses, and research activities', 'Grant terms and conditions apply', 'Submit your research proposal by the deadline', 'For further information, contact researchgrants@example.com', 'Laws of the jurisdiction where the grant is offered', 5),
  ('Farm Sustainability Grant', true, 'Grant promoting sustainable farming practices', 'Open to individual farmers and farm organizations', 'Local area within the state', 'Funds can be used for implementing eco-friendly farming techniques and infrastructure', 'Grant terms and conditions apply', 'Complete the application form and submit supporting documents', 'For inquiries, contact farmsustainability@example.com', 'Laws of the jurisdiction where the grant is offered', 3),
  ('Community Arts and Culture Grant', true, 'Grant supporting community-based arts and cultural initiatives', 'Open to nonprofits and community organizations', 'Specific neighborhoods and communities in need', 'Funds can be used for art workshops, cultural events, and public installations', 'Grant terms and conditions apply', 'Download the application package from our website', 'For assistance, call (555) 987-6543', 'Laws of the jurisdiction where the grant is offered', 4),
  ('Green Technology Research Grant', true, 'Grant supporting research in green technologies', 'Open to scientists, research institutions, and businesses', 'Nationwide', 'Funds can be used for conducting research on renewable energy and sustainable technologies', 'Grant terms and conditions apply', 'Submit your research proposal by the deadline', 'For further information, contact greentechgrants@example.com', 'Laws of the jurisdiction where the grant is offered', 1),
  ('Rural Development Grant', true, 'Grant supporting development in rural communities', 'Open to nonprofits, community organizations, and local governments', 'Rural areas within the state', 'Funds can be used for infrastructure, economic development, and community programs', 'Grant terms and conditions apply', 'Download the application package from our website', 'For assistance, call (555) 876-5432', 'Laws of the jurisdiction where the grant is offered', 3),
  ('AgriTech Innovation Grant', true, 'Grant supporting innovation in agricultural technologies', 'Open to individuals, startups, and companies in the agricultural sector', 'Nationwide', 'Funds can be used for research, development, and implementation of cutting-edge agricultural technologies', 'Grant terms and conditions apply', 'Submit your project proposal through our online portal', 'For questions, email agritechgrants@example.com', 'Laws of the jurisdiction where the grant is offered', 5),
  ('Community Food Security Grant', true, 'Grant supporting local food production and access', 'Open to nonprofits, community organizations, and local governments', 'Specific neighborhoods and communities in need', 'Funds can be used for community gardens, urban farms, and food distribution programs', 'Grant terms and conditions apply', 'Download the application package from our website', 'For assistance, call (555) 234-5678', 'Laws of the jurisdiction where the grant is offered', 3);

  -- Insert fake records into the applications table
INSERT INTO applications (user_id, grant_id, farm_name, farm_size, farm_location, farm_revenue, crops_grown, animals_raised, app_proposal, app_submission_date)
VALUES
  (1, 1, 'Green Acres Farm', 100, 'Farmville, CA', 75000, ARRAY['Corn', 'Soybeans'], ARRAY['Cattle'], 'We propose to expand our sustainable farming practices and invest in renewable energy systems.', '2023-06-15'),
  (2, 2, 'Harvest Moon Farm', 200, 'Farmington, NY', 90000, ARRAY['Vegetables', 'Fruits'], ARRAY['Sheep'], 'Our project aims to implement innovative water conservation techniques and enhance organic farming methods.', '2023-06-30');


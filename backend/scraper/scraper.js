const axios = require('axios');
const cheerio = require('cheerio');
const db = require('../db');
const Grant = require('../models/grant');
const Program = require('../models/program');

class Scraper {
    async scrapePrograms() {
      try {
        const { data } = await axios.get('https://www.rd.usda.gov/programs-services/all-programs');
        const $ = cheerio.load(data);
  
        const programPromises = [];
        $('.views-row').each(async (i, element) => {
          const programTitle = $(element).find('.desktop---grid-col-8 h4 a').text();
          const programLink = $(element).find('.desktop---grid-col-8 h4 a').attr('href');
          const programDescriptionElement = $(element).find('.grid-row').last();
          const programDescription = programDescriptionElement.text();
  
          // Debugging: Print program description for each program
          console.log('Program Description:', programDescription);
  
          // Process program description
          let descriptionText = programDescription.trim();
  
          // Remove leading "What does this program do?"
          if (descriptionText.startsWith('What does this program do?')) {
            descriptionText = descriptionText.replace('What does this program do?', '').trim();
          }
  
          // Remove empty lines or spaces at the beginning
          descriptionText = descriptionText.replace(/^\s+/, '');
  
          const programData = {
            title: programTitle,
            link: `https://www.rd.usda.gov${programLink}`,
            description: descriptionText
          };
  
          const newProgram = await Program.create(programData);
  
          const grantPromise = this.scrapeGrant(newProgram);
          programPromises.push(grantPromise);
        });
  
        await Promise.all(programPromises);
        console.log('Scraping completed successfully.');
  
      } catch (err) {
        console.error(err);
      }
    }

  async scrapeGrant(program) {
    try {
      const { data } = await axios.get(program.link);
      const $ = cheerio.load(data);

      const grantName = $('h1.page-title').text().trim();
      const applicationWindow = $('div.program-status').text().trim() === 'Open';
      const programDescription = $('div.field-content p:nth-child(2)').eq(0).text().trim();
      const applicantEligibility = $('div.field-content p:nth-child(2)').eq(1).text().trim();
      const eligibleArea = $('div.field-content p:nth-child(2)').eq(2).text().trim();
      const useOfFunds = $('div.field-content p:nth-child(2)').eq(3).text().trim();
      const grantTerms = $('div.field-content p:nth-child(2)').eq(4).text().trim();
      const gettingStarted = $('div.field-content p:nth-child(2)').eq(5).text().trim();
      const contactInformation = $('div.field-content p:nth-child(2)').eq(6).text().trim();
      const governingLaw = $('div.field-content p:nth-child(2)').eq(7).text().trim();

      const grantData = {
        grant_name: grantName,
        application_window: applicationWindow,
        program_description: programDescription,
        applicant_eligibility: applicantEligibility,
        eligible_area: eligibleArea,
        use_of_funds: useOfFunds,
        grant_terms: grantTerms,
        getting_started: gettingStarted,
        contact_information: contactInformation,
        governing_law: governingLaw,
        program_id: program.id
      };

      const newGrant = await Grant.create(grantData);

      const query = `
        INSERT INTO grants (grant_name, application_window, program_description, applicant_eligibility, eligible_area, use_of_funds, grant_terms, getting_started, contact_information, governing_law, program_id)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      `;
      const values = [
        newGrant.grant_name,
        newGrant.application_window,
        newGrant.program_description,
        newGrant.applicant_eligibility,
        newGrant.eligible_area,
        newGrant.use_of_funds,
        newGrant.grant_terms,
        newGrant.getting_started,
        newGrant.contact_information,
        newGrant.governing_law,
        program.id
      ];

      await db.query(query, values);

    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = new Scraper();

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

      const programPromises = Array.from($('.views-row')).map(async (element) => {
        const programData = this.extractProgramData($, element);
        const newProgram = await Program.create(programData);
        return this.scrapeGrant(newProgram);
      });

      await Promise.allSettled(programPromises);
      console.log('Scraping completed successfully.');

    } catch (err) {
      console.error(`Error scraping programs: ${err.message}`);
    }
  }

  extractProgramData($, element) {
    const programTitle = $(element).find('.desktop---grid-col-8 h4 a').text();
    const programLink = $(element).find('.desktop---grid-col-8 h4 a').attr('href');
    const programDescriptionElement = $(element).find('.grid-row').last();
    const programDescription = programDescriptionElement.text().trim().replace(/^What does this program do\?\s*/, '');

    // Validate program title
    if (!programTitle) {
      throw new Error('Program title not found');
    }

    return {
      title: programTitle,
      link: `https://www.rd.usda.gov${programLink}`,
      description: programDescription
    };
  }

  async scrapeGrant(program) {
    try {
      const { data } = await axios.get(program.link);
      const $ = cheerio.load(data);

      const grantData = this.extractGrantData($);
      grantData.program_id = program.id;

      console.log('Scraped grant data:', grantData);

      // Validate grant data
      if (!grantData.grant_name || !grantData.program_id) {
        throw new Error('Required grant data not found');
      }

      const newGrant = await Grant.create(grantData);

      console.log('Created grant data:', newGrant);

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
      console.error(`Error scraping grant: ${error.message}`);
    }
  }

  extractGrantData($) {
    const grantData = {};
    const mapping = {
      program_description: ['What does this program do?', 'Program Overview'],
      grant_funds: ['Program Funding:', 'Total Funding:'],
      applicant_eligibility: [
        'Who may apply for this program?',
        'Who may apply?',
        'What kind of borrower may the lender request a guarantee for?',
        'Are there additional requirements?',
        'Who may apply?',
        'Who may apply for these grants?',
      ],
      eligible_area: ['What is an eligible area?', 'What is the matching fund requirement?'],
      use_of_funds: [
        'How may funds be used?',
        'How may the funds be used?',
        'How can funds be used?',
        'How may grant funds be used?',
        'What may the revolving loan fund be used for?',
        'What are the revolving loan fund terms?',
      ],
      grant_terms: [
        'What are the loan terms?',
        'What are the terms of a loan guarantee?',
        'Who will service the loan?',
        'Who may live in the rental housing?',
        'Is there a list of qualified private lenders in my area?',
      ],
      getting_started: [
        'How do we get started?',
        'How do I get started?',
        'How do I get started?',
        'Before you apply:',
        'Forms and Resources:',
      ],
      contact_information: ['Who can answer questions?', 'Who can answer questions?'],
      governing_law: ['What law governs this program?', 'What governs this program?'],
    };
  
    const overviewElement = $('#overview');
    $('strong', overviewElement).each((i, element) => {
      const title = $(element).text().trim();
      if (mapping[title]) {
        const value = $(element).next('p').text().trim();
        grantData[mapping[title]] = value;
      }
    });
  
    grantData.grant_name = $('h1.page-title').text().trim();
    grantData.application_window = $('div.program-status').text().trim() === 'Open';
  
    return grantData;
  }
  
  
  
}

module.exports = new Scraper();


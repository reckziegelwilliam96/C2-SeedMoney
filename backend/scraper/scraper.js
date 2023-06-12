const axios = require('axios');
const cheerio = require('cheerio');
const Grant = require('../models/grant');
const Program = require('.program./models/program');

class Scraper {
    async scrapePrograms() {
        try {
            const { data } = await axios.get('https://www.rd.usda.gov/programs-services/all-programs');
            const $ = cheerio.load(data);

            const programPromises = [];
            $('.views-row').each(async (i, element) => {
                const programTitle = $(element).find('.desktop---grid-col-8 h4 a').text();
                const programLink = $(element).find('.desktop---grid-col-8 h4 a').attr('href');
                const programDescription = $(element).find('.grid-row').last().text();

                const programData = {
                    title: programTitle,
                    link: `https://www.rd.usda.gov${programLink}`,
                    description: programDescription
                };

                const newProgram = await Program.create(programData);

                const grantPromise = this.scrapeGrant(newProgram);
                programPromises.push(grantPromise);
            });

            await Promise.all(programPromises);
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
            // assume the text of other details are in the second <p> of their respective sections
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
                programDescription: programDescription,
                applicantEligibility: applicantEligibility,
                eligibleArea: eligibleArea,
                useOfFunds: useOfFunds,
                grantTerms: grantTerms,
                gettingStarted: gettingStarted,
                contactInformation: contactInformation,
                governingLaw: governingLaw,
                program_id: program.id
            };
    
            const newGrant = await Grant.create(grantData);
        } catch (error) {
            console.error(error);
        }
    }
}

module.exports = new Scraper();

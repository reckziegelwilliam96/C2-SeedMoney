const axios = require('axios');
const cheerio = require('cheerio');

async function scrapePrograms() {
  try {
    const { data } = await axios.get('https://www.rd.usda.gov/programs-services/all-programs');
    const $ = cheerio.load(data);

    const programLinks = Array.from($('.views-row')).map((element) => {
      return $(element).find('.desktop---grid-col-8 h4 a').attr('href');
    });

    for (const programLink of programLinks) {
      await scrapeProgram(`https://www.rd.usda.gov${programLink}`);
    }

  } catch (err) {
    console.error(`Error scraping programs: ${err.message}`);
  }
}

async function scrapeProgram(url) {
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    $('strong').each((i, element) => {
      console.log(`Title: ${$(element).text().trim()}`);
    });

  } catch (err) {
    console.error(`Error scraping program: ${err.message}`);
  }
}

scrapePrograms();
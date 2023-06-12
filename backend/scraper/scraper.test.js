const scraper = require('./scraper');
const db = require('../db');
const Program = require('./models/program');
const Grant = require('./models/grant');

describe('Test scraper', function() {
    beforeEach(async function() {
        await db.query('DELETE FROM grants');
        await db.query('DELETE FROM programs');
    });

    afterAll(async function() {
        await db.end();
    });

    test('can scrape programs and grants', async function() {
        await scraper.scrapePrograms();
        const programs = await Program.findAll();
        expect(programs).toHaveLength(1); // assuming there's only one program in the test data
        expect(programs[0].title).toEqual('Program Title');

        const grants = await Grant.findAll();
        expect(grants).toHaveLength(1);
        expect(grants[0].grant_name).toEqual('Grant Name');
    });
});

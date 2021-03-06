const APP_BASE_PATH = 'http://localhost:1234';

module.exports = {
  'search centers': (browser) => {
    browser
      .url(APP_BASE_PATH)
      .waitForElementVisible('body', 5000)
      .assert.urlEquals(`${APP_BASE_PATH}/`)
      .assert.visible('body')
      .pause(2000)
      .setValue('.search-lg', 'Ne')
      .pause(2000)
      .click('.btn-search-lg')
      .waitForElementVisible('.acenter', 5000)
      .assert.visible('.form-search')
      .assert.visible('.acenter')
      .click('.btn-search-l')
      .waitForElementVisible('.swal-button', 5000)
      .assert.visible('.swal-button')
      .pause(1500)
      .click('.swal-button')
      .pause(1000)
      .setValue('.form-search-l', '23')
      .pause(1000)
      .click('.radio-cost')
      .pause(1000)
      .click('.btn-search-l')
      .waitForElementVisible('.acenter', 5000)
      .assert.visible('.acenter')
      .clearValue('.form-search-l')
      .pause(1000)
      .setValue('.form-search-l', 'Am')
      .pause(500)
      .click('.radio-name')
      .pause(1000)
      .click('.btn-search-l')
      .waitForElementVisible('.acenter', 5000)
      .assert.visible('.acenter')
      .pause(3000)
      .clearValue('.form-search-l')
      .pause(1000)
      .setValue('.form-search-l', 'Wow')
      .pause(1000)
      .click('.btn-search-l')
      .waitForElementVisible('.no-results', 5000)
      .assert.visible('.no-results')
      .pause(2000)
      .end();
  }
};

module.exports = {
  //url: 'https://www.united.com/en/us/',
  url:  function() { 
    return this.api.launchUrl; 
  },
  elements: {
  
    oneway: {selector: 'input[id="oneway"]'},
    /*
    oneway: {
      selector: '//*[@id="oneway"]',  
      locateStrategy: 'xpath'
    },
    */
    from: {selector: 'input[id="bookFlightOriginInput"]'},
    to:   {selector: 'input[id="bookFlightDestinationInput"]'},
    depart: {selector: 'input[id="DepartDate"]'},
    cabinType: {selector: 'button#cabinType > div'},
    cleaner: {selector: 'input[id="filterOriginInput"]'},
    ffButton: {selector: '//*[@id="bookFlightForm"]//button[@type="submit"]',
    locateStrategy: 'xpath'},
},
commands: [
  {
    mySetValue: function (where, what) {
      this.waitForElementVisible(where)
      .clearValue(where)
      .pause(10000)   // check suppressNotFoundErrors option.
      .assert.value(where, "")
      .setValue(where, what)
      .assert.value(where, what)
      return this.api;
    }
  }
],
props: {
  v_from: "New York JFK",
  v_to: "Miami, FL, US (MIA - All Airports)",
  v_depart: "Aug 20"
}
};

module.exports = {
    //url: 'https://www.united.com/en/us/',
    //url:  function() { 
    //  return this.api.launchUrl + 'flight-search/book-a-flight/results/rev'; 
    //},
    elements: {
      flightList: //{selector: '#flight-result-list-revised'},      
        {
        selector: '//*[@id="flight-result-list-revised"]',
        locateStrategy: 'xpath'
        }, 
      basicEconomyInd: 
        {
        selector: '//*[@id="announcePriceSort-ECO-BASIC"]',
        locateStrategy: 'xpath'
        },   
/*        
      flightRow: 
        {
        selector: '//*[@id="flight-result-list-revised"]/li[1]',
        locateStrategy: 'xpath'
        },
      */        
      basicEconomy:
        {
          //selector: '//*[@id="announcePriceSort-ECO-BASIC"]',
          selector: '//*[@id="column-ECO-BASIC"]',
          locateStrategy: 'xpath'
        }
      // #flight-result-list-revised > li  - all on the page li (1-36)
      // #flight-result-list-revised > li:nth-child(2)

  },
  commands: [],
  props: {
    timeOut: 20000
  }
  };

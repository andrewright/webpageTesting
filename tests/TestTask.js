module.exports = {    
    'Demo test of test task' : function(browser) {
      // a. Navigate to https://www.united.com
      var airlines = browser.page.airlines();    

        airlines.navigate()
        .waitForElementVisible('body')
        
        // b.i. One-way flight
        .assert.titleContains('United Airlines')
        .click('@oneway')
        
        // b.ii. From “New York JFK” to “Miami, FL, US (MIA - All Airports)”
        .mySetValue('@from',airlines.props.v_from)
        airlines.mySetValue('@to',airlines.props.v_to)

        // b.iii. Depart date August 20th
        airlines.mySetValue('@depart',airlines.props.v_depart)

        // b.iv. Economy class         
        airlines      
        .waitForElementVisible('@cabinType')
        // or
        //.api.expect.element('button#cabinType').to.be.present
        .assert.containsText('@cabinType', "Economy")

        .click('@cleaner')
        .click('@ffButton')

        var flights = browser.page.flights();
        
        flights
        .assert.titleContains('Flight Search Results')
        
        flights.pause(20000)        

        // d.i. Sort the flights by Economy (Most Restricted), lowest price first
        flights.waitForElementPresent('@basicEconomyInd', 20000, function(result){
            flights.api.elementIdText(result.WebdriverElementId,function(r){
                if (r!='sorted ascending') {
                   flights.waitForElementVisible('@basicEconomy', 20000) 
                   .click('@basicEconomy')         
                }
            })
        })
        flights.assert.containsText('@basicEconomyInd', 'sorted ascending');

        // d.ii. Collect Depart, Arrive, Stops, Duration, Price (Economy (Most Restricted)
        // d.iii. If the flight is not available for Price criteria: (Economy (Most Restricted), filter the flight data out of the json object

        //        I do am not collecting instead of removing after. I could do it in another way too if need.

        const jsonItemEmpty = {'Depart':'', 'Arrive':'', 'Stops':'', 'Duration':'', 'Price':''}
        var finalStr ="["
        var jsonItem = jsonItemEmpty

        var liItem = [""]        
        var webId = ""

        //flights.pause(20000)
        flights.waitForElementPresent('@flightList' , 20000, function(result){ 
                //console.log(result)
                webId = result.WebdriverElementId             
            })

            flights.api.perform(function() {
                var strList = ""  
                //strList.slice()
                flights.api.elementIdText(webId,function(r){
                    strList = "" + r.value
                }) 

            flights.api.perform(function() {             
                //console.log('strItem: \n', strList)

                liItem = strList.split("Flight option")
                liItem.forEach(element => {

                if ((element>"")&&(element.indexOf('Not available') < 0)) {
                    //console.log("liItem element: \n", element)

                    arrItem = element.split("\n")
                    //console.log("arrItem " , arrItem,"\n")
                    jsonItem = jsonItemEmpty

                    jsonItem.Depart = arrItem[3]+" "+arrItem[4]+" "+arrItem[5]
                    //console.log("\njsonItem.Depart " , jsonItem.Depart)

                    jsonItem.Arrive = arrItem[7]+" "+arrItem[8]+" "+arrItem[9]
                    //console.log("\njsonItem.Arrive " , jsonItem.Arrive)

                    jsonItem.Stops = arrItem[11]
                    //console.log("\njsonItem.Stops " , jsonItem.Stops)       
                    
                    jsonItem.Duration = arrItem[12]
                    //console.log("\njsonItem.Duration " , jsonItem.Duration)

                    jsonItem.Price = arrItem[16]
                    //console.log("\njsonItem.Price " , jsonItem.Price)
        
                    //console.log("\njsonItem " , jsonItem)

                    finalStr = finalStr + JSON.stringify(jsonItem) + ","                     
                }
                })
                finalStr = finalStr.substr(0,(finalStr.length - 1)) + "]"
                //console.log("\nThe final result: \n" , finalStr)

                finalJson = JSON.parse(finalStr)
                console.log("\nThe final result: \n" , finalJson)
            })
        })   
        browser.end();
    }
  };
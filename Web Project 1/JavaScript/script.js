////Section 1 - XML
var guitarList;
var userCode;
var appendedTable;

//Execute function on load

(async function loadData() {
  //Fetching XML data from XML file
  var response = await fetch("XML/productDetails.xml");
  //Converting response to text
  var xmlContent = await response.text();
  //Converting text into XML document
  var data = new window.DOMParser().parseFromString(xmlContent, "text/xml");
  //Getting tag elements Guitar and storing them in a variable
  guitarList = data.getElementsByTagName("Guitar");
})();

const checkCode = function (userCode) {
  for (i = 0; i <= guitarList.length - 1; i++) {
    let guitarCode = guitarList[i].getElementsByTagName("Code")[0].textContent;

    //Breaking down materials into categories
    let guitarMaterial = guitarList[i].getElementsByTagName("Material")[0];
    let body = guitarMaterial.getElementsByTagName("Body")[0].textContent;
    let neck = guitarMaterial.getElementsByTagName("Neck")[0].textContent;
    let fingerboard =
      guitarMaterial.getElementsByTagName("Fingerboard")[0].textContent;

    if (userCode === guitarCode) {
      //Creating a table row with all the details from XML file
      return (appendedTable = `<td>${
        guitarList[i].getElementsByTagName("Brand")[0].textContent
      } ${guitarList[i].getElementsByTagName("Name")[0].textContent}</td>
        <td>Body: ${body}, Neck: ${neck}, Fingerboard: ${fingerboard}</td>
        <td>${guitarList[i].getElementsByTagName("Colour")[0].textContent}</td>
        <td>${guitarList[i].getElementsByTagName("Case")[0].textContent}</td>
        <td>$ ${guitarList[i].getElementsByTagName("Price")[0].textContent}</td>
        <td>${inStock(
          guitarList[i].getElementsByTagName("Stock")[0].textContent
        )}</td>`);
    }
  }
  return "<td colspan='6'>Not Found</td>";
};

//////////////////////////////////////////////

//Section 2 - OPENWEATHER
// Using jQuery to add to add product details to hidden div based on a code provided

$(document).ready(function () {
  $("#searchButton").click(function () {
    userCode = $("#searchInput").val();
    var productDetails;
    if (userCode === "") {
      $("#loadedDetails").html(`<td colspan='6'> Please Enter Code</td>`);
    } else {
      productDetails = checkCode(userCode);
      console.log(productDetails);
      $("#loadedDetails").html(productDetails);
    }
  });
});

function inStock(value) {
  return value > 0 ? "Yes" : "No";
}

//Search Weather Functionality

//User Entered Country
var userCountry;
//My API registration KEY
var myKey = "";

//Function to load JSON file from given URL
async function loadJSON(url) {
  var response = await fetch(url);
  var data = await response.json();
  loadScript(data);
}

$(document).ready(function () {
  $("#searchButton2").click(function () {
    userCountry = $("#searchInput2").val();
    if (userCountry !== "") {
      var myUrl = `http://api.openweathermap.org/data/2.5/forecast?mode=json&q=${userCountry}&appid=${myKey}`;
      loadJSON(myUrl);
    } else {
      $("#amendedTable").html("<tr><th>Please Enter A City Name!</th></tr>");
    }
  });
});

//function uses JSON data to manipulate HTML document
function loadScript(data) {
  var displayedCity = data.city.name;
  var displayedWeather = data.list[0].weather[0].main;
  var displayedDescription = data.list[0].weather[0].description;
  var icon = data.list[0].weather[0].icon;
  var displayedImage = `http://openweathermap.org/img/w/${icon}.png`;
  var temperature = data.list[0].main.temp;
  var displayedTemperature = convertToCelcius(temperature);
  var displayedInformation = `<tr><th>City:</th><td>${displayedCity}</td></tr><tr><th>Weather:</th><td>${displayedWeather} -</td></tr><tr><th></th><td>${displayedDescription}</td></tr><tr><th>Temperature:</th><td>${displayedTemperature}&deg</td></tr>
  <tr><td colspan="2" id="icon"><img src="${displayedImage}" alt="Image Icon"></td></tr>`;

  $("#amendedTable").html(displayedInformation);
}

//Function to convert to Celcius from Kelvin
function convertToCelcius(kelvinTemp) {
  return Math.round(kelvinTemp - 273.15);
}

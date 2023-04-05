var publicKey = "475379ab26db81da4efbde3f762b8587";
var privateKey = "256f300dba7897285cb040464d292143177ed5b9";
var fetchButton = document.getElementById('generate');
var charListEl = document.getElementById('charList')

// var index = (Math.floor(Math.random() * length));
// console.log(index)

var ts = Date.now();
// console.log(ts)
var combined = ts + privateKey + publicKey;
// console.log(combined)
var hash = CryptoJS.MD5(combined).toString();
// console.log(hash)

var url = "https://gateway.marvel.com/v1/public/characters?apikey=" + publicKey + "&ts=" + ts + "&hash=" + hash  + "&limit=15";
console.log(url);

fetch(url)
  .then(function (response) {
    console.log(response);
    return response.json();
  })
  .then(function (data) {
    console.log(data);
  })


//   var tableBody = document.getElementById('repo-table');


function getCharacters(event) {
    event.preventDefault();
  // fetch request gets a list of all the repos for the node.js organization
  var requestUrl = url;

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data)
      //Loop over the data to generate a table, each table row will have a link to the repo url
      for (var i = 0; i < data.length; i++) {
        // Creating elements, tablerow, tabledata, and anchor
        var createTableRow = document.createElement('tr');
        var tableData = document.createElement('td')
        var listEl = document.createElement('li');

        // Setting the text of link and the href of the link
        listEl.textContent = data[i].results.name;
      
        

        // Appending the link to the tabledata and then appending the tabledata to the tablerow
        // The tablerow then gets appended to the tablebody
        tableData.appendChild(listEl);
        createTableRow.appendChild(tableData)
        tableBody.appendChild(createTableRow);
   
      }
      
    });
}

fetchButton.addEventListener('click', getCharacters);
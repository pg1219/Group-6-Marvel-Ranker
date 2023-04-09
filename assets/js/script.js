 
var charTag = document.getElementById("charTags");
var fetchCharsButton = document.getElementById("fetch-chars");
var spanTag = document.getElementById("spanTags");
var publicKey = "fa6f290698944f5999102cfe84473ee5";
var privateKey = "c7f11873efae271d19170c35a78fe6009417f858";
var charIds = [
  "1010801",
  "1009187",
  "1017105",
  "1009282",
  "1017107",
  "1010338",
  "1009610",
  "1009664",
  "1009368",
  "1009189",
];

var ts = Date.now();
var combined = ts + privateKey + publicKey;
var hash = CryptoJS.MD5(combined).toString();

function getCharsApi() {
  for (var i = 0; i < charIds.length; i++) {
    var url =
      "https://gateway.marvel.com/v1/public/characters/" +
      charIds[i] +
      "?apikey=" +
      publicKey +
      "&ts=" +
      ts +
      "&hash=" +
      hash;
    //  console.log(url);
    fetch(url)
      .then(function (response) {
        //  console.log(response);
        return response.json();
      })
      .then(function (reply) {
        console.log(reply);

        var charItem = document.createElement("h3");
        var charList = reply.data.results[0];
        charItem.textContent = charList.name;
        spanTag.append(charItem);
        console.log(reply.data.results.name);

        var imageList = reply.data.results[0];

        var imageItem = document.createElement("img");
        imageItem.style.width = "75px";
      
        imageItem.src =
          imageList.thumbnail.path + "." + imageList.thumbnail.extension;
        imageItem.classList.add("char-img")
        imageItem.setAttribute("data-name", charList.name)
        charItem.append(imageItem);

      }
        )
      };
  }

 

        spanTag.addEventListener("click", function(event){
          var element = event.target
          if(element.matches(".char-img")){
            console.log(element.dataset.name)
          localStorage.setItem("name",element.dataset.name)  
          fetch("https://api.giphy.com/v1/gifs/random?api_key=7saPLMk09bQDFKz96FN2CCcwFpfGlp84&tag=" +
          element.dataset.name + " avengers" +
          "&rating=g")
          .then(function(response){
            return response.json()
          })
          .then(function(data){
            console.log(data)
          })
          }
            
          })


// data.data.url

fetchCharsButton.addEventListener("click", getCharsApi);



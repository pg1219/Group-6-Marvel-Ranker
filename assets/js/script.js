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
        // console.log(reply.data.results.name);

        var imageList = reply.data.results[0];

        var imageItem = document.createElement("img");
        imageItem.style.width = "75px";
        imageItem.src =
          imageList.thumbnail.path + "." + imageList.thumbnail.extension;
        imageItem.classList.add("char-img");
        imageItem.setAttribute("data-name", charList.name);
        charItem.append(imageItem);
      });
  }
}

spanTag.addEventListener("click", function (event) {
  var element = event.target;
  if (element.matches(".char-img")) {
    console.log(element.dataset.name);
    localStorage.setItem("name", element.dataset.name)
    fetch(
      "https://api.giphy.com/v1/gifs/search?api_key=7saPLMk09bQDFKz96FN2CCcwFpfGlp84&q=" +
        element.dataset.name +
        "&rating=g"
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data)
      
   var favUrl = data.data[0].url
   console.log(favUrl)
  var gifBox = document.querySelector(".gif-container")
   var favImg = document.createElement("img");
favImg.style.width = "700px";
favImg.style.padding = "50px"
favImg.src = fetch(favUrl)
console.log(favImg.src)
favImg.classList.add("char-gif");
favImg.setAttribute("gif", favUrl);
gifBox.append(favImg);

});
 } })

// favImg.classList.add("card-body");
// favImg.innerHTML = <img src = favUrl ></img>;

// card.appendChild(cardBody);
// fiveDayForecastEl.append(card);
// data.data.url

fetchCharsButton.addEventListener("click", getCharsApi);

// 1010801 Ant Man scott lang
// 1009187 black panther 32
// 1017105 capt america
// 1009282 dr strange
// 1017107 hulk
// 1010338 capt marvel
// 1009610 spiderman
// 1009664 Thor
// 1009368 iron man
// 1009189 Black widow

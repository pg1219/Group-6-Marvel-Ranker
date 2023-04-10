 
var charTag = document.getElementById("charTags");
var fetchCharsButton = document.getElementById("btn");
var spanTag = document.getElementById("spanTags");
var publicKey = "475379ab26db81da4efbde3f762b8587";
var privateKey = "256f300dba7897285cb040464d292143177ed5b9";
var charIds = [
  "1010801",
  "1009187",
  "1009220",
  "1009282",
  "1009351",
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

        var charItem = document.createElement("ul");
        var charList = reply.data.results[0];
        charItem.textContent = charList.name;
        charItem.style.fontSize = "1vw";
        console.log(charItem.textContent);
        spanTag.append(charItem);

        console.log(charList);

        var imageList = reply.data.results[0];
        var imageItem = document.createElement("img");
        imageItem.style.width = "100px";
      
        imageItem.src =
         imageList.thumbnail.path + "." + imageList.thumbnail.extension;
        imageItem.classList.add("char-img")        
        imageItem.setAttribute("data-name", charList.name)
        // charItem.append(imageItem);
        charItem.prepend(imageItem);

      })
    }
 };
spanTag.addEventListener("click", function (event) {
  var element = event.target;
  if (element.matches(".char-img")) {
    console.log(element.dataset.name);
    localStorage.setItem("name", element.dataset.name);
    fetch(
      "https://api.giphy.com/v1/gifs/search?api_key=7saPLMk09bQDFKz96FN2CCcwFpfGlp84&q=" +
        element.dataset.name +
        "&rating=g&limit=10"
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);

        for (var i = 0; i < 1; i++) {
          var index = Math.floor(Math.random() * data.data.length);

          console.log(index);

          var gifId = data.data[index].images.original.url;
          console.log(gifId);
          var gifBox = document.querySelector(".gif-container");
          var favImg = document.createElement("img");
          favImg.style.width = "90%";
          favImg.style.padding = "30px";
          favImg.src = gifId;
          favImg.classList.add("char-gif");
          favImg.setAttribute("gif", gifId);
          gifBox.append(favImg);


        }
      });
  }
});


fetchCharsButton.addEventListener("click", getCharsApi);

const hideBtn = document.getElementById("btn");
fetchCharsButton.onclick = function () {
  if (hideBtn.style.display !== "none") {
    hideBtn.style.display = "none";
  } else {
    hideBtn.style.display = "block";
  }
};



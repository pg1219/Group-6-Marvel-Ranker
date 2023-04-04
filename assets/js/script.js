var publicKey = "fa6f290698944f5999102cfe84473ee5";
var privateKey = "7f11873efae271d19170c35a78fe6009417f858";

var ts = Date.now();
var combined = ts + privateKey + publicKey;
var hash = CryptoJS.MD5(combined).toString();

var url = "https://gateway.marvel.com/v1/public/comics?apikey=" + publicKey + "&ts=" + ts + "&hash=" + hash;
console.log(url);

fetch(url)
  .then(function (response) {
    console.log(response);
    return response.json();
  })
  .then(function (data) {
    console.log(data);
  })
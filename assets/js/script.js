 
  var charTag = document.getElementById('charTags');
  var fetchCharsButton = document.getElementById('fetch-chars');
 var spanTag = document.getElementById('spanTags');
 var publicKey = "fa6f290698944f5999102cfe84473ee5";
 var privateKey = "c7f11873efae271d19170c35a78fe6009417f858";
 var charIds = ["1010801", "1009187", "1017105", "1009282", "1017107", "1010338", "1009610", "1009664", "1009368", "1009189"]
 
 var ts = Date.now();
 var combined = ts + privateKey + publicKey;
 var hash = CryptoJS.MD5(combined).toString();
 
 function getCharsApi (){
 
 var url = "https://gateway.marvel.com/v1/public/characters?apikey=" + publicKey + 
 "&ts=" + ts + "&hash=" + hash;
 console.log(url);
 fetch(url)
   .then(function (response) {
     console.log(response);
     return response.json();
   })
   .then(function (reply) {
      console.log(reply);
 
      for (var i = 0; i< reply.data.results.length; i++){
 
       
        var charItem= document.createElement('h3');
        var charList =reply.data.results[i];
         charItem.textContent= charList.name;
         spanTag.append(charItem);
         console.log(reply.data.results)
 
         
     //  }
     //  for (var i =0; i<reply.data.results.length; i++){
       var imageList = reply.data.results[i];
 
       var imageItem = document.createElement('img');
       imageItem.style.width= '75px';
       imageItem.src =  imageList.thumbnail.path  + "." + imageList.thumbnail.extension;
       
       charItem.append(imageItem);
       
      }
    
   })
 }

 fetchCharsButton.addEventListener('click', getCharsApi);
 

 var marvelUrl = "https://api.giphy.com/v1/gifs/random?api_key=7saPLMk09bQDFKz96FN2CCcwFpfGlp84&tag=marvel&rating=g"






// 1010801 Ant Man scott lang
// 1009187 black panther
// 1017105 capt america
// 1009282 dr strange
// 1017107 hulk
// 1010338 capt marvel
// 1009610 spiderman
// 1009664 Thor
// 1009368 iron man
// 1009189 Black widow
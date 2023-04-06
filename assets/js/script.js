 
  var charTag = document.getElementById('charTags');
  var fetchCharsButton = document.getElementById('fetch-chars');
 var spanTag = document.getElementById('spanTags');
 var publicKey = "fa6f290698944f5999102cfe84473ee5";
 var privateKey = "c7f11873efae271d19170c35a78fe6009417f858";
 
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
         charItem.textContent= charList.name;;
         spanTag.append(charItem);
         console.log(reply.data.results)
 
         
     //  }
     //  for (var i =0; i<reply.data.results.length; i++){
       var imageList = reply.data.results[i];
 
       var imageItem = document.createElement('img');
       imageItem.style.width= '100px';
       imageItem.src =  imageList.thumbnail.path  + "."+ imageList.thumbnail.extension;
       
       charItem.append(imageItem);
       
      }
    
   })
 }
 fetchCharsButton.addEventListener('click', getCharsApi)

 var marvelUrl = "https://api.giphy.com/v1/gifs/random?api_key=7saPLMk09bQDFKz96FN2CCcwFpfGlp84&tag=marvel&rating=g"
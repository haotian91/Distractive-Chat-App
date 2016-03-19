/* Your code starts here */

var app = app || {};

app.main = (function() {
	console.log('Your code starts here!');
	var gifJudge = 1;

	var person = prompt('What\'s your name?');

	//Global
	var socket;

	//initializing the socket
	var socketSetup = function(){
		socket = io.connect();

		//sent client name to server
		socket.emit('userName', person);

		//key-value pair:
		//1:the exact same string identifier as in the server
		//2:a callback function with the boject that the server
		socket.on('welcome', function(a){
			console.log(a);
		});

		//get message from server and show message to clients
		socket.on('msg-to-clients', function(data){
			$('#messages').append('<li class="typing">' + data.id + ' says: ' + data.msg + ' <img src=' + data.emoji + ' height="25px" width="25px" > ' + '</li>');	
			$("li.typing").css("background-color","#eee");
			socket.emit('msgdone',data.msg);
			// showHeadline();
			var objDiv = document.getElementById("texts");
			objDiv.scrollTop = objDiv.scrollHeight;
			// console.log(objDiv.scrollTop + ' , ' + objDiv.scrollHeight);
		});

		//send message to clients someone left
		socket.on('bye', function(data){
			$('#messages').append($('<li>').text(data));
		});

		//get client's name and send the name to all clients
		socket.on('helloeveryone',function(data){
			$('#messages').append($('<li>').text(data + ' is here '));
		});
		
		//send client's name to server
		socket.emit('storeClientInfo',{customId:person});

		//get keywords and show
		// socket.on('get-keywords', function(data){
			
		// 	$('#messages').append('<li id="word">' + data + '</li>');
		// });

		//get headline and show
		socket.on('get-headline', function(data){
				var thisURL = 'http://api.nytimes.com/svc/search/v2/articlesearch.json?q=' + data.text + '&fq=headline&begin_date=20150101&sort=newest&fl=headline&page=0&api-key=705552bfb6f5d629771b99e4e00e0674:12:73581032';
				console.log(data.text);
	            $.getJSON(thisURL, function(json){
	                console.log('headlines received');
	                var numDoc = json.response.docs.length;
	                if(numDoc >=1){
	                    var numHead = Math.floor(Math.random()*numDoc);
	                    var headline = json.response.docs[numHead].headline.main;
	               		console.log(headline);
	                    $('#messages').append('<li id="word">' + headline + '</li>');     
	                    var objDiv = document.getElementById("texts");
						objDiv.scrollTop = objDiv.scrollHeight;
						// console.log(objDiv.scrollTop + ' , ' + objDiv.scrollHeight);
	                };
	            });				
		});	

		//get gif and show
		socket.on('get-gif',function(data){
			var thisUrl = 'http://api.giphy.com/v1/gifs/search?q='+ data.text + '&api_key=dc6zaTOxFJmzC';
			$.getJSON(thisUrl,function(json){
				console.log('gif received');
				var numGif = json.data.length;
				// console.log(numGif);
				var gifShow = Math.floor(Math.random()*numGif);
				var gif = json.data[gifShow].images.fixed_height.url;				
				console.log(gif);
				if (gif != undefined){

					gifJudge=gifJudge+1;

                if(gifJudge == 2){
                    $(function(){
                function getRandomInt(min, max) {
                    return Math.floor(Math.random() * (max - min + 1) + min);
                }
                $("<div/>",{id:"moveWindow"}).css({
                    top:getRandomInt(100,600), 
                    left:getRandomInt(100,600),
                    width:"200px",
                    height:"200px",
                    position:"absolute",
                    cursor:"pointer"}).appendTo("body");
                //close button
                // $("<div/>",{id:"removeMW"}).css({
                //     top:getRandomInt(100,600), 
                //     left:getRandomInt(100,600),
                //     width:"20px",
                //     height:"20px",
                //     background:"red",
                //     float:"right"}).appendTo("#moveWindow");
                //interval
                var move = setInterval(moves,30);
                var x= 5;
                var y= 5;

                function moves (){
                    var mw = $("#moveWindow").offset();
                    var lefts =mw.left;
                    var tops = mw.top;
                    if ((lefts>=($(window).width()-$("#moveWindow").width()))||(lefts<=0))
                    {
                        x=-x;
                    }
                    if ((tops>=($(window).height()-$("#moveWindow").height()))||(tops<=0))
                    {
                        y=-y;
                    }
                    lefts+=x;
                    tops+=y;

                    $("#moveWindow").offset({top:tops,left:lefts});
                }
                //stop moving
                $("#moveWindow").mouseover(function(){
                    clearInterval(move);
                });
                //keep moving
                $("#moveWindow").mouseout(function(){
                    move = setInterval(moves,30);
                });
                //click close
                // $("#removeMW").click(function(){
                //     $("#moveWindow").remove();
                // });
                    });

                };
					// $('#gif').empty();
					// $('#gif').append('<img src="'+ gif +'" >');
					$('#moveWindow').empty();
					$('#moveWindow').append('<img src="'+ gif +'" >');
					var objDiv = document.getElementById("texts");
					console.log('scrollTop:'+objDiv.scrollTop+", scrollHeight:"+objDiv.scrollHeight);
					objDiv.scrollTop = objDiv.scrollHeight;
					console.log('scrollTop:'+objDiv.scrollTop+", scrollHeight:"+objDiv.scrollHeight);
				}
			});
		});

		// socket.on('get-sentiment', function(data){
		// 	$('.keyWords').empty();
		// 	var size = {
		// 	  width: window.innerWidth || document.body.clientWidth,
		// 	  height: window.innerHeight || document.body.clientHeight
		// 	};
		// 	var swidth = size.width/4;
		// 	$('.keyWords').append('<img src=' + data + ' height="' + swidth +'" width="' + swidth +'"/>');
		// });

	};

	var attachEvents = function(){
		$('#m').keypress(function(e){
			var nText = Math.floor((Math.random() *20) + 21);
			console.log(nText/2);
			if($('#m').val().length == nText/2){			
				$('#m').val('');
			};

			if(e.keyCode == 13 && ($('#m').val().length != 0)){
				socket.emit('msg-to-server', $('#m').val());
				$('#m').val('');
				
			};
		});

		$('button').off('click').on('click', function(){
			if($('#m').val().length != 0){
				socket.emit('msg-to-server', $('#m').val());
				$('#m').val('');
				
			};			
		});
		// var objDiv = document.getElementById("main-container");
		// objDiv.scrollTop = objDiv.scrollHeight;

	};

	var init = function(){
		console.log('Initializing app.');
		socketSetup();
		attachEvents();
	};

	return {
		init: init
	};

})();

window.addEventListener('DOMContentLoaded', app.main.init);
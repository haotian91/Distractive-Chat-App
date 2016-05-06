/* Your code starts here */

var app = app || {};

app.main = (function() {
	console.log('Your code starts here!');
	var gifNum = 0;
	var gifWindow = 0;

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
			$('#messages').append('<li >' + data.id + ' says: ' + data.msg + ' <img src=' + data.emoji + ' height="25px" width="25px" > ' + '</li>');	
			// $("li").css("background-color","#eee");
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
				// console.log(data.text);
	            $.getJSON(thisURL, function(json){
	                console.log('headlines received');
	                var numDoc = json.response.docs.length;
	                if(numDoc >=1){
	                    var numHead = Math.floor(Math.random()*numDoc);
	                    var headline = json.response.docs[numHead].headline.main;
	               		// console.log(headline);
	                    $('#moveWindow'+gifWindow).append('<li id="word">' + headline + '</li>');     
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
				// console.log('gif received');
				var numGif = json.data.length;
				// console.log(numGif);
				var gifShow = Math.floor(Math.random()*numGif);
				var gif = json.data[gifShow].images.fixed_height.url;				
				// console.log(gif);
				if (gif != undefined){
					gifNum = gifNum + 1;

					gifWindow= (gifNum - 1)%5;

				for(i=0;i<5;i++){
	                if(gifWindow == i & gifNum<6){
	                    $(function(){
			                function getRandomInt(min, max) {
			                    return Math.floor(Math.random() * (max - min + 1) + min);
			                }
			                $("<div/>",{id:"moveWindow"+gifWindow}).css({
			                    top:getRandomInt($(window).height()/6,$(window).height()*5/6), 
			                    left:getRandomInt($(window).width()/6,$(window).width()*5/6),
			                    width: $(window).height()/3 + "px",
			                    height: $(window).height()/4 +"px",
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
	                // var move = setInterval(moves,30);
			                var x0= 5;
			                var y0= 5;
			                var x1= 5;
			                var y1= 5;
			                var x2= 5;
			                var y2= 5;
			                var x3= 5;
			                var y3= 5;
			                var x4= 5;
			                var y4= 5;

	                // for(p=0;p<=gifWindow;p++){
			                function moves0 (){
			                    var mw0 = $("#moveWindow0").offset();
			                    var lefts0 =mw0.left;
			                    var tops0 = mw0.top;
			                    console.log(lefts0 + " , " + $(window).width() + " , " + $("#moveWindow0").width());
			                    if (lefts0>=($(window).width()-$("#moveWindow0").width()))
			                    {
			                        lefts0 = $(window).width()-$("#moveWindow0").width()-1;
			                        x0=-x0;
			                    };
			                    if (lefts0 <= 0){
			                    	lefts0 = 1;
			                    	x0=-x0;
			                    };
			                    if (tops0>=($(window).height()-$("#moveWindow0").height()))
			                    {
			                        tops0 = $(window).height()-$("#moveWindow0").height() - 1;
			                        y0=-y0;
			                    };
			                    if(tops0<=0){
			                    	tops0 = 1;
			                    	y0=-y0;
			                    };
			                    lefts0+=x0;
			                    tops0+=y0;

			                    $("#moveWindow0").offset({top:tops0,left:lefts0});
			                };

			                function moves1 (){
			                    var mw1 = $("#moveWindow1").offset();
			                    var lefts1 =mw1.left;
			                    var tops1 = mw1.top;
			                    if (lefts1>=($(window).width()-$("#moveWindow1").width()))
			                    {
			                        lefts1 = $(window).width()-$("#moveWindow1").width()-1;
			                        x1=-x1;
			                    };
			                    if (lefts1 <= 0){
			                    	lefts1 = 1;
			                    	x1=-x1;
			                    };
			                    if (tops1>=($(window).height()-$("#moveWindow1").height()))
			                    {
			                        tops1 = $(window).height()-$("#moveWindow1").height() - 1;
			                        y1=-y1;
			                    };
			                    if(tops1<=0){
			                    	tops1 = 1;
			                    	y1=-y1;
			                    };
			                    lefts1-=x1;
			                    tops1+=y1;

			                    $("#moveWindow1").offset({top:tops1,left:lefts1});
			                };

			                function moves2 (){
			                    var mw2 = $("#moveWindow2").offset();
			                    var lefts2 =mw2.left;
			                    var tops2 = mw2.top;
			                    if (lefts2>=($(window).width()-$("#moveWindow2").width()))
			                    {
			                        lefts2 = $(window).width()-$("#moveWindow2").width()-1;
			                        x2=-x2;
			                    };
			                    if (lefts2 <= 0){
			                    	lefts2 = 1;
			                    	x2=-x2;
			                    };
			                    if (tops2>=($(window).height()-$("#moveWindow2").height()))
			                    {
			                        tops2 = $(window).height()-$("#moveWindow2").height() - 1;
			                        y2=-y2;
			                    };
			                    if(tops2<=0){
			                    	tops2 = 1;
			                    	y2=-y2;
			                    };
			                    lefts2-=x2;
			                    tops2-=y2;

			                    $("#moveWindow2").offset({top:tops2,left:lefts2});
			                };

			                function moves3 (){
			                    var mw3 = $("#moveWindow3").offset();
			                    var lefts3 =mw3.left;
			                    var tops3 = mw3.top;
			                    if (lefts3>=($(window).width()-$("#moveWindow3").width()))
			                    {
			                        lefts3 = $(window).width()-$("#moveWindow3").width()-1;
			                        x3=-x3;
			                    };
			                    if (lefts3 <= 0){
			                    	lefts3 = 1;
			                    	x3=-x3;
			                    };
			                    if (tops3>=($(window).height()-$("#moveWindow3").height()))
			                    {
			                        tops3 = $(window).height()-$("#moveWindow3").height() - 1;
			                        y3=-y3;
			                    };
			                    if(tops3<=0){
			                    	tops3 = 1;
			                    	y3=-y3;
			                    };
			                    lefts3+=x3;
			                    tops3-=y3;

			                    $("#moveWindow3").offset({top:tops3,left:lefts3});
			                };

			                function moves4 (){
			                    var mw4 = $("#moveWindow4").offset();
			                    var lefts4 =mw4.left;
			                    var tops4 = mw4.top;
			                    if (lefts4>=($(window).width()-$("#moveWindow4").width()))
			                    {
			                        lefts4 = $(window).width()-$("#moveWindow4").width()-1;
			                        x4=-x4;
			                    };
			                    if (lefts4 <= 0){
			                    	lefts4 = 1;
			                    	x4=-x4;
			                    };
			                    if (tops4>=($(window).height()-$("#moveWindow4").height()))
			                    {
			                        tops4 = $(window).height()-$("#moveWindow4").height() - 1;
			                        y4=-y4;
			                    };
			                    if(tops4<=0){
			                    	tops4 = 1;
			                    	y4=-y4;
			                    };
			                    lefts4+=x4;
			                    tops4+=y4;

			                    $("#moveWindow4").offset({top:tops4,left:lefts4});
			                };

				            if(gifWindow==0){
				            	setInterval(moves0,30);
				            };
				            if(gifWindow==1){
				            	// setInterval(moves0,30);
				            	setInterval(moves1,30);
				            };
				            if(gifWindow==2){
				            	// setInterval(moves0,30);
				            	// setInterval(moves1,30);
				            	setInterval(moves2,30);
				            };
				            if(gifWindow==3){
				            	// setInterval(moves0,30);
				            	// setInterval(moves1,30);
				            	// setInterval(moves2,30);
				            	setInterval(moves3,30);
				            };
				            if(gifWindow==4){
				            	// setInterval(moves0,30);
				            	// setInterval(moves1,30);
				            	// setInterval(moves2,30);
				            	// setInterval(moves3,30);
				            	setInterval(moves4,30);
				            };

		             
	            	// };


	                // //stop moving
	                // $("#moveWindow"+gifWindow).mouseover(function(){
	                //     clearInterval(move);
	                // });
	                // //keep moving	       
	                // $("#moveWindow"+gifWindow).mouseout(function(){
	                //     move = setInterval(moves,30);
	                // });
	                //click close
	                // $("#removeMW").click(function(){
	                //     $("#moveWindow").remove();
	                // });
	                    });

	                };
            	};


					if(gifNum>5){
						$("#moveWindow"+gifWindow).css("z-index",gifNum);
					};
					// $('#gif').empty();
					// $('#gif').append('<img src="'+ gif +'" >');
					$('#moveWindow'+gifWindow).empty();
					$('#moveWindow'+gifWindow).append('<img src="'+ gif +'" height="'+$(window).height()/4 + '" >' );
					var objDiv = document.getElementById("texts");
					// console.log('scrollTop:'+objDiv.scrollTop+", scrollHeight:"+objDiv.scrollHeight);
					objDiv.scrollTop = objDiv.scrollHeight;
					// console.log('scrollTop:'+objDiv.scrollTop+", scrollHeight:"+objDiv.scrollHeight);
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
			// console.log(nText/2);
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
		// console.log('Initializing app.');
		socketSetup();
		attachEvents();
	};

	return {
		init: init
	};

})();

window.addEventListener('DOMContentLoaded', app.main.init);
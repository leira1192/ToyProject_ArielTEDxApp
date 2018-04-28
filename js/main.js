//alert('ya valimos');
window.onload = function() {	
	console.log('hemos llegado hasta acá exitosamente');
	var objElem = document.createElement('object');
	objElem.type = 'application/avplayer';
	objElem.style.left = 100 + 'px';
	objElem.style.top = 200 + 'px';
	objElem.style.width = '1920px';
	objElem.style.height = '1080px';

	document.body.appendChild(objElem);

	webapis.avplay.open('https://freeform.azureedge.net/showms/2018/96/ed13e7ee-4ace-465e-ade9-7fbe3623e93d.m3u8');
	//webapis.avplay.open('https://www.w3schools.com/html/mov_bbb.mp4');
	
	
	var listener = {
		onbufferingstart : function(percent) {
			console.log('Buffering start.' + percent);
		},

		onbufferingprogress : function(percent) {
			console.log('Buffering progress data : ' + percent);
		},

		onbufferingcomplete : function() {
			console.log('Buffering complete.');
		},
		onstreamcompleted : function() {
			console.log('Stream Completed');
			webapis.avplay.stop();
		},

		oncurrentplaytime : function(currentTime) {
			console.log('Current playtime: ' + currentTime);
		},

		onerror : function(eventType) {
			console.log('event type error : ' + eventType);
		},

		onevent : function(eventType, eventData) {
			console.log('event type: ' + eventType + ', data: ' + eventData);
		},

		onsubtitlechange : function(duration, text, data3, data4) {
			console.log('subtitleText: ' + text);
		},
		ondrmevent : function(drmEvent, drmData) {
			console.log('DRM callback: ' + drmEvent + ', data: ' + drmData);
		}
	};
	webapis.avplay.setListener(listener);	
	webapis.avplay.setDisplayMethod('PLAYER_DISPLAY_MODE_LETTER_BOX');	
	webapis.avplay.prepare();	
	var successCallback = function(){
		
	};
	var errorCallback = function(){
		
	};
	
	webapis.avplay.prepareAsync(successCallback, errorCallback);
	
	webapis.avplay.play();
	

};

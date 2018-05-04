//alert('ya valimos');
loadApiContent();
var window = {};
var video_visible;
var actualTime;
var keys = {};
var successCallback = function () {
	console.log('successCallback its ok');
};
var errorCallback = function () {
	console.log('errorCallback hubo un error');
};
window.onload = function () {
	//Create video object
	console.log('hemos llegado hasta acá exitosamente');
	var objElem = document.createElement('object');
	objElem.type = 'application/avplayer';
	objElem.style.left = 100 + 'px';
	objElem.style.top = 200 + 'px';
	objElem.style.width = '1920px';
	objElem.style.height = '1080px';
	//Insert video object as a div child
	document.getElementById('video_visible').appendChild(objElem);
	document.getElementById('video_visible').style.display = 'none';
	//prepare library avplay
	webapis.avplay.open('https://freeform.azureedge.net/showms/2018/96/ed13e7ee-4ace-465e-ade9-7fbe3623e93d.m3u8');
	webapis.avplay.setListener(listener);
	webapis.avplay.setDisplayMethod('PLAYER_DISPLAY_MODE_LETTER_BOX');
	webapis.avplay.prepare();
	webapis.avplay.prepareAsync(successCallback, errorCallback);
	//functions controller buttoms actions
	registerKeys();
	bindEvents();
};

var listener = {
	onbufferingstart: function (percent) {
		console.log('Buffering start.' + percent);
	},

	onbufferingprogress: function (percent) {
		console.log('Buffering progress data : ' + percent);
	},

	onbufferingcomplete: function () {
		console.log('Buffering complete.');
	},
	onstreamcompleted: function () {
		console.log('Stream Completed');
		document.getElementById('video_visible').style.display = 'none';
		webapis.avplay.stop();
	},

	oncurrentplaytime: function (currentTime) {
		console.log('Current playtime: ' + currentTime);
		actualTime = currentTime;
	},

	onerror: function (eventType) {
		console.log('event type error : ' + eventType);
	},

	onevent: function (eventType, eventData) {
		console.log('event type: ' + eventType + ', data: ' + eventData);
	},

	onsubtitlechange: function (duration, text, data3, data4) {
		console.log('subtitleText: ' + text);
	},
	ondrmevent: function (drmEvent, drmData) {
		console.log('DRM callback: ' + drmEvent + ', data: ' + drmData);
	}
};


function registerKeys() {
	var supportedKeys = tizen.tvinputdevice.getSupportedKeys(), i = 0;
	for (i = 0; i < supportedKeys.length; i++) {
		try {
			tizen.tvinputdevice.registerKey(supportedKeys[i].name);
		} catch (e) {
			console.error('failed to register' + supportedKeys[i].name, e);
		}
		keys[supportedKeys[i].code] = supportedKeys[i].name;
		console.log('registro ' + i + ': complete' + keys + ',  keys storage: name:' + keys[supportedKeys[i].code] + ', code: ' + supportedKeys[i].code);
	}
	console.log('keys registers');
	for (var j = 0; j < keys.length; j++) {
		console.log(keys[j]);
	}

}

function bindEvents() {
	// document.addEventListener('tizenhwkey', onDeviceHardwareKeyPress);
	window.addEventListener('keydown', onKeyDownPress);
	console.log('online blind event');
}

function onKeyDownPress(e) {
	console.log('press key');
	console.log(e.keyCode);
	switch (e.keyCode) {
		case this.tvKey.VOL_UP: // 448
			//				if (tizen.tvaudiocontrol.getVolume() === 100) {
			//					console.log('volume 100');
			//				} else {
			//					tizen.tvaudiocontrol.setVolumeUp();
			//					console.log(tizen.tvaudiocontrol.getVolume());
			//				}
			break;
		case this.tvKey.VOL_DOWN: // 447
			//				if (tizen.tvaudiocontrol.getVolume() === 0) {
			//					console.log('volume 0');
			//				} else {
			//					tizen.tvaudiocontrol.setVolumeDown();
			//				}
			break;
		case this.tvKey.MUTE: // 449
			//				if (tizen.tvaudiocontrol.isMute()) {
			//					tizen.tvaudiocontrol.setMute(false);
			//					console.log('no muted');
			//				} else {
			//					tizen.tvaudiocontrol.setMute(true);
			//					console.log('muted');
			//				}
			break;
		case this.tvKey.ENTER: // 13
			console.log('Enter');
			break;
		case this.tvKey.RETURN: //10009
			var salir = confirm('Want to exit from this app?');
			console.log(salir);
			if (salir) {
				window.tizen.application.getCurrentApplication().exit();
			} else {
				console.log('no vas a salir de este bucle infinito LOL :D');
			}
			console.log('return');
			break;
		case this.tvKey.UP: //38
			console.log('Up');
			break;
		case this.tvKey.DOWN: //40
			console.log('Down');
			break;
		case this.tvKey.LEFT: //37
			console.log('Left');
			break;
		case this.tvKey.RIGHT: //39
			console.log('Right');
			break;
		case this.tvKey.REWIND: //412
			webapis.avplay.jumpBackward(5000, successCallback, errorCallback);
			webapis.avplay.play();
			document.getElementById('video_visible').style.display = 'block';
			console.log('Rewind');
			break;
		case this.tvKey.FASTFORWARD: //417
			var newTime = actualTime + 5000;
			console.log(actualTime);
			console.log(newTime);
			webapis.avplay.seekTo(newTime, successCallback, errorCallback);
			webapis.avplay.play();
			document.getElementById('video_visible').style.display = 'block';
			console.log('Fastforward');
			break;
		case this.tvKey.STOP: //413
			if (document.getElementById('video_visible').style.display === 'block') {
				document.getElementById('video_visible').style.display = 'none';
				webapis.avplay.stop();
				console.log('Stop');
			} else {
			}
			break;
		case this.tvKey.PLAY: // 415
			if (document.getElementById('video_visible').style.display === 'none') {
				document.getElementById('video_visible').style.display = 'block';
				webapis.avplay.play();
				console.log('Play');
			} else {
			}
			break;
		case this.tvKey.PAUSE: // 19
			webapis.avplay.pause();
			console.log('Pause');
			break;
		default:
			console.log('no supported key');
			break;
	}
	console.log('end press button');
}

function loadApiContent(e) {
	console.log('entramos al request');
	var xhr = new XMLHttpRequest();
	var url = 'http://api.tvmaze.com/shows/1/episodes';
	xhr.onreadystatechange = function () {
		if (this.readyState === 4 && this.status === 200) {
			console.log('listo para hacer maravillas');
		}
	};
	xhr.open('GET', url, true);
	xhr.send();
	console.log('se ha cargado el json?');
	xhr.onload = function () {
		if (this.status === 200) {
			console.log('llegamos a la entrada del json');
			var content = JSON.parse(this.responseText);
			var output = '';
			content.forEach(function (elemento) {
				output += 'ID: ' + elemento.id + '\n ' +
					'URL: ' + elemento.url + '\n ' +
					'NAME: ' + elemento.name + '\n ' +
					'SEASON: ' + elemento.season + '\n ' +
					'NUMBER: ' + elemento.number + '\n ' +
					'AIRDATE: ' + elemento.airdate + '\n ' +
					'AIRTIME: ' + elemento.airtime + '\n ' +
					'RUNTIME: ' + elemento.runtime + '\n ' +
					'IMAGE: ' + elemento.image.medium + '\n ' +
					'IMAGE: ' + elemento.image.original + '\n ' +
					'SUMMARY: ' + elemento.summary + '\n ' +
					'LINKS: ' + elemento._links.self.href + '\n ';
			});
			console.log(this.responseText);
			console.log(output);
			console.log('llegamos al final del json');
		}
	};
}

//alert('ya valimos');
window.onload = function () {
	//audio API
	
	//audiodevice
//	var audiocontrol = deviceapis.audiocontrol;
	var tvKey= {
			VOL_UP: 448,
			VOL_DOWN: 447,
			MUTE: 449,
			ENTER: 13,
			RETURN: 10009,
			EXIT: 10182,
			UP: 38,
			DOWN: 40,
			LEFT: 37,
			RIGHT: 39,
			REWIND: 412,
			FASTFORWARD: 417,
			REC: 416,
			PAUSE: 19,
			PLAY: 415,
			STOP: 413,
		};
	
	// define vars to detected keydown
	var keys = {};
//	var DEFAULT_KEYS = {
//		'13': 'Enter',
//		'37': 'ArrowLeft',
//		'38': 'ArrowUp',
//		'39': 'ArrowRight',
//		'40': 'ArrowDown',
//	};
//	var UNSOPPORTED_KEY_CLASS = 'unsupported-key', INVISIBLE_KEY_CLASS = 'invisible', buttonNameEl = null, buttonCodeEl = null, waitingEl = null, pressedStatusEl = null;

	console.log('hemos llegado hasta acá exitosamente');
	var objElem = document.createElement('object');
	objElem.type = 'application/avplayer';
	objElem.style.left = 100 + 'px';
	objElem.style.top = 200 + 'px';
	objElem.style.width = '1920px';
	objElem.style.height = '1080px';

	document.body.appendChild(objElem);

	webapis.avplay
		.open('https://freeform.azureedge.net/showms/2018/96/ed13e7ee-4ace-465e-ade9-7fbe3623e93d.m3u8');
	// webapis.avplay.open('https://www.w3schools.com/html/mov_bbb.mp4');

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
			webapis.avplay.stop();
		},

		oncurrentplaytime: function (currentTime) {
			console.log('Current playtime: ' + currentTime);
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
	webapis.avplay.setListener(listener);
	webapis.avplay.setDisplayMethod('PLAYER_DISPLAY_MODE_LETTER_BOX');
	webapis.avplay.prepare();
	var successCallback = function () {

	};
	var errorCallback = function () {

	};

	webapis.avplay.prepareAsync(successCallback, errorCallback);
	registerKeys();
	bindEvents();
	// webapis.avplay.play();

	function registerKeys() {
		var supportedKeys = tizen.tvinputdevice.getSupportedKeys(), i = 0;
		for (i = 0; i < supportedKeys.length; i++) {
			try {
				tizen.tvinputdevice.registerKey(supportedKeys[i].name);
			} catch (e) {
				console.error('failed to register' + supportedKeys[i].name, e);
			}
			keys[supportedKeys[i].code] = supportedKeys[i].name;
			console.log('registro ' + i + ': complete' + keys+ ',  keys storage: name:' + keys[supportedKeys[i].code]+ ', code: ' + supportedKeys[i].code);
		}
		console.log('keys registers');
		for (var j = 0; j < keys.length; j++) {
			console.log(keys[j]);
		}

	}

	function onKeyDownPress(e) {
		console.log('press key');
		console.log(e.keyCode);
		switch (e.keyCode) {
			case tvKey.VOL_UP: // 448
				console.log(tizen.tvaudiocontrol.isMute());
				console.log(tizen.tvaudiocontrol.getVolume());
				console.log(tizen.tvaudiocontrol.toString());
				console.log(tizen.tvaudiocontrol.setVolumeUp());
				console.log(tizen.tvaudiocontrol.getVolume());
//				if (tizen.tvaudiocontrol.getVolume() === 100) {
//					console.log('volume 100');
//				} else {
//					tizen.tvaudiocontrol.setVolumeUp();
//				}
				break;
			case tvKey.VOL_DOWN: // 447
				if (tizen.tvaudiocontrol.getVolume() === 0) {
					console.log('volume 0');
				} else {
					tizen.tvaudiocontrol.setVolumeDown();
				}
				console.log('se ha bajado el volumen');
				break;
			case tvKey.MUTE: // 449
//				if (tizen.tvaudiocontrol.isMute()) {
//					tizen.tvaudiocontrol.setMute(false);
//					console.log('no muted');
//				} else {
//					tizen.tvaudiocontrol.setMute(true);
//					console.log('muted');
//				}
				break;
			case tvKey.ENTER: // 13
				console.log('Select');
				break;
			case tvKey.RETURN: //10009
				console.log('return');
				break;
			case tvKey.UP: //38
				console.log('Up');
				break;
			case tvKey.DOWN: //40
				console.log('Down');
				break;
			case tvKey.LEFT: //37
				console.log('Left');
				break;
			case tvKey.RIGHT: //39
				console.log('Right');
				break;
			case tvKey.REWIND: //412
				console.log('Rewind');
				break;
			case tvKey.FASTFORWARD: //417
				console.log('Fastforward');
				break;
			case tvKey.STOP: //413
				console.log('Stop');
				break;
			case tvKey.PLAY: // 415
				console.log('Play');
				webapis.avplay.play();
				break;
			case tvKey.PAUSE: // 19
				console.log('Pause');
				webapis.avplay.pause();
				break;
			default:
				console.log('no supported key');
				break;
		}
		console.log('end press button');
	}

	function bindEvents() {
		document.addEventListener('tizenhwkey', onDeviceHardwareKeyPress);
		window.addEventListener('keydown', onKeyDownPress);
		console.log('online blind event');
	}

	function onDeviceHardwareKeyPress(e) {
		if (e.keyName === 'back') {
			Window.exit();
		}
	}

};

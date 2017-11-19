myVoiceIt = require('VoiceIt');

myVoiceIt.initialize('1d6361f81f3047ca8b0c0332ac0fb17d');
//Pass your 32 digit developer id as parameter to the intialize method like shown above

myVoiceIt.authenticationByWavURL({
	userId: 'eshaan',
	password: 'FaceHack2017',
	urlToAuthenticationWav: 'https://voiceit.tech/voicePrint.wav',
	contentLanguage: 'en-US',
	callback: function(response){
	swal("Logged In.");
	}
});

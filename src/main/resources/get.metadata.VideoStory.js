/*
 Copyright 2015-2016 Eduworks Corporation and other contributing parties.

 Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
*/
function metadataVideoStory(){
	lazyJsLibrary();

	var vs = new VideoStory();

	var videoFile = fileFromDatastream.call(this,"file",null,"false");
	var videoHash = stringToHex(fileHash(videoFile));
	fileSave(videoFile,"/var/www/html/videos/"+videoHash+".mp4",false,false);
	debug(fileSize(videoFile));
	debug(runProcess([
		"ffmpeg",
		"-y",
		"-i",
		"/var/www/html/videos/"+videoHash+".mp4",
		"-vn",
		"-acodec",
		"pcm_s16le",
		"-f",
		"wav",
		"-ar",
		"8000",
		"-ac",
		"1",
		"convert/"+this.params.threadId+".wav"
	]));
	debug(runProcess([
       		"ffmpeg",
       		"-y",
       		"-i",
       		"/var/www/html/videos/"+videoHash+".mp4",
       		"-ss",
       		"00:00:01",
       		"-vframes",
       		"1",
       		"/var/www/html/videos/"+videoHash+".jpg"
       	]));
	var audioFile = fileLoad("convert/"+this.params.threadId+".wav");
	debug(audioFile);
	debug(fileSize(audioFile));
	if (cache === undefined || cache == null)
		cache = {};
	if (cache[videoHash] != null)
		vs.text = cache[videoHash];
	else
		vs.text = speechToText.call(this,audioFile)[0].text;
	cache[videoHash] = vs.text;
	debug(vs.text);
	if (vs.text != null && vs.text !== undefined)
		vs.text = vs.text.replace(/\<unk\> /g,"");
	fileDelete("convert/"+this.params.threadId+".wav");
	vs.name = "Please provide a title for this story.";
	vs.embedUrl = "https://angles.eduworks.org/videos/"+videoHash+".mp4";
	vs.encodingFormat = "video/mp4";
	vs.thumbnailUrl = "https://angles.eduworks.org/videos/"+videoHash+".jpg";
	vs.description = "Please fill out the description.";
	vs.keywords = keywords(vs.text);
	vs.learningResourceType = "story";
	vs.interactivityType = "expositive";

	vs.generateId("https://angles.eduworks.org/api/");
	//EcRepository.save(vs);

	return JSON.stringify(vs);
}

bindWebService("/metadata/VideoStory",metadataVideoStory);


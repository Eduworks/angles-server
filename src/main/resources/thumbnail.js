/*
 Copyright 2015-2016 Eduworks Corporation and other contributing parties.

 Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
*/
function thumbnail(){
        var ts = "00:00:00";
        if (this.params.t != null)
          ts = this.params.t;
        if (ts.match(/^([0-1][0-9]|2[0-3]):([0-5][0-9])(?::([0-5][0-9]))?(.[0-9][0-9]?)?$/) == null)
        {
                error("Incorrect timestamp format. Must be in form 00:00:00",400);
                return;
        }
        if (this.params.urlRemainder.indexOf("..") != -1 || fileExists("/var/www/html/videos"+this.params.urlRemainder,false,false) == false)
        {
                error("Video does not exist.",400);
                return;
        }
        if (!fileExists("/tmp"+this.params.urlRemainder+"."+ts+".jpg",false,false))
        runProcess([
                "ffmpeg",
                "-y",
                "-i",
                "/var/www/html/videos"+this.params.urlRemainder,
                "-ss",
                ts,
                "-vframes",
                "1",
                "/tmp"+this.params.urlRemainder+"."+ts+".jpg"
        ]);
        var file = fileLoad("/tmp"+this.params.urlRemainder+"."+ts+".jpg",false,false);
        return file;
}
bindWebService("/thumbnail",thumbnail);

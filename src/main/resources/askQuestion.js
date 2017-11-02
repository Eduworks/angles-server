/*
 Copyright 2015-2016 Eduworks Corporation and other contributing parties.

 Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
*/
/**
 * Searches schema.org/Question objects matching the search query string (provided in HTTP GET parameter "q") and returns the first VideoStory that answers that question.
 *
 * @author: Ewald Enzinger <ewald.enzinger@eduworks.com>
 *
 * @return {JSONObject}|""      A VideoStory object, or an empty string.
 *
 * @method get
 */

function answerWithVideoStory(){
	lazyJsLibrary();
	EcRemote.async = false; // This will force code to run synchronously.
	result = "";

	var repo = new EcRepository();
    repo.selectedServer = "https://angles.eduworks.org/api/";
	questionResults = repo.searchBlocking(new Question().getSearchStringByType() + " AND (" + EcRepository.escapeSearch(this.params.q) + ")").debug();
    for (var i = 0; i < questionResults.length; i++) {
        var q = new Question();
        q.copyFrom(questionResults[i]);
        relationResults = repo.searchBlocking(new Relation().getSearchStringByType() + " AND (target:\"" + q.shortId() + "\")");
        if (relationResults.length > 0) {
            var r = new Relation();
            r.copyFrom(relationResults[0]);
            vsResult = EcRepository.getBlocking(r.source);
            var vs = new VideoStory();
            vs.copyFrom(vsResult);
            vs.name = q.text;
            result = JSON.stringify(vs);
        }
    }
    return result;
}

bindWebService("/askQuestion",answerWithVideoStory);

/**
 * Searches schema.org/Question objects matching the search query string (provided in HTTP GET parameter "q") and returns the first VideoStory that answers that question, along with questions raised by that VideoStory.
 *
 * @author: Ewald Enzinger <ewald.enzinger@eduworks.com>
 *
 * @return {JSONObject}|""      A JSON object with two members, "VideoStory" and "raisedQuestions", or an empty string.
 *                              raisedQuestions contains an array of questions raised by the VideoStory
 *
 * @method get
 */
function answerWithVideoStoryAndRaisedQuestions(){
	lazyJsLibrary();
	EcRemote.async = false; // This will force code to run synchronously.
	result = "";

	var repo = new EcRepository();
    repo.selectedServer = "https://angles.eduworks.org/api/";
	questionResults = repo.searchBlocking(new Question().getSearchStringByType() + " AND (" + EcRepository.escapeSearch(this.params.q) + ")").debug();
    for (var i = 0; i < questionResults.length; i++) {
        var q = new Question();
        q.copyFrom(questionResults[i]);
        relationResults = repo.searchBlocking(new Relation().getSearchStringByType() + " AND (target:\"" + q.shortId() + "\")");
        if (relationResults.length > 0) {
            var r = new Relation();
            r.copyFrom(relationResults[0]);
            vsResult = EcRepository.getBlocking(r.source);
            var vs = new VideoStory();
            vs.copyFrom(vsResult);
            vs.name = q.text;
            result = JSON.stringify(vs);
            var raisedQuestions = new Array();
                raisedResults = repo.searchBlocking(new Relation().getSearchStringByType() + " AND (source:\"" + vs.shortId() + "\") AND \"http://schema.eduworks.com/angles/0.1/relations/raises\"");
                for (var j = 0; j < raisedResults.length; j++) {
                    var rr = new Relation();
                    rr.copyFrom(raisedResults[j]);
                    if (rr.target.indexOf(new Question().type) != -1) {
                        raisedQuestion = EcRepository.getBlocking(rr.target);
                        var qq = new Question();
                        qq.copyFrom(raisedQuestion);
                        raisedQuestionAnswersResults = repo.searchBlocking(new Relation().getSearchStringByType() + " AND (target:\"" + qq.shortId() + "\") AND \"http://schema.eduworks.com/angles/0.1/relations/answers\"");
                        if (raisedQuestionAnswersResults.length > 0) {
                            raisedQuestions.push(qq);
                        }
                    }
                }
            result = '{VideoStory:' + JSON.stringify(result) + ', raisedQuestions:' + JSON.stringify(raisedQuestions) + '}';
            break;
        }
    }
    return result;
}

bindWebService("/askQuestionAndGetRaisedQuestions",answerWithVideoStoryAndRaisedQuestions);



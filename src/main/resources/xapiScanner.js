/*
 Copyright 2015-2016 Eduworks Corporation and other contributing parties.

 Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
*/
//var xapiEndpoint = "http://tla-core.adlnet.gov:8000/xapi/";
//var xapiHostname = "http://tla-core.adlnet.gov:8000";
//var xapiAuthorization = "Basic ";
////xapiAuthorization = "Basic ";
////xapiHostname="https://lrs.adlnet.gov";
////xapiEndpoint="https://lrs.adlnet.gov/xapi/";
//var since = null;
//
//function xapiGet(more)
//{
//    var url;
//    if (more != null)
//        url = xapiHostname + more;
//    else if (since != null)
//        url = xapiEndpoint + "statements?format=exact&limit=0&since=" + since;
//    else
//        url = xapiEndpoint + "statements?format=exact&limit=0";
//    var result = httpGet.call(this, url, {"X-Experience-API-Version": "1.0.1", "Authorization": xapiAuthorization});
//    print(result);
//    print(JSON.stringify(result));
//    if (result === undefined)
//        return null;
//    return result;
//}
//
//function xapiCheck(statement)
//{
//    if (statement.verb.id.contains("asked"))
//    {
//        print("ASKED");
//        print(JSON.stringify(statement));
//    }
//    if (statement.verb.id.contains("answered"))
//    {
////        return;
//        if (statement.result != null)
//        {
//            if (statement.result.success == false)
//            {
//                var v = getQuestionContent.call(this, statement);
//                suggest.call(this,
//                        statement.actor.account.name,
//                        v,
//                        statement.object.definition.name.en, statement
//                        );
//            }
//        }
//    }
//}
//
//function getQuestionContent(statement)
//{
//    var s = "";
//    if (statement.object.definition != null)
//    {
//        if (statement.object.definition.name != null)
//            s += statement.object.definition.name.en;
//        if (statement.object.definition.choices != null)
//            for (var i = 0; i < statement.object.definition.choices.length; i++)
//                s += " " + statement.object.definition.choices[i].description.en;
//    }
//    return s;
//}
//
//function xapiLoop()
//{
//    var more = null;
//    do
//    {
//        var latest = xapiGet.call(this, more);
//        if (latest == null)
//            break;
//
//        more = latest.more;
//        if (more == "")
//            more = null;
//
//        if (latest.statements != null)
//            for (var i = 0; i < latest.statements.length; i++)
//                xapiCheck.call(this, latest.statements[i]);
//    }
//    while (more != null);
//    since = date.call(this, null, "yyyy-MM-dd'T'HH:mm:ssXXX");
//}
//
//bindWebService("/xapiLoop", xapiLoop);
//
//var fakeThis = {ctx: new com.eduworks.resolver.Context(), parameters: null, dataStreams: null};
//
//call(function ()
//{
//    xapiLoop.call(fakeThis);
//}, {}, "true");

/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        //alert('Received Event: ' + id);
		
		//document.getElementById("uploadFile").addEventListener("click", uploadFile);
		document.getElementById("downloadFile").addEventListener("click", downloadFile);
    }
};

function downloadFile() {
	alert("Downloading...");
   var fileTransfer = new FileTransfer();
    //var uri = encodeURI("http://s14.postimg.org/i8qvaxyup/bitcoin1.jpg");
   var uri = encodeURI("http://dpsuk.isolveit.in/download.php?fid=686679f08be18f4b86462032924a553c");
  // var fileURL =  cordova.file.dataDirectory;
	var fileURL = cordova.file.externalRootDirectory;
  
   fileTransfer.download(
      uri, fileURL + "/DPSUK/test.pdf", function(entry) {
         alert("Download complete!\n Stoared at: " + entry.toURL());
      },
		
      function(error) {
         alert("Download error source " + error.source);
         alert("Download error target " + error.target);
         alert("Download error code" + error.code);
      },
		
      false, {
         // headers: {
            // "Authorization": "Basic dGVzdHVzZXJuYW1lOnRlc3RwYXNzd29yZA=="
         // }
      }
   );
}
function uploadFile() {
	alert("Upload");
   var fileURL = "file:///storage/sdcard0/qs.pid"
   var uri = encodeURI("http://posttestserver.com/post.php");
   var options = new FileUploadOptions();
   options.fileKey = "file";
   options.fileName = fileURL.substr(fileURL.lastIndexOf('/')+1);
   options.mimeType = "text/plain";
   
   var headers = {'headerParam':'headerValue'};
   options.headers = headers;
   var ft = new FileTransfer();
   ft.upload(fileURL, uri, onSuccess, onError, options);

   function onSuccess(r) {
      alert("Code = " + r.responseCode);
      alert("Response = " + r.response);
      alert("Sent = " + r.bytesSent);
   }

   function onError(error) {
      alert("An error has occurred: Code = " + error.code);
      alert("upload error source " + error.source);
      alert("upload error target " + error.target);
   }
	
}

app.initialize();
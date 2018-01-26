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
		document.addEventListener("backbutton", onBackKeyDown, false);
		document.getElementById("validate").addEventListener("click", validate);
		document.getElementById("fetchList").addEventListener("click", fetchList);
		
    }
};

function onBackKeyDown(e) {
	e.preventDefault();
	// Beep once!
	navigator.notification.beep(1);
	navigator.notification.confirm("Are you sure you want to exit ?", onConfirm, "Confirmation", "Yes,No"); 
	// Prompt the user with the choice
}

function onConfirm(button) {
	if(button==2||button=="2"){//If User selected No, then we just do nothing
		return;
	}else{
		
		navigator.app.exitApp();// Otherwise we quit the app.
	}
}

function validate(){
	var levelSelect = document.getElementById("level");
	var level = levelSelect.options[levelSelect.selectedIndex].value;
	
	var streamSelect = document.getElementById("stream");
	var stream = streamSelect.options[streamSelect.selectedIndex].value;
	
	var yearSelect = document.getElementById("year");
	var year = yearSelect.options[yearSelect.selectedIndex].value;
	
	if(level.length <=0){
		alert("Please Select Level.");
		return false;
	}
	if(stream.length <=0){
		alert("Please Select Stream.");
		return false;
	}
	if(year.length <=0){
		alert("Please Select Year.");
		return false;
	}
	else{
		fetchList();
	}

}

function fetchList(){
	var levelSelect = document.getElementById("level");
	var level = levelSelect.options[levelSelect.selectedIndex].value;
	
	var streamSelect = document.getElementById("stream");
	var stream = streamSelect.options[streamSelect.selectedIndex].value;
	
	var yearSelect = document.getElementById("year");
	var year = yearSelect.options[yearSelect.selectedIndex].value;
	
	// alert(level+stream+year);
	
	window.plugins.spinnerDialog.show(null,"Fetching Papers..","true");
	$.getJSON("http://dpsuk.isolveit.in/download.php",
			"level="+level+"&stream="+stream+"&year="+year,
		function(data)
		{
			window.plugins.spinnerDialog.hide();
			document.getElementById("select").style.visibility = "hidden";
			document.getElementById("gotoHome").style.visibility = "visible";
			
			paperList = document.getElementById("list");
	
			var levelSelect = document.getElementById("level");
			var level = levelSelect.options[levelSelect.selectedIndex].text;
			
			var streamSelect = document.getElementById("stream");
			var stream = streamSelect.options[streamSelect.selectedIndex].text;
			
			var yearSelect = document.getElementById("year");
			var year = yearSelect.options[yearSelect.selectedIndex].text;
			
			paperList.innerHTML = "Displaying papers for:<br><b>"+stream+" - "+level+" - "+year+"</b>.<br><br>";
			
			if(data.length <=0 ){
				paperList.innerHTML = paperList.innerHTML + "<font color=\"red\">No Paper Uploaded!!!<br> Please contact Administrator / Librarian.</font>";
				return false;
			}
			else{
				data.forEach(listPapers);
			}
		})
		.fail(function(data,status,err) 
		{
			window.plugins.spinnerDialog.hide();
			//location.reload();
			alert("Error in Fetching Papers!!!\nData: "+data+"\nStatus: "+status+"\nError: "+err);
			
		});
		
}
function downloadFile(param) {
	//alert(param);
	
			d = '"'+ param;
			bits =	d.split(/[\s]+/);
			filename = bits[bits.length - 4]+bits[bits.length - 3]+bits[bits.length - 2]+bits[bits.length - 1];
		
	
	window.plugins.spinnerDialog.show(null,"Downloading..","true");
	var fileTransfer = new FileTransfer();
   
	
    //var uri = encodeURI("http://s14.postimg.org/i8qvaxyup/bitcoin1.jpg");
   // var uri = encodeURI("http://dpsuk.isolveit.in/download.php?fid=686679f08be18f4b86462032924a553c");
   
   var uri = encodeURI(param);
  // var fileURL =  cordova.file.dataDirectory;
	var fileURL = cordova.file.externalRootDirectory;
  
   fileTransfer.download(
      uri, fileURL + "/DPSUK/"+filename, function(entry) {
		window.plugins.spinnerDialog.hide();
         alert("Download complete!\n Stoared at: \n" + entry.toURL());
      },
		
      function(error) {
		window.plugins.spinnerDialog.hide();
		//alert("Downloading Error: "+ error.code);
		switch(error.code){
			case 1:
				alert("Downloading Error: FILE NOT FOUND.");
				break;
			case 2:
				alert("Downloading Error: INVALID URL.");
				break;
			case 3:
				alert("Downloading Error: CHECK YOUR INTERNET CONNECTION.");
				break;
			case 4:
				alert("Downloading Error: OPERATION ABORTED.");
				break;
			case 5:
				alert("Downloading Error: NOT MODIFIED");
				break;
			default:
				alert("Downloading Error Occurred.");
				break;
		}
         // alert("Download error source " + error.source);
         // alert("Download error target " + error.target);
         // alert("Download error code" + error.code);
      },
		
      false, {
         // headers: {
            // "Authorization": "Basic dGVzdHVzZXJuYW1lOnRlc3RwYXNzd29yZA=="
         // }
      }
   ); 
   
   

   // fileTransfer.onprogress = function(progressEvent) {
		// if (progressEvent.lengthComputable) {
			// loadingStatus.setPercentage(progressEvent.loaded / progressEvent.total);
		// } else {
			// loadingStatus.increment();
		// }
	// };
	
}
function listPapers(item, index) {

	paperList = document.getElementById("list");
	
	d = '"'+ item;
	bits =	d.split(/[\s]+/);
	

	filename = bits[bits.length - 4]+" "+bits[bits.length - 3]+" "+bits[bits.length - 2]+" "+bits[bits.length - 1];
	
    paperList.innerHTML = paperList.innerHTML + "<button onclick=\"downloadFile('"+item+"')\"> Get "+filename+"</button>"; 
}
/*function uploadFile() {
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
	
}*/

app.initialize();
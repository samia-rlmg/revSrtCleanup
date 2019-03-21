// Convert Rev file to SRT

var revFile = File.openDialog("Choose a Rev file.");
var filePath = revFile.path+"/"+revFile.name;
var nameSplit = revFile.name.split(".");
var srtFile = revFile.path + "/" + nameSplit[nameSplit.length-1] + ".srt";

alert(srtFile);


  revFile.open('r'); //open file in read-only mode

  // //Count the lines of captions
  // var nlines = 0;
  // while(!revFile.eof) {
  //   if (revFile.readln() != null) {
  //     nlines++;
  //   }
  // }
  // revFile.close();


  var str;

  revFile.open('r'); //open file in read-only mode
  while(!captionsFile.eof) {

    str = captionsFile.readln();
    str.split('\t');
    alert(str);

  }
  captionsFile.close();

  //Set the average length of a caption layer (divide total duration by number of captions)
  // var clipDuration = activeComp.duration / nlines;
  // var timestamp, inpoint, outpoint;
  //
  // for (i=0; i<captionNumArr.length; i++) {
  //   var newTextLayer = activeComp.layers.addText("a"); // Create a new text layer
  //   newTextLayer.sourceText.setValue(captionTextArr[i]); // Add text to the layer
  //
  //   // Set the anchor point and position of the text layer
  //   newTextLayer.property("Anchor Point").setValue([newTextLayer.sourceRectAtTime(0,false).width/2,0]);
  //   newTextLayer.property("Position").setValue([newTextLayer.width/2,newTextLayer.height*.90]);
  //
  //   timestamp = timeCodeArr[i].split(/:|,| --> /); // Split up the timecode as given by the SRT file
  //
  //   //Define the inpoint and outpoint based on the timecodes in the SRT file
  //   inpoint = parseFloat(timestamp[0])*3600 + parseFloat(timestamp[1])*60 + parseFloat(timestamp[2]) + parseFloat(timestamp[3])/1000;
  //   outpoint = parseFloat(timestamp[4])*3600 + parseFloat(timestamp[5])*60 + parseFloat(timestamp[6]) + parseFloat(timestamp[7])/1000;
  //
  // }

//This script ingests a text file and creates a new text layer for each line.
// Steps:
// 1. Create a text file with the script broken up so that each caption is its own line.
// 2. Import the video file into After Effects.
// 3. Make any font specifications in the "Character" panel in After Effects.
// 4. Select the composition that contains the video file.
// 5. Go to File > Scripts > Run Script File and select this file.
// 6. Follow the directions, which will prompt you to select your caption file. 

// Only proceed if active comp exists
if (activeComp != null) {

  if (confirm("You must make any font specifications in the 'Character' Panel before continuing.\nReady to proceed?")) {

  var captionsFile = File.openDialog("Choose file containing captions.");
  var filePath = captionsFile.path+"/"+captionsFile.name;

  captionsFile.open('r'); //open file in read-only mode

  //Count the lines of captions
  var nlines = 0;
  while(!captionsFile.eof) {
    if (captionsFile.readln() != null) {
      nlines++;
    }
  }
  captionsFile.close();

  //Set the average length of a caption layer (divide total duration by number of captions)
  var clipDuration = activeComp.duration / nlines;

  captionsFile.open('r'); //open file in read-only mode
  var str = "";
  var inpoint = 0;
  while(!captionsFile.eof) {

      str = captionsFile.readln();
      var newTextLayer = activeComp.layers.addText("a");
      newTextLayer.sourceText.setValue(str);

    //Set font properties. Instructions here: https://www.aenhancers.com/viewtopic.php?t=3084
    var textLayerProp = newTextLayer.property("ADBE Text Properties").property("ADBE Text Document");

    //Any text properties can be hard-coded below. However, any properties set prior to running the script will be automatically applied to new text layers.
    var textLayerDoc = textLayerProp.value;
    //textLayerDoc.font = "Arial-BoldMT";
    //textLayerDoc.fontSize = 100;
    //textLayerDoc.fillColor = [68,197,110];
    // textLayerDoc.applyStroke = false;
    //textLayerDoc.justification = ParagraphJustification.CENTER_JUSTIFY;
    // textLayerDoc.tracking = 30;
    // textLayerDoc.kerning = "Metrics";

    textLayerProp.setValue(textLayerDoc); //Apply above-set properties to text layer

    //FIX THIS. As of now, this has to come second to override the previous property setting.
    newTextLayer.property("Anchor Point").setValue([newTextLayer.sourceRectAtTime(0,false).width/2,0]);
    newTextLayer.property("Position").setValue([newTextLayer.width/2,newTextLayer.height*.90]);

    //Set duration of clip
    newTextLayer.inPoint = inpoint;
    newTextLayer.outPoint = inpoint + clipDuration;
    inpoint = inpoint + clipDuration;
  }
  captionsFile.close();

}

}

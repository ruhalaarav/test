prediction1 = ""
prediction2 = ""

Webcam.set({
height:350,
width:300,
image_format:'png',
png_format:90
})

camera = document.getElementById("camera");

function take_snapshot(){
    Webcam.snap(
        function(data_uri){
            document.getElementById("result").innerHTML='<img id="snap" src="'+data_uri+'">'
        }

    )
}


console.log('ml5 version', ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/5mxzZHkpx/model.json',modelLoaded)

function modelLoaded (){
    console.log('model has been loaded!');
}


function speak(){
    var synth = window.speechSynthesis;
    diag1 = "The First Prediction Is"+ prediction1;
    diag2 = "and Second Prediction Is"+ prediction2;
    var utterThis = new SpeechSynthesisUtterance(diag1 + diag2);
    synth.speak(utterThis);
}

function check(){
    img = document.getElementById("snap");
    classifire.classify(img, gotResult )
}

function gotResult(error,result){
    if (error) {
        console.log(error)
    } else {
       console.log(result) 

       document.getElementById("result_emotion_name").innerHTML= result[0].label;

       document.getElementById("result_emotion_name2").innerHTML= result[1].label;

       prediction1 = result[0].label;
       prediction2 =  result[1].label;

       speak()

       if (prediction1 == happy) {
        document.getElementById("update_emoji1").innerHTML = ""
       }
    }
}
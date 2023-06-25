const URL = "https://teachablemachine.withgoogle.com/models/hBKYa4zJe/";

let model, webcam, labelContainer, maxPredictions;

async function init() {

  
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";

    
    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();

    
    const flip = true; 
    webcam = new tmImage.Webcam(400, 400, flip);
    await webcam.setup();
    await webcam.play();
    window.requestAnimationFrame(loop);
    
    document.getElementById("start_button").classList.add('removed');

   
    document.getElementById("webcam-container").appendChild(webcam.canvas);
    labelContainer = document.getElementById("label-container");
    for (let i = 0; i < maxPredictions; i++) { 
        labelContainer.appendChild(document.createElement("div"));
    }
}

async function loop() {
    webcam.update(); 
    await predict();
    window.requestAnimationFrame(loop);
}


async function predict() {
    
    const prediction = await model.predict(webcam.canvas);


    for (let i = 0; i < maxPredictions; i++) {
        pred_class = prediction[i].className
        pred_score = prediction[i].probability.toFixed(2)

        action(pred_class, pred_score)
        
        const classPrediction = pred_class + ": " + pred_score;
        console.log(classPrediction)

        labelContainer.childNodes[i].innerHTML = classPrediction;
    }
}


var audio = new Audio('mask.mp3');
var first_time = true;  
    
function play(){
    console.log(audio.ended);
    
    if (first_time){
        audio.play();
        first_time = false;
    }
    if (audio.ended){
       
        audio.play();
    }
    else{
       
        }
    
    }   

function action(pred_class, pred_score){
    if (pred_class=='No Mask' && pred_score>0.5){
        play();
    }

}

// let imgElement = document.getElementById("imageSrc")
// let inputElement = document.getElementById("fileInput");
// inputElement.addEventListener("change", (e) => {
//   imgElement.src = URL.createObjectURL(e.target.files[0]);
// }, false);
window.onload=function(){
document.getElementById("video-filters").style.display="none";
document.getElementById("takeVid").addEventListener("click",function(){
    plainVid();
})

}

function plainVid(){
    document.getElementById("videoPlaceholder").style.display="none";
    document.getElementById("video-filters").style.display="unset";
    runVid();
    


}
function runVid(){
    let video = document.getElementById("input_video"); // video is the id of video tag
navigator.mediaDevices.getUserMedia({ video: true, audio: false })
    .then(function(stream) {
        video.srcObject = stream;
        video.play();
    })
    .catch(function(err) {
        console.log("An error occurred! " + err);
    });

    let src = new cv.Mat(height, width, cv.CV_8UC4);
    let dst = new cv.Mat(height, width, cv.CV_8UC1);
    let cap = new cv.VideoCapture(videoSource);
    const FPS = 30;
    function processVideo() {
        let begin = Date.now();
        cap.read(src);
        cv.cvtColor(src, dst, cv.COLOR_RGBA2GRAY);
        cv.imshow("output_vid", dst);
        // schedule next one.
        let delay = 1000/FPS - (Date.now() - begin);
        setTimeout(processVideo, delay);
    }
    // schedule first one.
    setTimeout(processVideo, 0);
}



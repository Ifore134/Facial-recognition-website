window.onload = function() {
    document.getElementById("magic").addEventListener("click",function(){
        playVideo();
        inverseColors();
    });
}


// function onOpenCvReady() {
//     let video = document.getElementById('video');
//     let canvas = document.getElementById('canvas');
//     let cap = new cv.VideoCapture(video);

//     // Start the video stream
//     navigator.mediaDevices.getUserMedia({ video: true })
//     .then(function(stream) {
//         video.srcObject = stream;
//         video.play();
//     })
//     .catch(function(err) {
//         console.log("An error occurred: " + err);
//     });

//     // Create a loop to read frames from the video stream
//     const FPS = 30;
//     function processVideo() {
//         cap.read(frame);
//         cv.imshow(canvas, frame);
//         setTimeout(processVideo, 1000/FPS);
//     }
//     setTimeout(processVideo, 0);
// }
function inverseColors(){
    let vid = document.getElementById("input_video");
    vid = 255-vid
}

async function playVideo() {
    let video = document.getElementById('input_video'); //add a video tag with id videoElement
    let frame = new cv.Mat(video.height, video.width, cv.CV_8UC4)

    const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
    if ("srcObject" in video) {
        video.srcObject = mediaStream;
    } else {
        // Avoid using this in new browsers, as it is going away.
        video.src = URL.createObjectURL(mediaStream);
    }
    video.onloadedmetadata = () => {
      video.play();
    };
    cv.imshow('output_video', frame);
}

async function onCVLoad() {
    if (cv.getBuildInformation) {
        console.log(cv.getBuildInformation());
        playVideo();
    }
    else {
        // WASM
        if (cv instanceof Promise) {
            cv = await cv;
            console.log(cv.getBuildInformation());
            playVideo();
        } else {
            cv['onRuntimeInitialized'] = () => {
                console.log(cv.getBuildInformation());
                playVideo();
            }
        }
    }
}

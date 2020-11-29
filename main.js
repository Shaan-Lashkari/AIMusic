scoreLeftWrist = 0;
scoreRightWrist = 0;
song_status_left = "";
song_status_right = "";
song1 = "";
song2 = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
function preload() {
    song1 = loadSound("Chhallang-1.mp3");
    song2 = loadSound("NMRRSONG1.mp3");


}
function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();
    canvas.position(572.5, 300);

    
    
    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);

    poseNet.on('pose', gotPoses);

    
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;

       // console.log("LeftWrist X = " + leftWristX + "-Left Wrist Y = " + leftWristY);

       // console.log("right Wrist X = " + rightWristX + "-Right Wrist Y = " + rightWristY);

        scoreLeftWrist = results[0].pose.keypoints[9].score;
        scoreRightWrist = results[0].pose.keypoints[10].score;
        if (scoreLeftWrist > 0.2) {
            song_status_left = true;
            song2.stop();

            if (song1.isPlaying() == false) {
                song1.play();
            }
        }
        else if (scoreRightWrist > 0.2) {
            song_status_right = true;
            song1.stop();

            if (song2.isPlaying() == false) {
                song2.play();
            }
        }
    }
}
function modelLoaded() {
    console.log("Synced with Posenet !!! :)");
    
}

function draw() {
    
    image(video, 0, 0, 600, 500);
    noStroke();
    fill(255, 0, 0);
    
    circle(leftWristX, leftWristY, 30);
    circle(rightWristX, rightWristY, 30);
   
}

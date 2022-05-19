let img = "";
let status_ = false;
let objects = [];

async function preload() {
  img = loadImage("./th.webp");
}

async function setup() {
  const canvas = createCanvas(640, 420);
  canvas.center();

  let objectDetector = ml5.objectDetector("cocossd", () => {
    console.log("Model Loaded.");

    status_ = true;

    objectDetector.detect(img, (err, res) => {
      if (err) {
        console.error(err);
      } else {
        console.log(res);
      }
    });
  });

  document.getElementById("status").innerHTML = "Status: Detecting object.";
}

async function draw() {
  image(img, 0, 0, 640, 480);

  if (status_ != false) {
    document.getElementById("status").innerHTML = "Status: Object detected.";
    for (i = 0; i < objects.length; i++) {
      fill("#FF0000");
      percent = Math.floor(objects[i].confidence * 100);
      text(`${objects[i].label} ${percent}%`, objects[i].x, objects[i].y);
      noFill();
      stroke("#FF0000");
      rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
    }
  }

  for (j = 0; j < objects.length; j++) {
    fill("#FF0000");
    text(objects[j].label, objects[j].x, objects[j].y);
    noFill();
    stroke("FF0000");
    rect(objects[j].x, objects[j].y, objects[j].width, objects[j].height);
  }
}

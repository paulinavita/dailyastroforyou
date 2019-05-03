// Set the scene size.
const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;

// create and attach renderer to DOM
const renderer = new THREE.WebGLRenderer();
renderer.setSize(WIDTH, HEIGHT);
const container = document.querySelector('#containerall');
container.appendChild(renderer.domElement);

// Set some camera attributes
const VIEW_ANGLE = 45;
const ASPECT = WIDTH / HEIGHT;
const NEAR = 0.1;
const FAR = 10000;

const camera =
  new THREE.PerspectiveCamera(
    VIEW_ANGLE,
    ASPECT,
    NEAR,
    FAR
  );

// create scene and add camera
const scene = new THREE.Scene();
scene.add(camera);

// create light & set position
const pointLight = new THREE.PointLight(0xFFFFFF);
pointLight.position.x = 10;
pointLight.position.y = 50;
pointLight.position.z = 130;
scene.add(pointLight);

const geometry = new THREE.BoxGeometry(20, 20, 10);
const material = new THREE.MeshLambertMaterial({ color: 0xff86e4 }); //0xffffff

// const cube = new THREE.Mesh( geometry, material );
// cube.position.z = -300;
// cube.position.x = -120;
// scene.add(cube);

// const cube2 = new THREE.Mesh(geometry, material);
// cube2.position.z = -300;
// cube2.position.x = 120;
// scene.add(cube2);

// tweak from https://aerotwist.com/tutorials/creating-particles-with-three-js/
// create the particle variables



var particleCount = 1000,
  particles = new THREE.Geometry(),
  // ptexture = new THREE.TextureLoader().load("https://s18.postimg.org/e3p5gsxyh/particle_A.png"),
  ptexture = new THREE.TextureLoader().load("https://s22.postimg.cc/w7b1iilr5/particle_A.png"),
  pMaterial = new THREE.PointsMaterial({
    // color: 0xFFFFFF,
    map: ptexture,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthTest: true,
    size: 3
  });

// now create the individual particles
for (var p = 0; p < particleCount; p++) {
  // create a particle with random x position (-120, 120)
  var pX = Math.random() * 240 - 120,
    pY = Math.random() * 240 - 120,
    pZ = Math.random() * 240 - 120,
    particle = new THREE.Vector3(pX, pY, pZ);

  particles.vertices.push(particle);
}

// create the particle system
var particleSystem = new THREE.Points(particles, pMaterial);
particleSystem.sortParticles = true;
scene.add(particleSystem);


function update() {

  particleSystem.rotation.y += 0.001;
  renderer.render(scene, camera);
  requestAnimationFrame(update);
}

requestAnimationFrame(update);
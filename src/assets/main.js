const starSnow = 1;
const particles = [];
const particleImage = new Image();
particleImage.src = './assets/funny.png';

let scene;
let camera;
let renderer;
let particle;
let touchStartX;
let touchFlag = 0;

function init() {
    const container = document.createElement('div');
    document.body.appendChild(container);
    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.z = 1000;
    scene = new THREE.Scene();
    scene.add(camera);
    renderer = new THREE.CanvasRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    const material = new THREE.ParticleBasicMaterial({ map: new THREE.Texture(particleImage) });
    for (let i = 0; i < 500; i++) {
        particle = new Particle3D(material);
        particle.position.x = Math.random() * 2000 - 1000;
        particle.position.z = Math.random() * 2000 - 1000;
        particle.position.y = Math.random() * 2000 - 1000;
        particle.scale.x = particle.scale.y = 1;
        scene.add(particle);
        particles.push(particle);
    }
    container.appendChild(renderer.domElement);
    document.addEventListener('touchstart', onDocumentTouchStart, false);
    document.addEventListener('touchmove', onDocumentTouchMove, false);
    document.addEventListener('touchend', onDocumentTouchEnd, false);
    setInterval(loop, 1000 / 30);
}

function onDocumentTouchStart(event) {
    if (event.touches.length === 1) {
        event.preventDefault();
        touchStartX = 0;
        touchStartX = event.touches[0].pageX;
    }
}

function onDocumentTouchMove(event) {
    if (event.touches.length === 1) {
        event.preventDefault();
        const direction = event.touches[0].pageX - touchStartX;
        if (Math.abs(direction) > 80) {
            if (direction > 0) {
                touchFlag = 1;
            } else if (direction < 0) {
                touchFlag = -1;
            }
        }
    }
}

function onDocumentTouchEnd() {
    changeAndBack(touchFlag);
}

function changeAndBack(touchFlag) {
    let speedX = 25 * touchFlag;
    touchFlag = 0;
    for (let i = 0; i < particles.length; i++) {
        particles[i].velocity = new THREE.Vector3(speedX, -10, 0);
    }
    const timeOut = setTimeout('', 800);
    clearTimeout(timeOut);
    const clearI = setInterval(function () {
        if (touchFlag) {
            clearInterval(clearI);
            return;
        }
        speedX *= 0.8;
        if (Math.abs(speedX) <= 1.5) {
            speedX = 0;
            clearInterval(clearI);
        }
        for (let i = 0; i < particles.length; i++) {
            particles[i].velocity = new THREE.Vector3(speedX, -10, 0);
        }
    }, 100);
}

function loop() {
    for (let i = 0; i < particles.length; i++) {
        const particle = particles[i];
        particle.updatePhysics();
        if (particle.position.y < -1000 && starSnow) {
            particle.position.y += 2000;
        }
        if (particle.position.x > 1000) particle.position.x -= 2000;
        else if (particle.position.x < -1000) particle.position.x += 2000;
        if (particle.position.z > 1000) particle.position.z -= 2000;
        else if (particle.position.z < -1000) particle.position.z += 2000;
    }
    camera.lookAt(scene.position);
    renderer.render(scene, camera);
}

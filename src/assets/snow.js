Particle3D = function (material) {
    THREE.Particle.call(this, material);
    this.velocity = new THREE.Vector3(0, 0, 0);
    this.velocity.rotateX(10);
    this.gravity = new THREE.Vector3(0, 0, 0.5);
    this.drag = 1;
};

Particle3D.prototype = new THREE.Particle();

Particle3D.prototype.updatePhysics = function () {
    this.velocity.multiplyScalar(this.drag);
    this.velocity.addSelf(this.gravity);
    this.position.addSelf(this.velocity);
};

THREE.Vector3.prototype.rotateX = function (angle) {
    let cosRY = Math.cos((angle * Math.PI) / 180);
    let sinRY = Math.sin((angle * Math.PI) / 180);
    const tempZ = this.z;
    const tempY = this.y;
    this.y = tempY * cosRY + tempZ * sinRY;
    this.z = tempY * -sinRY + tempZ * cosRY;
};

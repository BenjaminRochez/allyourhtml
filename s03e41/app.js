import Sketch from './module'

let speed = 0;
let position = 0;
let runded = 0;
let block = document.getElementById('block'); 
let wrap = document.getElementById('wrap');
let elems = [...document.querySelectorAll('.n')];

let sketch = new Sketch({
    dom: document.getElementById("container")
});


// Event listener
window.addEventListener('wheel', (e) => {
    speed += e.deltaY * 0.0003;
})

let objs = Array(5).fill({ dist: 0 });

// Request animation frame
function raf() {
    position += speed;

    // Inertia
    speed *= 0.8;
    let rounded = Math.round(position);

    // Update the scale of the object depending of the distance from the cube
    objs.forEach((o, i) => {
        o.dist = Math.min(Math.abs(position - i), 1);
        o.dist = 1 - o.dist ** 2;

        let scale = 1 + 0.2 * o.dist;

        elems[i].style.transform = `scale(${1 + 0.4 * o.dist})`

        // Scrolling shader : position of the mesh is equal of 2 times the position - 1.2 * the current mesh
        
        sketch.meshes[i].position.y = -1.2*i + position*1.2;
        sketch.meshes[i].scale.set(scale, scale, scale);
    });

    // Lerp
    let diff = rounded - position;
    position += Math.sign(diff) * Math.pow(Math.abs(diff), 0.5) * 0.015;
    //console.log(position);
    //block.style.transform = `translate(0,${position*100 + 50}px)`
    wrap.style.transform = `translate(0,${-position * 100 - 50}px)`;

    
    window.requestAnimationFrame(raf);
};

raf();


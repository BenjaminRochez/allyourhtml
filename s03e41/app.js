import Sketch from './module';
import gsap from 'gsap';

let attractMode = false;
let attractTo = 0;
let speed = 0;
let position = 0;
let rounded = 0;
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
    rounded = Math.round(position);

    // Update the scale of the object depending of the distance from the cube
    objs.forEach((o, i) => {
        o.dist = Math.min(Math.abs(position - i), 1);
        o.dist = 1 - o.dist ** 2;

        let scale = 1 + 0.2 * o.dist;
        elems[i].style.transform = `scale(${1 + 0.4 * o.dist})`

        // Scrolling shader : position of the mesh is equal of 2 times the position - 1.2 * the current mesh

        if(rounded >=0 && rounded <=4){
            sketch.meshes[i].position.y = -1.2 * i + position * 1.2;
        sketch.meshes[i].scale.set(scale, scale, scale);

        sketch.meshes[i].material.uniforms.distanceFromCenter.value = o.dist;
        }
        
    });

    let diff = rounded - position;

    // Attractmode
    if (attractMode) {
        position += -(position-attractTo)*0.04; 
    } else {
        // Lerp
        //let diff = rounded - position;
        position += Math.sign(diff) * Math.pow(Math.abs(diff), 0.5) * 0.015;
        //console.log(position);
        //block.style.transform = `translate(0,${position*100 + 50}px)`
        wrap.style.transform = `translate(0,${-position * 100 - 50}px)`;
    }
    window.requestAnimationFrame(raf);
};

raf();



let navs = [...document.querySelectorAll('li')];
let nav = document.querySelector('.nav');

let rots = sketch.groups.map(e=>e.rotation);

nav.addEventListener('mouseenter', () => {
    attractMode = true;
    gsap.to(rots, {
        duration: 0.3,
        x:-0.5,
        y:0,
        z:0
    })
})

nav.addEventListener('mouseleave', () => {
    attractMode = false;
    gsap.to(rots, {
        duration: 0.3,
        x:-0.3,
        y:-0.5,
        z:-0.1
    })
});

navs.forEach(el => {
    el.addEventListener('mouseover', (e) => {
        console.log(e.target.getAttribute('data-nav'));
        attractTo = Number(e.target.getAttribute('data-nav'));
    })
});
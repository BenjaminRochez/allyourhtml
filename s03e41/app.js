let speed = 0;
let position = 0;
let runded = 0;
let block = document.getElementById('block');
let wrap =  document.getElementById('wrap');
let elems = [...document.querySelectorAll('.n')];

// Event listener
window.addEventListener('wheel', (e) =>{
    speed += e.deltaY * 0.0003;
})

let objs = Array(5).fill({dist: 0});

// Request animation frame
function raf(){
    position += speed;
    
    // Inertia
    speed *=0.8;
    rounded = Math.round(position);

    // Update the scale of the object depending of the distance from the cube
    objs.forEach((o,i) =>{
        o.dist = Math.min(Math.abs(position - i), 1);
        o.dist = 1 - o.dist**2;
        elems[i].style.transform = `scale(${1 + 0.4*o.dist})`
    });
    
    // Lerp
    let diff = rounded - position;
    position += Math.sign(diff)*Math.pow(Math.abs(diff), 0.5)*0.015;
    //console.log(position);
    //block.style.transform = `translate(0,${position*100 + 50}px)`
    wrap.style.transform = `translate(0,${-position*100 + 50}px)`

    window.requestAnimationFrame(raf);
};

raf();
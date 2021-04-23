let speed = 0;
let position = 0;
let runded = 0;



let block = document.getElementById('block');
window.addEventListener('wheel', (e) =>{
    speed += e.deltaY * 0.0003;
})


// Request animation frame
function raf(){
    position += speed;
    
    // Inertia
    speed *=0.8;
    rounded = Math.round(position);
    
    // Lerp
    let diff = rounded - position;
    position += Math.sign(diff)*Math.pow(Math.abs(diff), 0.5)*0.015;
    console.log(position);
    block.style.transform = `translate(0,${position*100}px)`
    window.requestAnimationFrame(raf);
};

raf();
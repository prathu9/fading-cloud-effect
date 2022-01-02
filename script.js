const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let ParticlesArray = [];

let hue = 0;

const mouse = {
    x:undefined,
    y:undefined
}

class Particle{
    constructor(){
        this.x = mouse.x;
        this.y = mouse.y;
        this.size = Math.random()*40 + 30;
        this.color = `hsl(${hue}, 100%, 50%)`;
    }

    update(){
        if(this.size > 1){
            this.size -= 0.2;
        }
    }

    draw(){
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.size, 0, Math.PI*2);
        ctx.fill();
    }
}

const drawParticles = () => {
    ParticlesArray.push(new Particle());
    hue++;
}

const animate = () => {
    ctx.fillStyle = 'rgba(0,0,0,0.2)'
    ctx.fillRect(0,0, canvas.width, canvas.height);
    for(let i=0; i < ParticlesArray.length; i++){
        ParticlesArray[i].update();
        ParticlesArray[i].draw();
    }
    ParticlesArray = ParticlesArray.filter(particle => particle.size > 2);
    requestAnimationFrame(animate);
}

animate();

canvas.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    drawParticles();
})

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
})



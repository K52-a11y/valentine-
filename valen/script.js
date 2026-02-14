
const correctPassword = "forever";


const unlockBtn = document.getElementById("unlockBtn");
const passwordInput = document.getElementById("passwordInput");
const errorMsg = document.getElementById("errorMsg");
const lockScreen = document.getElementById("lockScreen");
const mainContent = document.getElementById("mainContent");
const cinematicIntro = document.getElementById("cinematicIntro");
const envelopeWrapper = document.getElementById("envelopeWrapper");
const envelope = document.getElementById("envelope");
const textElement = document.getElementById("typeText");
const signature = document.getElementById("signature");
const proposalSection = document.getElementById("proposalSection");
const ringBox = document.getElementById("ringBox");
const music = document.getElementById("bgMusic");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const celebration = document.getElementById("celebration");


unlockBtn.addEventListener("click", () => {
    if (passwordInput.value === correctPassword) {
        lockScreen.style.display = "none";
        mainContent.classList.remove("hidden");
        cinematicIntro.style.display = "flex";

        setTimeout(() => {
            cinematicIntro.style.display = "none";
            envelopeWrapper.classList.remove("hidden");
        }, 6000);
    } else {
        errorMsg.textContent = "That’s not our secret ❤️";
    }
});


const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

function resizeCanvas(){
    canvas.width = window.innerWidth * (window.innerWidth < 600 ? 0.8 : 1);
    canvas.height = window.innerHeight * (window.innerWidth < 600 ? 0.8 : 1);
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

let particles = [];
for (let i = 0; i < 100; i++) {
    particles.push({x: Math.random()*canvas.width, y: Math.random()*canvas.height, radius: Math.random()*2, speed: Math.random()*0.3+0.1});
}

function animate() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    if (particles.length>300) particles.splice(0,particles.length-300);

    for(let i=0;i<particles.length;i++){
        let p=particles[i];
        if(p.life!==undefined){
            ctx.fillStyle=p.color;
            ctx.beginPath();
            ctx.arc(p.x,p.y,p.radius,0,Math.PI*2);
            ctx.fill();
            p.x+=p.speedX;
            p.y+=p.speedY;
            p.speedY+=0.05;
            p.life--;
            if(p.life<=0){particles.splice(i,1); i--;}
        } else {
            ctx.fillStyle="rgba(255,215,0,0.6)";
            ctx.beginPath();
            ctx.arc(p.x,p.y,p.radius,0,Math.PI*2);
            ctx.fill();
            p.y-=p.speed;
            if(p.y<0)p.y=canvas.height;
        }
    }
    requestAnimationFrame(animate);
}
animate();


function fadeInMusic(audio,duration=2000){
    audio.volume=0;
    audio.play();
    let step=0.05; let interval=duration*step/1;
    let fade=setInterval(()=>{ if(audio.volume<1) audio.volume=Math.min(audio.volume+step,1); else clearInterval(fade); },interval);
}
function fadeOutMusic(audio,duration=2000){
    let step=0.05; let interval=duration*step/1;
    let fade=setInterval(()=>{ if(audio.volume>0) audio.volume=Math.max(audio.volume-step,0); else {audio.pause(); clearInterval(fade);} },interval);
}


const message = `There are a thousand ways I could describe you,
but none of them would truly be enough.

You are the person who wants me to be better,
You are the future I want.

And I don’t just want moments with you.
I want a lifetime.`;

let index=0;
function typeWriter(){
    if(index < message.length){
        textElement.innerHTML += message.charAt(index);
        index++;
        setTimeout(typeWriter, 50);
    } else {
        
        signature.classList.remove("hidden");
        signature.classList.add("show");

        
        setTimeout(()=>{
            envelopeWrapper.classList.add("fade-out");
            setTimeout(()=>{
                envelopeWrapper.style.display="none";
                proposalSection.classList.remove("hidden");
                proposalSection.classList.add("show");
                setTimeout(()=>{ ringBox.classList.add("open"); },1000);
            },1500);
        },2000);
    }
}


envelope.addEventListener("click", ()=>{
    envelope.classList.add("open");
    fadeInMusic(music,3000);
    typeWriter();
});


let fireworksActive=false;
function launchFirework(){
    if(!fireworksActive) return;
    const x=Math.random()*canvas.width;
    const y=Math.random()*canvas.height/2;
    let numParticles = window.innerWidth<500?10:25+Math.floor(Math.random()*20);
    const colors=['#ff5050','#ffd700','#ff69b4','#00ffff','#ff8c00'];
    for(let i=0;i<numParticles;i++){
        const angle=Math.random()*2*Math.PI;
        const speed=Math.random()*4+2;
        const radius=Math.random()*2+1;
        const color=colors[Math.floor(Math.random()*colors.length)];
        particles.push({x:x,y:y,radius:radius,speedX:Math.cos(angle)*speed,speedY:Math.sin(angle)*speed,color:color,life:60});
    }
}

function spawnHeart(){
    if(document.querySelectorAll(".heart").length>=20) return;
    const heart=document.createElement("div");
    heart.classList.add("heart");
    heart.style.left=Math.random()*window.innerWidth+"px";
    heart.style.fontSize=Math.random()*10+10+"px";
    document.body.appendChild(heart);
    setTimeout(()=>heart.remove(),4000);
}

yesBtn.addEventListener("click", ()=>{
    celebration.classList.remove("hidden");
    celebration.classList.add("show");
    fireworksActive=true;

    const fireInterval=setInterval(launchFirework,300);
    const heartInterval=setInterval(spawnHeart,300);

    setTimeout(()=>{
        fireworksActive=false;
        clearInterval(fireInterval);
        clearInterval(heartInterval);
        fadeOutMusic(music,3000);
    },5000);
});


noBtn.addEventListener("mouseover",()=>{
    const x=Math.random()*300-150;
    const y=Math.random()*200-100;
    noBtn.style.transform=`translate(${x}px,${y}px)`;
});

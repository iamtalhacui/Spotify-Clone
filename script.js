console.log("Welcome");
let songIndex=0;
let prevBtn = document.querySelector(".prevBtn");
let nextBtn = document.querySelector(".nextBtn");
let playBtn = document.querySelector("#playBtn");
let progressBar = document.querySelector("#progress-bar");
let audioBars = document.querySelector("#gif");
let btns = document.querySelectorAll(".btn");
let songs = [
    {songName :  "Warriyo - Mortals [NCS Release]" , filePath: "songs/1.mp3", coverPath :"covers/1.jpg"},
    {songName :  "Cielo - Huma Huma" , filePath: "songs/2.mp3", coverPath :"covers/2.jpg"},
    {songName :  "DEAF KEV - Invincible [NCS Release]-320k" , filePath: "songs/3.mp3", coverPath :"covers/3.jpg"} ,          
    {songName :  "Different Heaven & EHIDE - My Heart [NCS-Release]" , filePath: "songs/4.mp3", coverPath :"covers/4.jpg"}  ,    
    {songName :  "Janji-Heroes-Tonight-feat-Johning[NCS-Release]" , filePath: "songs/5.mp3", coverPath :"covers/5.jpg"} ,
    {songName :  "Rabba - Salam-e-Ishq" , filePath: "songs/6.mp3", coverPath :"covers/6.jpg"}  , 
    {songName :  "Sakhiyaan - Salam-e-Ishq" , filePath: "songs/7.mp3", coverPath :"covers/7.jpg"},
    {songName :  "Bhula Dena Salam-e-Ishq" , filePath: "songs/8.mp3", coverPath :"covers/8.jpg"} ,      
    {songName :  "Tumhari Kasam - Salam-e-Ishq" , filePath: "songs/9.mp3", coverPath :"covers/9.jpg"} ,           
    {songName :  "Salam-eIshq" , filePath: "songs/10.mp3", coverPath :"covers/10.jpg"}    
];

let audioElemnt = new Audio();


playBtn.addEventListener("click",()=>{

    if(audioElemnt.paused  || audioElemnt.currentTime<0)
      { playBtn.classList.remove("fa-play");
        playBtn.classList.add("fa-pause");
        audioBars.style.opacity=1;
        btns[0].classList.remove("fa-circle-play");
        btns[0].classList.add("fa-circle-pause");
        audioElemnt.play();
    }
       else{
        audioBars.style.opacity=0;
            playBtn.classList.add("fa-play");
        playBtn.classList.remove("fa-pause");
        audioElemnt.pause();
        }
})

audioElemnt.addEventListener("timeupdate", ()=>{

    progress = parseInt((audioElemnt.currentTime/audioElemnt.duration)*100);

    progressBar.value=progress;
})

progressBar.addEventListener("change",()=>{
    audioElemnt.currentTime = ((progressBar.value*audioElemnt.duration)/100);
})


btns.forEach((element)=>{
    element.addEventListener('click', (e)=>{ 
        let clickedIndex= parseInt(e.target.id);
        if(songIndex === clickedIndex)
        {
            if(audioElemnt.paused)
                {audioElemnt.src = `songs/${songIndex+1}.mp3`;
                 audioElemnt.play();
                 e.target.classList.remove('fa-circle-play');
                 e.target.classList.add('fa-circle-pause');
                 playBtn.classList.remove('fa-play');
                 playBtn.classList.add('fa-pause');
                 audioBars.style.opacity = 1;
                }
                else{
                    audioElemnt.pause();
                 e.target.classList.remove('fa-circle-pause');
                 e.target.classList.add('fa-circle-play');
                 playBtn.classList.remove('fa-pause');
                 playBtn.classList.add('fa-play');
                 audioBars.style.opacity = 0;
                }
                }
        else
        {
            songIndex=clickedIndex;
            audioElemnt.src = `songs/${songIndex+1}.mp3`;
            audioElemnt.currentTime=0;
            audioElemnt.play();
            audioBars.style.opacity = 1;

            btns.forEach((btn, index) => {
                if (index === songIndex) {
                    btn.classList.remove('fa-circle-play');
                    btn.classList.add('fa-circle-pause');
                } else {
                    btn.classList.remove('fa-circle-pause');
                    btn.classList.add('fa-circle-play');
                }
            });
            playBtn.classList.remove('fa-play');
            playBtn.classList.add('fa-pause');
                }
       
    })
})



prevBtn.addEventListener("click", () => {
    if (songIndex > 0) {
        songIndex--;
    } else {
        songIndex = songs.length - 1; 
    }
    audioElemnt.src = `songs/${songIndex + 1}.mp3`;
    audioElemnt.currentTime = 0;
    audioElemnt.play();
    audioBars.style.opacity = 1;

    
    btns.forEach((btn, index) => {
        if (index === songIndex) {
            btn.classList.remove('fa-circle-play');
            btn.classList.add('fa-circle-pause');
        } else {
            btn.classList.remove('fa-circle-pause');
            btn.classList.add('fa-circle-play');
        }
    });
    playBtn.classList.remove('fa-play');
    playBtn.classList.add('fa-pause');
});

nextBtn.addEventListener("click", () => {
    if (songIndex < songs.length - 1) {
        songIndex++;
    } else {
        songIndex = 0; 
    }
    audioElemnt.src = `songs/${songIndex + 1}.mp3`;
    audioElemnt.currentTime = 0;
    audioElemnt.play();
    audioBars.style.opacity = 1;
    
    btns.forEach((btn, index) => {
        if (index === songIndex) {
            btn.classList.remove('fa-circle-play');
            btn.classList.add('fa-circle-pause');
        } else {
            btn.classList.remove('fa-circle-pause');
            btn.classList.add('fa-circle-play');
        }
    });
    playBtn.classList.remove('fa-play');
    playBtn.classList.add('fa-pause');
});





// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;

const onYouTubeIframeAPIReady = () => {
    player = new YT.Player('player', {
        height: '440',
        width: '600',
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        },
        playerVars: {
            controls: '0',
            disablekb: '1',
            rel: '0',
            autoplay: '1',
            loop: '1'
        },
    });
}




// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
    const volume = document.querySelector('#volume').value;
    let randomIndex = Math.floor(Math.random() * 12);
    event.target.playVideo();
    event.target.setVolume(volume);
    player.loadPlaylist({
        list: 'PLzf60jDZc1qtlUCwKldmm0l_dN5rAOypJ',
        listType: 'playlist',
        index: randomIndex,
        startSeconds: 0,
        suggestedQuality: 'default'
    });


}




// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
let done = false;
function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING && !done) {
        event.target.setShuffle(true);
        event.target.setLoop(true);
        done = true;
    }
}
function stopVideo() {
    player.stopVideo();
}


function startTimer(duration, display) {
    let timer = duration, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        display.textContent = minutes + ":" + seconds;
        if (--timer < 0) {
            timer = duration;
            killPlayer();
        }
    }, 1000);

}

const subBtn = () => {
    const submitTime = document.querySelector('#startBtn');
    submitTime.addEventListener('click', () => {
        const timeValue = document.querySelector('#minutes')
        if (timeValue.value > 0 && timeValue.value < 61) {
            const time = document.querySelector('#minutes');
            const crono = document.querySelector('#crono');
            ClearAllIntervals();
            let duration = 60 * time.value; // Converter para segundos
            display = document.querySelector('#timer'); // selecionando o timer
            startTimer(duration, display); // iniciando o timer
            onYouTubeIframeAPIReady();
            crono.remove();
            createStopBtn();
        } else {
            alert('insira um valor entre 1 e 60');
        }
    })
}

function ClearAllIntervals() {
    done = false;
    for (var i = 1; i < 99999; i++)
        window.clearInterval(i);
};

const clrBtn = () => {
    const clearBtn = document.querySelector('#clearBtn');
    clearBtn.addEventListener('click', () => {
        killPlayer();
    })
}

const killPlayer = () => {
    const videoPlayer = document.querySelector('#player');
    const main = document.querySelector('#main-video');
    const crono = document.querySelector('#crono');
    videoPlayer.remove();
    const newPlayer = document.createElement('div');
    newPlayer.id = 'player';
    main.appendChild(newPlayer);
    const divPlayer = document.querySelector('#player');
    const img = document.createElement('img');
    img.id = 'img'
    img.src = 'images/static.gif'
    divPlayer.appendChild(img);
    const time = document.querySelector('#timer');
    time.textContent = '00:00';
    done = false;
    ClearAllIntervals();
    crono.remove();
    createCronoSection();
}

const createStopBtn = () => {
    const clock = document.querySelector('#kohai-bubble');
    const stopBtn = document.createElement('button');
    stopBtn.id = 'crono';
    stopBtn.className = 'stopBtn';
    stopBtn.innerText = 'STOP';
    stopBtn.style.width = '140px';
    stopBtn.style.justifyContent = 'center';
    clock.prepend(stopBtn);
    const btnStop = document.querySelector('.stopBtn');
    btnStop.addEventListener('click', () => {
        killPlayer();
    })
}

const createCronoSection = () => {
    const clock = document.querySelector('#kohai-bubble');
    const crono = document.createElement('section');
    crono.id = 'crono';
    clock.prepend(crono);
    const startBtn = document.createElement('button');
    startBtn.id = 'startBtn';
    startBtn.innerText = 'iniciar';
    crono.appendChild(startBtn);
    const inputNumber = document.createElement('input');
    inputNumber.id = 'minutes';
    inputNumber.type = 'number';
    inputNumber.max = '60';
    inputNumber.min = '1';
    crono.appendChild(inputNumber);
    inputNumber.setAttribute('autofocus', '');
    // const clearBtn = document.createElement('button');
    // clearBtn.id = 'clearBtn';
    // clearBtn.innerText = 'limpar';
    // crono.appendChild(clearBtn);
    subBtn();
    

}

// const volumeUp = document.querySelector('#volumeUp');
// volumeUp.addEventListener('click', () => {
//     const actualVolume = player.getVolume();
//     player.setVolume(actualVolume + 5);
//     console.log('up');
// })

// const volumeDown = document.querySelector('#volumeDown');
// volumeDown.addEventListener('click', () => {
//     const actualVolume = player.getVolume();
//     player.setVolume(actualVolume - 5);
//     console.log('down');
// })

const volume = document.querySelector('#volume');
volume.addEventListener('input', (event) => {
    player.setVolume(event.target.value);
})


window.onload = () => {
    createCronoSection();
}






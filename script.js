



// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;

// function onYouTubeIframeAPIReady() {
//     player = new YT.Player('player', {
//         height: '360',
//         width: '640',
//         events: {
//             'onReady': onPlayerReady,
//             'onStateChange': onPlayerStateChange
//         },
//         playerVars: {
//             controls: '1',
//             disablekb: '1',
//             rel: '0',
//             autoplay: '1'
//         },
//     });
// }

const onYouTubeIframeAPIReady = () => {
    player = new YT.Player('player', {
        height: '360',
        width: '640',
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        },
        playerVars: {
            controls: '1',
            disablekb: '1',
            rel: '0',
            autoplay: '1'
        },
    });
}




// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
    let randomIndex = Math.floor(Math.random() * 4);
    console.log(randomIndex);
    event.target.playVideo();
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
var done = false;
function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING && !done) {
        player.setShuffle(shufflePlaylist = true);
        player.setLoop(loopPlaylists = true);
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

const submitTime = document.querySelector('#startBtn');
submitTime.addEventListener('click', () => {
    const time = document.querySelector('#minutes');
    ClearAllIntervals();
    let duration = 60 * time.value; // Converter para segundos
    display = document.querySelector('#timer'); // selecionando o timer
    startTimer(duration, display); // iniciando o timer
    onYouTubeIframeAPIReady();
})

function ClearAllIntervals() {
    for (var i = 1; i < 99999; i++)
        window.clearInterval(i);
};


const clearBtn = document.querySelector('#clearBtn');
clearBtn.addEventListener('click', () => {
    killPlayer();
})

const killPlayer = () => {
    const videoPlayer = document.querySelector('#player');
    const main = document.querySelector('main');
    videoPlayer.remove();
    const newPlayer = document.createElement('div');
    newPlayer.id = 'player';
    main.appendChild(newPlayer);
    const time = document.querySelector('#timer');
    time.textContent = '00:00';
    ClearAllIntervals();
}



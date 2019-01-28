
const mainDom = document.body.querySelector('#main');
// document.body.requestFullScreen();
var orders = [];
window.addEventListener('keyup', event => {
    if(event.code === 'Space'){
        start();
    }
})

function start(){
    console.log('start...')
    ws.send(JSON.stringify({
        type: 'start',
    }));
    document.body.querySelector('#start').className= 'hide';
}

const colors = [
    {value: '#2196f3', brightenValue: '#90caf9'},
    {value: '#00bcd4', brightenValue: '#80deea'},
    {value: '#66bb6a', brightenValue: '#a5d6a7'},
    {value: '#ffa726', brightenValue: '#ffcc80'},
    {value: '#26a69a', brightenValue: '#80cbc4'},
]

const playerId2ColorMap = {
    // playerId: cloor
}

const playerMap = {
    //playerId: playerDom
}

function createPlayer(playerId, touch){
    const player = document.createElement('div');
    playerMap[playerId] = player;
    const index = parseInt(Math.random() * colors.length)
    playerId2ColorMap[playerId] = colors[ index ];
    colors.splice( index, 1) 
    player.style.background = playerId2ColorMap[playerId].value;
    player.className = 'player';
    setPlayerPosition(playerId, touch);
    mainDom.appendChild(player);
    
}

function setPlayerPosition( playerId, touch ){
    const player = playerMap[playerId];
    if(player){
        player.style
        player.style.transform = `translate3d(${touch.clientX - 50 }px,${touch.clientY - 50}px,0px)`; 
    }
}

function hidePlayer(playerId){
    colors.push(playerId2ColorMap[playerId]);
    mainDom.removeChild(playerMap[playerId]);
}

function showPlayerCount(data){
   
    document.body.querySelector('#playerCount').innerHTML= `当前人数：${data.playerCount}`;
}

function hideStart(){
    document.body.querySelector('#start').className= 'hide';
}

var onProcess = {
    addPlayer: showPlayerCount,
    deletePlayer: function(message){
        if(message.playerCount <= 1){
            hideStart();
        }
        showPlayerCount(message)
    },
    showStart: function(){
        document.body.querySelector('#start').className= '';
    },
    hideStart: hideStart,
    start: handleStart,
}
var ws = new WebSocket(`ws://${window.location.hostname}:8000/`);

ws.onopen = function wsOpen(){
    ws.send(JSON.stringify({
        type: 'login',
        roomId: location.search.match(/roomId=\d+/)[0].split('=')[1],
        currentMileSeconds: Date.now(),
    }))
}

ws.onmessage = function(event){
    var message = JSON.parse( event.data );
    var fun = onProcess[message.type];
    fun && fun(message);
}


function handleTouchStart(touchEvent){

    
        touchEvent.preventDefault();
        touchEvent.returnValue = false;
        var changedTouches = touchEvent.changedTouches;
        
        for(var key in changedTouches){
            const touch =  changedTouches[key];
            var identifier = touch && touch.identifier;
            if( identifier +1 ){
                createPlayer(identifier, touch);
                ws.send( JSON.stringify({
                    type: 'addPlayer',
                    playerId: identifier,
                }))
            }
            
        }
}


function handleTouchEnd( touchEvent ){
    
    touchEvent.preventDefault();
    touchEvent.returnValue = false;

    var changedTouches = touchEvent.changedTouches;
    for(var key in changedTouches){
        var identifier =  changedTouches[key] && changedTouches[key].identifier;
        if( identifier +1  ){
            hidePlayer(identifier);
            ws.send( JSON.stringify({
                type: 'deletePlayer',
                playerId: identifier,
            }))
        }
      
    }
}

function handleTouchMove( touchEvent ){
        touchEvent.preventDefault();
        touchEvent.returnValue = false;
        var changedTouches = touchEvent.changedTouches;
        
        for(var key in changedTouches){
            const touch =  changedTouches[key];
            var identifier = touch && touch.identifier;
            if( identifier + 1 ){
                setPlayerPosition(identifier, touch);
            }
        }
}

mainDom.addEventListener('touchstart', event => {
    handleTouchStart(event);
});
mainDom.addEventListener('touchmove', handleTouchMove );
mainDom.addEventListener('touchend', handleTouchEnd);
mainDom.addEventListener('touchcancel', handleTouchEnd);


function handleStart(message){
    if(message.orders){
        orders = message.orders;
        startAnim();
    }
   
}

function startAnim(){
   
    if(orders.length){
        var order = orders[0];
        var blingMiles = order.blingMiles;
        if( blingMiles < Date.now() ){
            // recoverPlayersColor();
            var player = playerMap[order.playerId];
            var playerColor = playerId2ColorMap[order.playerId];
            player.style.background = playerColor .brightenValue;
            if(!order.isLast){
                setTimeout(() => {
                    player.style.background = playerColor.value;
    
                },300)
            }
            orders.shift();
        }
        window.requestAnimationFrame(startAnim);
    }else{
        console.log('anim end..');
    }
    
}

// function recoverPlayersColor(){
//     for(var playerId in playerMap){
//         playerMap[playerId].style.background = playerId2ColorMap[playerId].value;
//     }
// }


function start(){
    console.log('start...')
    ws.send(JSON.stringify({
        type: 'start',
    }));
    document.body.querySelector('#start').className= 'hide';
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
    hideStart: hideStart
}
var ws = new WebSocket(`ws://${window.location.hostname}:8000/`);

ws.onopen = function wsOpen(){
    ws.send(JSON.stringify({
        type: 'login',
        roomId: location.search.match(/roomId=\d+/)[0].split('=')[1],
    }))
}

ws.onmessage = function(event){
    var message = JSON.parse( event.data );
    var fun = onProcess[message.type];
    fun && fun(message);
}



document.body.querySelector('#main').addEventListener('touchstart', touchEvent => {
    
    touchEvent.preventDefault();
    touchEvent.returnValue = false;
    var changedTouches = touchEvent.changedTouches;
    
    for(var key in changedTouches){
        var identifier = changedTouches[key] && changedTouches[key].identifier;
        if( identifier +1 ){
            ws.send( JSON.stringify({
                type: 'addPlayer',
                playerId: identifier,
            }))
        }
        
    }
})

function handleTouchEnd( touchEvent ){
    
    touchEvent.preventDefault();
    touchEvent.returnValue = false;

    var changedTouches = touchEvent.changedTouches;
    for(var key in changedTouches){
        var identifier =  changedTouches[key] && changedTouches[key].identifier;
        if( identifier +1  ){
            ws.send( JSON.stringify({
                type: 'deletePlayer',
                playerId: identifier,
            }))
        }
      
    }
}

document.body.querySelector('#main').addEventListener('touchend', handleTouchEnd);
document.body.querySelector('#main').addEventListener('touchcancel', handleTouchEnd);
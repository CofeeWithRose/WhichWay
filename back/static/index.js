var ws = new WebSocket(`ws://${window.location.hostname}:8000/`);
ws.onopen = function wsOpen(){
    ws.send(JSON.stringify({
        type: 'login',
        roomId: location.search.match(/roomId=\d+/)[0].split('=')[1],
    }))
}

window.addEventListener('touchstart', touchEvent => {
    
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

window.addEventListener('touchend', handleTouchEnd);
window.addEventListener('touchcancel', handleTouchEnd);
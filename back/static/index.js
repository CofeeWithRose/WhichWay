var ws = new WebSocket(`ws://${window.location.hostname}:8000/`);
ws.onopen = function wsOpen(){
    console.log('ws open...');
    ws.send(JSON.stringify({
        type: 'login',
        roomId: location.search.match(/roomId=\d+/)[0].split('=')[1],
    }))
}
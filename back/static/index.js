var ws = new WebSocket(`ws://${window.location.hostname}:8000/`);
ws.onopen = function wsOpen(){
    console.log('ws open...');
}
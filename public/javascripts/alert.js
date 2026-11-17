const messageParams = window.location.search;

const params = new URLSearchParams(messageParams);

const message = params.get('message');
if(message != null) alert(message);
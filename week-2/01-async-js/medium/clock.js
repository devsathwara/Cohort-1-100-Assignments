function formatto24hour(timestamp){
    const date=new Date(timestamp);
    const hours = String(date.getHours()).padStart(2,'0');
    const minutes= String(date.getMinutes()).padStart(2,'0');
    const seconds = String(date.getSeconds()).padStart(2,'0');
    return `${hours}:${minutes}:${seconds}`;
}
function formatto12hour(timestamp){
    const date=new Date(timestamp);
    const hours = date.getHours()%12||12;
    const minutes= String(date.getMinutes()).padStart(2,'0');
    const seconds = String(date.getSeconds()).padStart(2,'0');
    const ampm= date>=12?'PM':'AM';
    return `${hours}:${minutes}:${seconds}${ampm}`;
}

function updatecounter(){
    let count =Date.now();
    count++;
    console.log(formatto24hour(count));
    console.log(formatto12hour(count));
    setTimeout(updatecounter,1000);
}
// setInterval(updatecounter,1000);
updatecounter()

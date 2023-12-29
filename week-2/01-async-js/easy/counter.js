let count =0;
function updatecounter(){
    count++;
    console.log(count);
    // setTimeout(updatecounter,1000)
}
// updatecounter()
setInterval(updatecounter,1000);

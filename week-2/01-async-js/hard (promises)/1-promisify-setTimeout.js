/*
    Write a function that returns a promise that resolves after n seconds have passed, where n is passed as an argument to the function.
*/

function wait(n) {

    return new Promise((resolve, reject)=> {
   try {
    setTimeout(()=>{
        resolve();
        }, n);
   } catch (error) {
    reject();
   }
            });
}
wait(2000).then(()=>{
    console.log("Done")
})


module.exports = wait;


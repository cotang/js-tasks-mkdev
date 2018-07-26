function consoleOutput() {
  console.log( 'mySetTimeout', new Date() )
}

function mySetTimeout(func, time){  
  let canceled = false;

  function recursiveCount(fn, t){    
    if (!canceled){
      func();     
      canceled = true;
      return;
    }
  }
  setInterval(recursiveCount, time)

  this.cancel = function(){
    canceled = true;
  }
  return this;
}
let mst = mySetTimeout(consoleOutput, 2000);


let myClearTimeout = mst.cancel
// call clear function immediatelly
myClearTimeout()


function consoleOutput() {
  console.log( new Date() )
}

function mySetInterval(func, time){  
  let canceled = false;

  function recursiveCount(fn, t){
    if (!canceled){
      func();    
      return setTimeout(recursiveCount, time);
    }
  }
  recursiveCount(func, time);

  this.cancel = function(){
    canceled = true;
  }
  return this;
}

let msi = mySetInterval(consoleOutput, 1000);


let myClearInterval = msi.cancel

// call clear function immediatelly
// myClearInterval()
// call clear function after 5 sec
// setTimeout(myClearInterval, 5000)

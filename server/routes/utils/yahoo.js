var historic = require('historic');

function start(){
	var d=new Date();
	var t=new Date(d.setDate(d.getDate()-30));
  var y= t.getFullYear()
  var m=(t.getMonth()+1)
  var dt=t.getDate()+1;
  return (y+'-'+m+'-'+dt)
}//format starting date for the stock-fetching function

var start=new Date(start()); 
var end=new Date();

module.exports=function(symbol,id,array,data,cb){

	historic(symbol, start, end, function(err, quotes) {
      				
		array.push({symbol:symbol,data:quotes,id:id});
			if(err){
				return console.log(err)
			}
			else if(id==null&&data==null||array.length==data.length){
					return cb()
			}

	})	
}
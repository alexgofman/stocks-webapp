var Stocks=require('../models/stock')
var yahooSearch=require('./utils/yahoo')


exports.get=function(array,cb){
	Stocks.find({},function(err,data){
		if(err){
			return res.status(500).send('Error retrieving data')
		}
      	data.forEach(function(v){
      		return yahooSearch(v.symbol,v._id,array,data,cb)
      	})
    })
 } 

 exports.Delete=function(id,cb){
 	 if(id==null){
 	 	Stocks.remove({_id:null},function(err){
 	 		if(err){return console.log(err)}
 	 	})
 	 }


 	 Stocks.findByIdAndRemove(id, function(err) {
	    if (err) {
	     return console.error(err)
	    }
	    console.log(id)
	    return cb();
	  });
 } 	

 exports.post=function(symbol,array,cb){
	Stocks.create({symbol:symbol},function(err){
		if(err){
			return res.status(500).send('Error')
		}		
		return yahooSearch(symbol,null,array,null,cb);
	})
}		
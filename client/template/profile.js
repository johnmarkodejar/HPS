Template.profile.helpers({
	player:function(){
		if(Session.get("player")!= undefined){
			return "Player "+Session.get("player");
		}else{
			return "";
		}
	}									  
});
Template.profile.events({
	"click .reset":function(){
		Game.find().fetch().forEach(function(obj){
			var id = obj['_id'];									 
			Game.remove({"_id":id});	
		});
		
		Game.insert({"player":"1","occupied":"no"});
		Game.insert({"player":"2","occupied":"no"});
		
		
		Answer.find().fetch().forEach(function(obj){
			var id = obj['_id'];									 
			Answer.remove({"_id":id});	
		});
		Answer.insert({"player":"1","answer":""});
		Answer.insert({"player":"2","answer":""});
		
		Timer.find().fetch().forEach(function(obj){
			var id = obj['_id'];									 
			Timer.remove({"_id":id});	
		});
		Timer.insert({"start":0});
	}									  
});
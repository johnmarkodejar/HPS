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
		Game.remove();
		Game.insert({"player":"1","occupied":"no"});
		Game.insert({"player":"2","occupied":"no"});
	}									  
});
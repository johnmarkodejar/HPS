 var c = 10;
 var int = false;
if (Meteor.isClient) {
   Template.gameroom.helpers({
	 players: function() {
	 	return Game.find({occupied:"yes"});
	 }
	 
	});
	Template.game.helpers({
		totalplayers:function(){
			if (Game.find({occupied:"yes"}).count()==2){
				return false;
			}else{
				return true;	
			}
		}					  
	});
	Template.game.events({
		'click .join': function(){
			var p = Game.find({"occupied":"no"}).count();	
			if(p>0){
				var res = Game.findOne({occupied:'no'});
				var id = res['_id'];
				var player = res['player'];
				Game.update({_id:id},{"player":player,"occupied":"yes"});	
				Session.set("player",player);
			}
		}
	  });
	Template.game.events({
		'click .start': function startgame(){
			  var cnt = Answer.find().count();
			  if(cnt==0){
				Answer.insert({"player":"1","answer":""});  
				Answer.insert({"player":"2","answer":""});  
			  }
			  var player = Session.get("player");
			  var res = Answer.findOne({player:player});
			  console.log(res['player']);
			 int = setInterval(function () {
				if(c==0){
					c = 10;	
					clearInterval(int);
					int = false;
				}else{
					c-=1;	
				}	
				
				$(".counter").html(c);
			  }, 1000);	  
			 
		  }
	  });
  Template.options.events({
    'click input': function(e){
		var val = $(e.target).val();
		if(int){
			Session.set("player1",val);	
		}else{
			alert("Selection not yet allowed");
			return false;
		}
	}
  });
  
  
  function startgame(){
	  alert("test");
	  var cnt = Answer.find().count();
	  console.log(cnt);
	  if(cnt==0){
		Answer.insert({"player":"1","answer":""});  
		Answer.insert({"player":"2","answer":""});  
	  }
	  var player = Session.get("player");
	  var res = Game.findOne({player:player});
	  console.log(res['player']);
	 int = setInterval(function () {
		if(c==0){
			c = 10;	
			clearInterval(int);
			int = false;
		}else{
			c-=1;	
		}	
		
		$(".counter").html(c);
	  }, 1000);	  
	 
  }
}
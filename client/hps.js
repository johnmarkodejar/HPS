 var c = 10;
 var int = false;
 var selected = false;
if (Meteor.isClient) {
	var ip = myIP();
	var d = new Date();
	var cnt = Visitors.find({"ip":ip}).count();
	if(cnt==0){
		//1 minute
		Visitors.insert({"ip":ip,"active":d.getTime()+10000});
	}
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
				$(".join").hide();
			}
		}
	});
	Template.counter.ctr = function () {
      return Session.get("dateval");
    };
	
	var setInt = setInterval(function () {
		var start = Timer.find({start:1}).count();
		var d = new Date();
		var ip = myIP();	
		
		var ctr = Visitors.find({"ip":ip}).count();
		if(ctr > 0){
			var vres = Visitors.findOne({"ip":ip});
			var myip = vres["ip"];
			var vid = vres["_id"];
			var active = vres["active"];
			
			if(active < d.getTime()){
				//console.log(active+"not active");
			}else{
				Visitors.update({"_id":vid},{"ip":ip,"active":d.getTime()+10000});
			}
			var v = "";
			Visitors.find().fetch().forEach(function(o){
				var oa = o['active'];
				var oid = o['_id'];
				if(oa< d.getTime()){
					Visitors.remove({"_id":oid});
				}else{
					v+= "<li>"+o["ip"]+"</li>";
				}
			});
			$("#visitors").html(v);
		}
		
		if(start != 0){
			if(c==0){
				c = 10;	
				var res = Timer.findOne();
				var id = res['_id'];
				selected = false;
				var arr = new Array();
				setTimeout(function(){
					var ans = "";
					Answer.find().fetch().forEach(function(obj){
						var answer = obj['answer'];									 
						var ap = obj['player'];
						ans += "<div>Player "+ap+" selected: "+answer+"</div>";
						arr[ap] = answer;
						Timer.update({_id:id},{"start":0});	
						$(".start").show();
						$("#selectOpt").hide();	
					});
					var winner;
					switch(arr[1]){
						case "paper":
							if(arr[2]=="rock"){
								winner = 1;
							}else if(arr[2]=="paper"){
								winner = 0;
							}else if(arr[2]=="scissor"){
								winner = 2;	
							}
						break;
						case "rock":
							if(arr[2]=="rock"){
								winner = 0;
							}else if(arr[2]=="paper"){
								winner = 2;
							}else if(arr[2]=="scissor"){
								winner = 1;	
							}
						break;
						case "scissor":
							if(arr[2]=="rock"){
								winner = 2;
							}else if(arr[2]=="paper"){
								winner = 1;
							}else if(arr[2]=="scissor"){
								winner = 0;	
							}
						break;
					}
					if(winner == 0){
						winner = "It's a tie.";	
					}else if(winner == undefined){
						winner = "No contest. Both player should select bet.";	
					}else{
						winner = "Winner is player "+winner;	
					}
					ans += "<h3>"+winner+"</h3>";
					$("#answer").show().html(ans);
				},3000);
			}else{
				if(!selected){
					$("#selectOpt").show();	
				}
				$(".start").hide();
				c-=1;
			}	
			Session.set("dateval",c);
		}else{
			Session.set("dateval","");
		}
		
	 }, 1000);
	
	Template.game.events({
		'click .start': function startgame(){
			  var cnt = Answer.find().count();
			  
			  //reset the answer of player 1 and 2
			    Answer.find().fetch().forEach(function(obj){
					var aid = obj['_id'];									 
					var ap = obj['player'];
					Answer.update({"_id":aid},{"player":ap,"answer":""});
				});
			  
			  
			  //restart the timer
			  var restart = Timer.findOne();
			  var id = restart['_id'];
			  c = 10;
			  Timer.update({_id:id},{"start":1});
		  }
	  });
  Template.options.events({
    'click input': function(e){
		selected = true;
		$("#selectOpt").hide();
		var val = $(e.target).val();
		$("#answer").show().html("You selected "+val);
		var player = Session.get("player");
		var res = Answer.findOne({player:player}); 
		var id = res['_id'];
		Answer.update({"_id":id},{"player":player,"answer":val});
	}
  });
  function myIP() {
		if (window.XMLHttpRequest) xmlhttp = new XMLHttpRequest();
		else xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");

		xmlhttp.open("GET","http://api.hostip.info/get_html.php",false);
		xmlhttp.send();

		hostipInfo = xmlhttp.responseText.split("\n");

		for (i=0; hostipInfo.length >= i; i++) {
			ipAddress = hostipInfo[i].split(":");
			if ( ipAddress[0] == "IP" ) return ipAddress[1];
		}
		return false;
	}
}
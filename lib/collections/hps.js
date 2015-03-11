Game = new Meteor.Collection('game');
Answer = new Meteor.Collection('answer');
Timer = new Meteor.Collection('timer');
Visitors = new Meteor.Collection('visitors');
/*
if (Game.find().count() == 0) {
 Game.insert({
 player: '1',
 occupied:0
 });
 Game.insert({
 player: '2',
 occupied:0
 });
}
*/
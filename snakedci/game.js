// Generated by Haxe 4.0.0-preview.4+1e3e5e016
(function () { "use strict";
var $hxEnums = {},$_;
function $extend(from, fields) {
	function Inherit() {} Inherit.prototype = from; var proto = new Inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var DeepState = function(initialState,middlewares) {
	this.state = initialState;
	this.middlewares = middlewares == null ? ds__$ImmutableArray_ImmutableArray_$Impl_$.fromArray([]) : middlewares;
	this.listeners = [];
};
DeepState.__name__ = true;
DeepState.prototype = {
	subscribe: function(subscription) {
		var _gthis = this;
		this.listeners.push(subscription);
		return function() {
			HxOverrides.remove(_gthis.listeners,subscription);
		};
	}
	,subscribeToState: function(listener) {
		return this.subscribe(ds_Subscription.Full(listener));
	}
	,update: function(action) {
		var _gthis = this;
		var updateState = function(action1) {
			if(action1.updates.length == 1 && action1.updates[0].path == "") {
				return action1.updates[0].value;
			} else {
				var copy = Reflect.copy(_gthis.state);
				var a = HxOverrides.iter(action1.updates);
				while(a.hasNext()) {
					var a1 = a.next();
					if(a1.path == "") {
						copy = Reflect.copy(a1.value);
					} else {
						_gthis.mutateStateCopy(copy,_$DeepState_DeepStateNode_$Impl_$.fromString(a1.path),a1.value);
					}
				}
				return copy;
			}
		};
		var previousState = this.state;
		var dispatch = updateState;
		var m = HxOverrides.iter(ds__$ImmutableArray_ImmutableArray_$Impl_$.reverse(this.middlewares));
		while(m.hasNext()) {
			var m1 = m.next();
			dispatch = (function(a2,a11,f) {
				return function(a3) {
					return f[0](a11[0],a2[0],a3);
				};
			})([dispatch],[this.state],[m1]);
		}
		this.state = dispatch(action);
		var getFieldInState = function(state,path) {
			if(path == "") {
				return state;
			}
			var output = state;
			var _g = 0;
			var _g1 = path.split(".");
			while(_g < _g1.length) {
				var p = _g1[_g];
				++_g;
				if(!Object.prototype.hasOwnProperty.call(output,p)) {
					throw new js__$Boot_HaxeError("Field not found in state: " + path);
				}
				output = Reflect.field(output,p);
			}
			return output;
		};
		var _g2 = 0;
		var _g11 = this.listeners.slice();
		while(_g2 < _g11.length) {
			var l = _g11[_g2];
			++_g2;
			switch(l._hx_index) {
			case 0:
				var listener = l.listener;
				var paths = l.paths;
				var shouldCall = false;
				var parameters = [];
				var path1 = HxOverrides.iter(paths);
				while(path1.hasNext()) {
					var path2 = path1.next();
					var prevValue = getFieldInState(previousState,path2);
					var currentValue = getFieldInState(this.state,path2);
					shouldCall = shouldCall || prevValue != currentValue;
					parameters.push(currentValue);
				}
				if(shouldCall) {
					listener.apply(null,parameters);
				}
				break;
			case 1:
				var listener1 = l.listener;
				listener1(previousState,this.state);
				break;
			}
		}
		return this.state;
	}
	,mutateStateCopy: function(newState,updatePath,newValue) {
		var nodeName = _$DeepState_DeepStateNode_$Impl_$.$name(updatePath);
		if(!Object.prototype.hasOwnProperty.call(newState,nodeName)) {
			throw new js__$Boot_HaxeError("Field not found in state: " + _$DeepState_DeepStateNode_$Impl_$.toString(updatePath));
		}
		if(!_$DeepState_DeepStateNode_$Impl_$.hasNext(updatePath)) {
			newState[nodeName] = newValue;
		} else {
			var copy = Reflect.copy(newState[nodeName]);
			newState[nodeName] = copy;
			this.mutateStateCopy(copy,_$DeepState_DeepStateNode_$Impl_$.next(updatePath),newValue);
		}
	}
};
var _$DeepState_DeepStateNode_$Impl_$ = {};
_$DeepState_DeepStateNode_$Impl_$.__name__ = true;
_$DeepState_DeepStateNode_$Impl_$._new = function(a) {
	if(a.length == 0) {
		throw new js__$Boot_HaxeError("DeepStateNode: Empty node list");
	}
	return a;
};
_$DeepState_DeepStateNode_$Impl_$.fromString = function(s) {
	var a = ds__$ImmutableArray_ImmutableArray_$Impl_$.fromArray(s.split("."));
	if(a.length == 0) {
		throw new js__$Boot_HaxeError("DeepStateNode: Empty node list");
	}
	return a;
};
_$DeepState_DeepStateNode_$Impl_$.toString = function(this1) {
	return this1.join(".");
};
_$DeepState_DeepStateNode_$Impl_$.hasNext = function(this1) {
	return this1.length > 1;
};
_$DeepState_DeepStateNode_$Impl_$.$name = function(this1) {
	return this1[0];
};
_$DeepState_DeepStateNode_$Impl_$.next = function(this1) {
	if(!_$DeepState_DeepStateNode_$Impl_$.hasNext(this1)) {
		throw new js__$Boot_HaxeError("DeepStateNode: No more nodes.");
	} else {
		var a = ds__$ImmutableArray_ImmutableArray_$Impl_$.fromArray(this1.slice(1));
		if(a.length == 0) {
			throw new js__$Boot_HaxeError("DeepStateNode: Empty node list");
		}
		return a;
	}
};
_$DeepState_DeepStateNode_$Impl_$.isNextLeaf = function(this1) {
	if(!_$DeepState_DeepStateNode_$Impl_$.hasNext(this1)) {
		throw new js__$Boot_HaxeError("DeepStateNode: No more nodes.");
	} else {
		return this1.length == 2;
	}
};
var GameState = function(playfieldSize,segmentSize) {
	DeepState.call(this,{ snake : { segments : ds__$ImmutableArray_ImmutableArray_$Impl_$.fromArray([]), nextMoveTime : 0.0, currentDirection : 0, wantedDirection : 0}, fruit : { x : 0, y : 0}, score : 0, hiScore : 0, playfield : { width : playfieldSize, height : playfieldSize, squareSize : segmentSize}, active : false});
};
GameState.__name__ = true;
GameState.__super__ = DeepState;
GameState.prototype = $extend(DeepState.prototype,{
	fruitEaten: function(newScore,newFruitPos,newSegments) {
		return this.update({ type : "GameState.fruitEaten", updates : ds__$ImmutableArray_ImmutableArray_$Impl_$.fromArray([{ path : "score", value : newScore},{ path : "fruit", value : newFruitPos},{ path : "snake.segments", value : newSegments}])});
	}
	,gameOver: function() {
		return this.update({ type : "GameState.gameOver", updates : ds__$ImmutableArray_ImmutableArray_$Impl_$.fromArray([{ path : "active", value : false}])});
	}
	,moveSnake: function(newSegments,newDir,speedMs) {
		return this.update({ type : "GameState.moveSnake", updates : ds__$ImmutableArray_ImmutableArray_$Impl_$.fromArray([{ path : "snake", value : { segments : newSegments, nextMoveTime : speedMs, currentDirection : newDir, wantedDirection : newDir}}])});
	}
	,initializeGame: function(startSegments,fruitPos,hiScore) {
		return this.update({ type : "GameState.initializeGame", updates : ds__$ImmutableArray_ImmutableArray_$Impl_$.fromArray([{ path : "snake", value : { segments : startSegments, nextMoveTime : 0.0, currentDirection : Phaser.RIGHT, wantedDirection : Phaser.RIGHT}},{ path : "score", value : 0},{ path : "hiScore", value : hiScore},{ path : "fruit", value : fruitPos},{ path : "active", value : true}])});
	}
	,updateMoveTimer: function(nextMoveTime) {
		return this.update({ type : "GameState.updateMoveTimer", updates : ds__$ImmutableArray_ImmutableArray_$Impl_$.fromArray([{ path : "snake.nextMoveTime", value : nextMoveTime}])});
	}
	,updateDirection: function(wantedDirection) {
		return this.update({ type : "GameState.updateDirection", updates : ds__$ImmutableArray_ImmutableArray_$Impl_$.fromArray([{ path : "snake.wantedDirection", value : wantedDirection}])});
	}
});
var dci_Context = function() { };
dci_Context.__name__ = true;
var GameView = function(game,asset) {
	this._game = game;
	this._asset = asset;
	this._tweens = [];
	var playfield = this._asset.state.playfield;
	var f = $bind(this,this.create);
	var playfieldWidth = playfield.width * playfield.squareSize;
	var playfieldHeight = playfield.height * playfield.squareSize;
	var segmentSize = playfield.squareSize;
	var tmp = function() {
		f(playfieldWidth,playfieldHeight,segmentSize);
	};
	this._game.state.add("Game",{ preload : $bind(this,this.preload), create : tmp, update : $bind(this,this.update)});
};
GameView.__name__ = true;
GameView.__interfaces__ = [dci_Context];
GameView.prototype = {
	start: function() {
		if(this._game.state.current == "Game") {
			throw new js__$Boot_HaxeError("Game already started.");
		}
		this._game.state.start("Game");
	}
	,preload: function() {
		this._textures = new _$GameView_Textures(this._game,this._asset.state.playfield.squareSize);
	}
	,create: function(playfieldWidth,playfieldHeight,segmentSize) {
		this.PLAYFIELD = this._asset.state.playfield;
		this._game.add.tileSprite(0,0,Math.max(playfieldWidth,this._game.width),Math.max(playfieldHeight,this._game.height),this._textures.background);
		var scrollWidth = playfieldWidth > this._game.width;
		var scrollHeight = playfieldHeight > this._game.height;
		var widthOffset = scrollWidth ? -2 : 2;
		var heightOffset = scrollHeight ? -2 : 2;
		var border = this._game.make.graphics();
		border.lineStyle(2,13421772,1);
		border.beginFill(1118481,0.85);
		border.drawRect(0,0,playfieldWidth + widthOffset,playfieldHeight + heightOffset);
		border.endFill();
		var playfieldBorder = this._game.add.sprite(0,0,border.generateTexture());
		var group = this._game.add.group();
		group.x = scrollWidth ? 0 : (this._game.world.width - playfieldWidth) / 2;
		group.y = scrollHeight ? 0 : (this._game.world.height - playfieldWidth) / 2;
		this._game.world.setBounds(0,0,Math.max(this._game.width,playfieldWidth),Math.max(this._game.height,playfieldHeight));
		playfieldBorder.x = scrollWidth ? 0 : group.x - 2;
		playfieldBorder.y = scrollHeight ? 0 : group.y - 2;
		this.SCORE = this._game.add.text(10,10,"Score: " + this._asset.state.score,{ font : "20px Arial", fill : "#ffffff", align : "left", boundsAlignH : "left", boundsAlignV : "top"});
		var highScore = this._asset.state.hiScore;
		this.HISCORE = this._game.add.text(0,0,"Hi-score: " + highScore,{ font : "20px Arial", fill : "#ffffff", align : "right", boundsAlignH : "right", boundsAlignV : "top"}).setTextBounds(this._game.world.width - 150,10,140,20);
		var fruit = group.create(0,0,this._textures.fruit);
		fruit.anchor = new PIXI.Point(0.5,0.5);
		var tween = this._game.add.tween(fruit).to({ angle : 360},550,"Linear",true,1000).repeat(-1,1000);
		this._tweens.push(tween);
		this.FRUIT = fruit;
		this.SNAKE = group.add(this._game.add.group());
		var X = this._asset.state.playfield.width / 2 | 0;
		var Y = this._asset.state.playfield.height / 2 | 0;
		var startSegments = [{ x : X, y : Y},{ x : X - 1, y : Y},{ x : X - 2, y : Y}];
		var fruitStartPos = { x : Std.random(this._asset.state.playfield.width) | 0, y : Std.random(this._asset.state.playfield.height) | 0};
		var hi = window.localStorage.getItem("hiScore");
		var hiScore = hi == null ? 0 : Std.parseInt(hi);
		this._asset.initializeGame(ds__$ImmutableArray_ImmutableArray_$Impl_$.fromArray(startSegments),fruitStartPos,hiScore);
	}
	,update: function() {
		var state = this._asset.state;
		this.SNAKE__display(state.snake.segments);
		this.FRUIT__display(state.fruit);
		this.SCORE__display(state.score);
		this.HISCORE__display(state.hiScore);
		if(state.active) {
			new contexts_Movement(this._asset,this._game.time.physicsElapsedMS);
			new contexts_Controlling(this._asset,this._game.input.keyboard.createCursorKeys());
			new contexts_Collisions(this._asset,this._game);
		} else {
			var _g = 0;
			var _g1 = this._tweens;
			while(_g < _g1.length) {
				var t = _g1[_g];
				++_g;
				t.stop();
			}
		}
	}
	,FRUIT__display: function(coord) {
		var pixelX = coord.x * this.PLAYFIELD__squarePixelSize() + this.PLAYFIELD__squarePixelSize() / 2;
		var pixelY = coord.y * this.PLAYFIELD__squarePixelSize() + this.PLAYFIELD__squarePixelSize() / 2;
		this.FRUIT.x = pixelX;
		this.FRUIT.y = pixelY;
	}
	,PLAYFIELD__squarePixelSize: function() {
		return this.PLAYFIELD.squareSize;
	}
	,SNAKE__display: function(segments) {
		var i = 0;
		var segment = HxOverrides.iter(segments);
		while(segment.hasNext()) {
			var segment1 = segment.next();
			var pixelX = segment1.x * this.PLAYFIELD__squarePixelSize();
			var pixelY = segment1.y * this.PLAYFIELD__squarePixelSize();
			if(i >= this.SNAKE.length) {
				var newSprite = this._game.add.sprite(pixelX,pixelY,this.SNAKE.length == 0 ? this._textures.head : this._textures.segment);
				this.SNAKE.addChild(newSprite);
				if(i == 0) {
					this._game.camera.follow(newSprite);
				}
			} else {
				this.SNAKE.xy(i,pixelX,pixelY);
			}
			++i;
		}
	}
	,SCORE__display: function(score) {
		this.SCORE.setText("Score: " + score,false);
	}
	,HISCORE__display: function(hiscore) {
		this.HISCORE.setText("Hi-score: " + hiscore,false);
	}
};
var _$GameView_Textures = function(game,segmentSize) {
	var head = game.make.graphics();
	head.lineStyle(1,16777215,1);
	head.beginFill(13586443,1);
	head.drawRect(0,0,segmentSize - 1,segmentSize - 1);
	head.endFill();
	var segment = game.make.graphics();
	segment.lineStyle(1,16777215,1);
	segment.beginFill(16740363,1);
	segment.drawRect(0,0,segmentSize - 1,segmentSize - 1);
	segment.endFill();
	var fruit = game.make.graphics();
	fruit.lineStyle(1,16720435,1);
	fruit.beginFill(16724804,1);
	fruit.drawRect(0,0,segmentSize - 4,segmentSize - 4);
	fruit.endFill();
	game.load.image("background","assets/connectwork.png");
	this.head = head.generateTexture();
	this.segment = segment.generateTexture();
	this.fruit = fruit.generateTexture();
	this.background = "background";
};
_$GameView_Textures.__name__ = true;
var HxOverrides = function() { };
HxOverrides.__name__ = true;
HxOverrides.cca = function(s,index) {
	var x = s.charCodeAt(index);
	if(x != x) {
		return undefined;
	}
	return x;
};
HxOverrides.remove = function(a,obj) {
	var i = a.indexOf(obj);
	if(i == -1) {
		return false;
	}
	a.splice(i,1);
	return true;
};
HxOverrides.iter = function(a) {
	return { cur : 0, arr : a, hasNext : function() {
		return this.cur < this.arr.length;
	}, next : function() {
		return this.arr[this.cur++];
	}};
};
var Lambda = function() { };
Lambda.__name__ = true;
Lambda.array = function(it) {
	var a = [];
	var i = $getIterator(it);
	while(i.hasNext()) {
		var i1 = i.next();
		a.push(i1);
	}
	return a;
};
Lambda.list = function(it) {
	var l = new haxe_ds_List();
	var i = $getIterator(it);
	while(i.hasNext()) {
		var i1 = i.next();
		l.add(i1);
	}
	return l;
};
Lambda.map = function(it,f) {
	var l = new haxe_ds_List();
	var x = $getIterator(it);
	while(x.hasNext()) {
		var x1 = x.next();
		l.add(f(x1));
	}
	return l;
};
Lambda.mapi = function(it,f) {
	var l = new haxe_ds_List();
	var i = 0;
	var x = $getIterator(it);
	while(x.hasNext()) {
		var x1 = x.next();
		l.add(f(i++,x1));
	}
	return l;
};
Lambda.flatten = function(it) {
	var l = new haxe_ds_List();
	var e = $getIterator(it);
	while(e.hasNext()) {
		var e1 = e.next();
		var x = $getIterator(e1);
		while(x.hasNext()) {
			var x1 = x.next();
			l.add(x1);
		}
	}
	return l;
};
Lambda.flatMap = function(it,f) {
	return Lambda.flatten(Lambda.map(it,f));
};
Lambda.has = function(it,elt) {
	var x = $getIterator(it);
	while(x.hasNext()) {
		var x1 = x.next();
		if(x1 == elt) {
			return true;
		}
	}
	return false;
};
Lambda.exists = function(it,f) {
	var x = $getIterator(it);
	while(x.hasNext()) {
		var x1 = x.next();
		if(f(x1)) {
			return true;
		}
	}
	return false;
};
Lambda.foreach = function(it,f) {
	var x = $getIterator(it);
	while(x.hasNext()) {
		var x1 = x.next();
		if(!f(x1)) {
			return false;
		}
	}
	return true;
};
Lambda.iter = function(it,f) {
	var x = $getIterator(it);
	while(x.hasNext()) {
		var x1 = x.next();
		f(x1);
	}
};
Lambda.filter = function(it,f) {
	var l = new haxe_ds_List();
	var x = $getIterator(it);
	while(x.hasNext()) {
		var x1 = x.next();
		if(f(x1)) {
			l.add(x1);
		}
	}
	return l;
};
Lambda.fold = function(it,f,first) {
	var x = $getIterator(it);
	while(x.hasNext()) {
		var x1 = x.next();
		first = f(x1,first);
	}
	return first;
};
Lambda.count = function(it,pred) {
	var n = 0;
	if(pred == null) {
		var _ = $getIterator(it);
		while(_.hasNext()) {
			_.next();
			++n;
		}
	} else {
		var x = $getIterator(it);
		while(x.hasNext()) {
			var x1 = x.next();
			if(pred(x1)) {
				++n;
			}
		}
	}
	return n;
};
Lambda.empty = function(it) {
	return !$getIterator(it).hasNext();
};
Lambda.indexOf = function(it,v) {
	var i = 0;
	var v2 = $getIterator(it);
	while(v2.hasNext()) {
		var v21 = v2.next();
		if(v == v21) {
			return i;
		}
		++i;
	}
	return -1;
};
Lambda.find = function(it,f) {
	var v = $getIterator(it);
	while(v.hasNext()) {
		var v1 = v.next();
		if(f(v1)) {
			return v1;
		}
	}
	return null;
};
Lambda.concat = function(a,b) {
	var l = new haxe_ds_List();
	var x = $getIterator(a);
	while(x.hasNext()) {
		var x1 = x.next();
		l.add(x1);
	}
	var x2 = $getIterator(b);
	while(x2.hasNext()) {
		var x3 = x2.next();
		l.add(x3);
	}
	return l;
};
var Main = function(width,height,playfieldSize,segmentSize) {
	if(segmentSize == null) {
		segmentSize = 20;
	}
	if(playfieldSize == null) {
		playfieldSize = 20;
	}
	if(height == null) {
		height = 600;
	}
	if(width == null) {
		width = 600;
	}
	var asset = new GameState(playfieldSize,segmentSize);
	var game = new Phaser.Game(width,height,Phaser.AUTO,"snakedci");
	this._gameView = new GameView(game,asset);
};
Main.__name__ = true;
Main.__interfaces__ = [dci_Context];
Main.main = function() {
	new Main().start();
};
Main.prototype = {
	start: function() {
		this._gameView.start();
	}
};
Math.__name__ = true;
var Reflect = function() { };
Reflect.__name__ = true;
Reflect.field = function(o,field) {
	try {
		return o[field];
	} catch( e ) {
		return null;
	}
};
Reflect.fields = function(o) {
	var a = [];
	if(o != null) {
		var hasOwnProperty = Object.prototype.hasOwnProperty;
		for( var f in o ) {
		if(f != "__id__" && f != "hx__closures__" && hasOwnProperty.call(o,f)) {
			a.push(f);
		}
		}
	}
	return a;
};
Reflect.copy = function(o) {
	var o2 = { };
	var _g = 0;
	var _g1 = Reflect.fields(o);
	while(_g < _g1.length) {
		var f = _g1[_g];
		++_g;
		o2[f] = Reflect.field(o,f);
	}
	return o2;
};
var Std = function() { };
Std.__name__ = true;
Std.string = function(s) {
	return js_Boot.__string_rec(s,"");
};
Std.parseInt = function(x) {
	var v = parseInt(x,10);
	if(v == 0 && (HxOverrides.cca(x,1) == 120 || HxOverrides.cca(x,1) == 88)) {
		v = parseInt(x);
	}
	if(isNaN(v)) {
		return null;
	}
	return v;
};
Std.random = function(x) {
	if(x <= 0) {
		return 0;
	} else {
		return Math.floor(Math.random() * x);
	}
};
var contexts_Collisions = function(asset,game) {
	this.SNAKE = asset.state.snake;
	this.FRUIT = asset.state.fruit;
	this.GAME = asset.state;
	this._asset = asset;
	this.checkCollisions(game);
};
contexts_Collisions.__name__ = true;
contexts_Collisions.__interfaces__ = [dci_Context];
contexts_Collisions.prototype = {
	checkCollisions: function(game) {
		this.SNAKE__checkForFruitCollision();
		if(this.SNAKE__checkForCollisionWithItself()) {
			new contexts_GameOver(this._asset,game);
		}
	}
	,collides: function(c1,c2) {
		if(c1.x == c2.x) {
			return c1.y == c2.y;
		} else {
			return false;
		}
	}
	,SNAKE__checkForFruitCollision: function() {
		if(this.SNAKE__collidesWith(this.FRUIT)) {
			this.FRUIT__moveToRandomLocation();
		}
	}
	,SNAKE__checkForCollisionWithItself: function() {
		var head = this.SNAKE.segments[0];
		var body = ds__$ImmutableArray_ImmutableArray_$Impl_$.shift(this.SNAKE.segments);
		return ds__$ImmutableArray_ImmutableArray_$Impl_$.exists(body,function(seg) {
			if(seg.x == head.x) {
				return seg.y == head.y;
			} else {
				return false;
			}
		});
	}
	,SNAKE__collidesWith: function(coord) {
		return ds__$ImmutableArray_ImmutableArray_$Impl_$.exists(this.SNAKE.segments,function(seg) {
			if(seg.x == coord.x) {
				return seg.y == coord.y;
			} else {
				return false;
			}
		});
	}
	,SNAKE__addSegment: function(fruitPos,score) {
		var newSegments = ds__$ImmutableArray_ImmutableArray_$Impl_$.push(this.SNAKE.segments,this.SNAKE.segments[this.SNAKE.segments.length - 1]);
		this._asset.fruitEaten(score,fruitPos,newSegments);
	}
	,FRUIT__moveToRandomLocation: function() {
		var newPos;
		while(true) {
			var newX = Std.random(this._asset.state.playfield.width);
			var newY = Std.random(this._asset.state.playfield.height);
			newPos = { x : newX, y : newY};
			if(!this.SNAKE__collidesWith(newPos)) {
				break;
			}
		}
		this.GAME__increaseScore(newPos);
	}
	,GAME__increaseScore: function(newFruitPos) {
		this.SNAKE__addSegment(newFruitPos,this.GAME.score + 10);
	}
};
var contexts_Controlling = function(SNAKE,CONTROLLER) {
	this.SNAKE = SNAKE;
	this.CONTROLLER = CONTROLLER;
	this.checkDirection();
};
contexts_Controlling.__name__ = true;
contexts_Controlling.__interfaces__ = [dci_Context];
contexts_Controlling.prototype = {
	checkDirection: function() {
		this.SNAKE__checkDirection();
	}
	,SNAKE__checkDirection: function() {
		var dir = this.CONTROLLER__direction();
		if(dir != 0) {
			this.SNAKE.updateDirection(dir);
		}
	}
	,CONTROLLER__direction: function() {
		if(this.CONTROLLER.left.isDown) {
			return Phaser.LEFT;
		} else if(this.CONTROLLER.right.isDown) {
			return Phaser.RIGHT;
		} else if(this.CONTROLLER.up.isDown) {
			return Phaser.UP;
		} else if(this.CONTROLLER.down.isDown) {
			return Phaser.DOWN;
		} else {
			return 0;
		}
	}
};
var contexts_GameOver = function(asset,game) {
	this.SCREEN = game;
	this.GAME = asset.state;
	this.CONTROLLER = game.input;
	this._game = game;
	this.start(asset);
};
contexts_GameOver.__name__ = true;
contexts_GameOver.__interfaces__ = [dci_Context];
contexts_GameOver.prototype = {
	start: function(asset) {
		asset.gameOver();
		this.SCREEN__displayGameOver();
	}
	,CONTROLLER__waitForRestart: function() {
		this.CONTROLLER.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onUp.addOnce(($_=this._game.state,$bind($_,$_.restart)));
	}
	,GAME__submitHiscore: function() {
		if(this.GAME.score > this.GAME.hiScore) {
			window.localStorage.setItem("hiScore",Std.string(this.GAME.score));
		}
		this.CONTROLLER__waitForRestart();
	}
	,SCREEN__displayGameOver: function() {
		this.SCREEN.add.text(0,0,"GAME OVER",{ font : "50px Arial", fill : "#ffffff", stroke : "#000000", strokeThickness : 3, align : "center", boundsAlignH : "center", boundsAlignV : "middle"}).setTextBounds(0,-20,this.SCREEN.width,this.SCREEN.height);
		this.SCREEN.add.text(0,0,"Press space to restart",{ font : "20px Arial", fill : "#ffffff", stroke : "#000000", strokeThickness : 2, align : "center", boundsAlignH : "center", boundsAlignV : "middle"}).setTextBounds(0,30,this.SCREEN.width,this.SCREEN.height);
		this.GAME__submitHiscore();
	}
};
var contexts_Movement = function(asset,msElapsed) {
	this._asset = asset;
	this.PLAYFIELD = asset.state.playfield;
	this.SNAKE = asset.state.snake;
	this.HEAD = asset.state.snake.segments[0];
	this.move(msElapsed);
};
contexts_Movement.__name__ = true;
contexts_Movement.__interfaces__ = [dci_Context];
contexts_Movement.prototype = {
	move: function(msElapsed) {
		var movementTime = this.SNAKE.nextMoveTime - msElapsed;
		if(movementTime <= 0) {
			this.HEAD__moveOneStepAhead(movementTime);
		} else {
			this._asset.updateMoveTimer(movementTime);
		}
	}
	,dir2Text: function(dir) {
		if(dir == Phaser.UP) {
			return "UP";
		} else if(dir == Phaser.DOWN) {
			return "DOWN";
		} else if(dir == Phaser.LEFT) {
			return "LEFT";
		} else if(dir == Phaser.RIGHT) {
			return "RIGHT";
		} else {
			return "<NOWHERE>";
		}
	}
	,SNAKE__moveTo: function(x,y,newDir,timerDelta) {
		var newPos = this.SNAKE.segments.slice();
		newPos.unshift({ x : x, y : y});
		newPos.pop();
		this._asset.moveSnake(ds__$ImmutableArray_ImmutableArray_$Impl_$.fromArray(newPos),newDir,this.SNAKE__moveSpeed(newPos.length) + timerDelta);
	}
	,SNAKE__moveDirection: function() {
		if(this.SNAKE.wantedDirection == Phaser.RIGHT && this.SNAKE.currentDirection == Phaser.LEFT || this.SNAKE.wantedDirection == Phaser.LEFT && this.SNAKE.currentDirection == Phaser.RIGHT || this.SNAKE.wantedDirection == Phaser.UP && this.SNAKE.currentDirection == Phaser.DOWN || this.SNAKE.wantedDirection == Phaser.DOWN && this.SNAKE.currentDirection == Phaser.UP) {
			return this.SNAKE.currentDirection;
		} else {
			return this.SNAKE.wantedDirection;
		}
	}
	,SNAKE__moveSpeed: function(numberOfSegments) {
		return Math.max(150 - numberOfSegments * 3,50);
	}
	,HEAD__moveOneStepAhead: function(timerDelta) {
		var nextX = this.HEAD.x;
		var nextY = this.HEAD.y;
		var moveDir = this.SNAKE__moveDirection();
		if(moveDir == Phaser.UP) {
			nextY = this.HEAD.y - 1;
		} else if(moveDir == Phaser.DOWN) {
			nextY = this.HEAD.y + 1;
		} else if(moveDir == Phaser.LEFT) {
			nextX = this.HEAD.x - 1;
		} else if(moveDir == Phaser.RIGHT) {
			nextX = this.HEAD.x + 1;
		}
		if(nextX >= this.PLAYFIELD.width) {
			nextX = 0;
		} else if(nextX < 0) {
			nextX = this.PLAYFIELD.width - 1;
		}
		if(nextY >= this.PLAYFIELD.height) {
			nextY = 0;
		} else if(nextY < 0) {
			nextY = this.PLAYFIELD.height - 1;
		}
		this.SNAKE__moveTo(nextX,nextY,moveDir,timerDelta);
	}
};
var ds__$ImmutableArray_ImmutableArray_$Impl_$ = {};
ds__$ImmutableArray_ImmutableArray_$Impl_$.__name__ = true;
ds__$ImmutableArray_ImmutableArray_$Impl_$.arrayAccess = function(this1,key) {
	return this1[key];
};
ds__$ImmutableArray_ImmutableArray_$Impl_$._new = function(array) {
	return array;
};
ds__$ImmutableArray_ImmutableArray_$Impl_$.fromArray = function(array) {
	return array.slice();
};
ds__$ImmutableArray_ImmutableArray_$Impl_$.toIterable = function(this1) {
	return this1;
};
ds__$ImmutableArray_ImmutableArray_$Impl_$.insert = function(this1,pos,x) {
	var newArray = this1.slice();
	newArray.splice(pos,0,x);
	return ds__$ImmutableArray_ImmutableArray_$Impl_$.fromArray(newArray);
};
ds__$ImmutableArray_ImmutableArray_$Impl_$.pop = function(this1) {
	var newArray = this1.slice();
	newArray.pop();
	return ds__$ImmutableArray_ImmutableArray_$Impl_$.fromArray(newArray);
};
ds__$ImmutableArray_ImmutableArray_$Impl_$.push = function(this1,x) {
	var newArray = this1.slice();
	newArray.push(x);
	return ds__$ImmutableArray_ImmutableArray_$Impl_$.fromArray(newArray);
};
ds__$ImmutableArray_ImmutableArray_$Impl_$.remove = function(this1,x) {
	var newArray = this1.slice();
	if(HxOverrides.remove(newArray,x)) {
		return ds__$ImmutableArray_ImmutableArray_$Impl_$.fromArray(newArray);
	} else {
		return this1;
	}
};
ds__$ImmutableArray_ImmutableArray_$Impl_$.resize = function(this1,len) {
	var newArray = this1.slice();
	newArray.length = len;
	return ds__$ImmutableArray_ImmutableArray_$Impl_$.fromArray(newArray);
};
ds__$ImmutableArray_ImmutableArray_$Impl_$.reverse = function(this1) {
	var newArray = this1.slice();
	newArray.reverse();
	return ds__$ImmutableArray_ImmutableArray_$Impl_$.fromArray(newArray);
};
ds__$ImmutableArray_ImmutableArray_$Impl_$.shift = function(this1) {
	var newArray = this1.slice();
	newArray.shift();
	return ds__$ImmutableArray_ImmutableArray_$Impl_$.fromArray(newArray);
};
ds__$ImmutableArray_ImmutableArray_$Impl_$.sort = function(this1,f) {
	var newArray = this1.slice();
	newArray.sort(f);
	return ds__$ImmutableArray_ImmutableArray_$Impl_$.fromArray(newArray);
};
ds__$ImmutableArray_ImmutableArray_$Impl_$.unshift = function(this1,x) {
	var newArray = this1.slice();
	newArray.unshift(x);
	return ds__$ImmutableArray_ImmutableArray_$Impl_$.fromArray(newArray);
};
ds__$ImmutableArray_ImmutableArray_$Impl_$.first = function(this1) {
	if(this1.length == 0) {
		return haxe_ds_Option.None;
	} else {
		return haxe_ds_Option.Some(this1[0]);
	}
};
ds__$ImmutableArray_ImmutableArray_$Impl_$.last = function(this1) {
	if(this1.length == 0) {
		return haxe_ds_Option.None;
	} else {
		return haxe_ds_Option.Some(this1[this1.length - 1]);
	}
};
ds__$ImmutableArray_ImmutableArray_$Impl_$.array = function(this1) {
	return Lambda.array(this1);
};
ds__$ImmutableArray_ImmutableArray_$Impl_$.concat = function(this1,b) {
	return Lambda.array(Lambda.concat(this1,b));
};
ds__$ImmutableArray_ImmutableArray_$Impl_$.count = function(this1,f) {
	return Lambda.count(this1,f);
};
ds__$ImmutableArray_ImmutableArray_$Impl_$.empty = function(this1) {
	return Lambda.empty(this1);
};
ds__$ImmutableArray_ImmutableArray_$Impl_$.exists = function(this1,f) {
	return Lambda.exists(this1,f);
};
ds__$ImmutableArray_ImmutableArray_$Impl_$.filter = function(this1,f) {
	return Lambda.array(Lambda.filter(this1,f));
};
ds__$ImmutableArray_ImmutableArray_$Impl_$.find = function(this1,f) {
	return Lambda.find(this1,f);
};
ds__$ImmutableArray_ImmutableArray_$Impl_$.flatMap = function(this1,f) {
	return Lambda.array(Lambda.flatMap(this1,f));
};
ds__$ImmutableArray_ImmutableArray_$Impl_$.fold = function(this1,f,first) {
	return Lambda.fold(this1,f,first);
};
ds__$ImmutableArray_ImmutableArray_$Impl_$.foreach = function(this1,f) {
	return Lambda.foreach(this1,f);
};
ds__$ImmutableArray_ImmutableArray_$Impl_$.has = function(this1,elt) {
	return Lambda.has(this1,elt);
};
ds__$ImmutableArray_ImmutableArray_$Impl_$.indexOf = function(this1,v) {
	return Lambda.indexOf(this1,v);
};
ds__$ImmutableArray_ImmutableArray_$Impl_$.iter = function(this1,f) {
	Lambda.iter(this1,f);
	return;
};
ds__$ImmutableArray_ImmutableArray_$Impl_$.list = function(this1) {
	return Lambda.list(this1);
};
ds__$ImmutableArray_ImmutableArray_$Impl_$.map = function(this1,f) {
	return Lambda.array(Lambda.map(this1,f));
};
ds__$ImmutableArray_ImmutableArray_$Impl_$.mapi = function(this1,f) {
	return Lambda.array(Lambda.mapi(this1,f));
};
var ds_Subscription = $hxEnums["ds.Subscription"] = { __ename__ : true, __constructs__ : ["Partial","Full"]
	,Partial: ($_=function(paths,listener) { return {_hx_index:0,paths:paths,listener:listener,__enum__:"ds.Subscription"}; },$_.__params__ = ["paths","listener"],$_)
	,Full: ($_=function(listener) { return {_hx_index:1,listener:listener,__enum__:"ds.Subscription"}; },$_.__params__ = ["listener"],$_)
};
var haxe_ds_List = function() {
	this.length = 0;
};
haxe_ds_List.__name__ = true;
haxe_ds_List.prototype = {
	add: function(item) {
		var x = new haxe_ds__$List_ListNode(item,null);
		if(this.h == null) {
			this.h = x;
		} else {
			this.q.next = x;
		}
		this.q = x;
		this.length++;
	}
	,iterator: function() {
		return new haxe_ds__$List_ListIterator(this.h);
	}
};
var haxe_ds__$List_ListNode = function(item,next) {
	this.item = item;
	this.next = next;
};
haxe_ds__$List_ListNode.__name__ = true;
var haxe_ds__$List_ListIterator = function(head) {
	this.head = head;
};
haxe_ds__$List_ListIterator.__name__ = true;
haxe_ds__$List_ListIterator.prototype = {
	hasNext: function() {
		return this.head != null;
	}
	,next: function() {
		var val = this.head.item;
		this.head = this.head.next;
		return val;
	}
};
var haxe_ds_Option = $hxEnums["haxe.ds.Option"] = { __ename__ : true, __constructs__ : ["Some","None"]
	,Some: ($_=function(v) { return {_hx_index:0,v:v,__enum__:"haxe.ds.Option"}; },$_.__params__ = ["v"],$_)
	,None: {_hx_index:1,__enum__:"haxe.ds.Option"}
};
var js__$Boot_HaxeError = function(val) {
	Error.call(this);
	this.val = val;
	if(Error.captureStackTrace) {
		Error.captureStackTrace(this,js__$Boot_HaxeError);
	}
};
js__$Boot_HaxeError.__name__ = true;
js__$Boot_HaxeError.wrap = function(val) {
	if((val instanceof Error)) {
		return val;
	} else {
		return new js__$Boot_HaxeError(val);
	}
};
js__$Boot_HaxeError.__super__ = Error;
js__$Boot_HaxeError.prototype = $extend(Error.prototype,{
});
var js_Boot = function() { };
js_Boot.__name__ = true;
js_Boot.__string_rec = function(o,s) {
	if(o == null) {
		return "null";
	}
	if(s.length >= 5) {
		return "<...>";
	}
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) {
		t = "object";
	}
	switch(t) {
	case "function":
		return "<function>";
	case "object":
		if(o.__enum__) {
			var e = $hxEnums[o.__enum__];
			var n = e.__constructs__[o._hx_index];
			var con = e[n];
			if(con.__params__) {
				s += "\t";
				var tmp = n + "(";
				var _g = [];
				var _g1 = 0;
				var _g2 = con.__params__;
				while(_g1 < _g2.length) {
					var p = _g2[_g1];
					++_g1;
					_g.push(js_Boot.__string_rec(o[p],s));
				}
				return tmp + _g.join(",") + ")";
			} else {
				return n;
			}
		}
		if((o instanceof Array)) {
			var l = o.length;
			var i;
			var str = "[";
			s += "\t";
			var _g11 = 0;
			var _g3 = l;
			while(_g11 < _g3) {
				var i1 = _g11++;
				str += (i1 > 0 ? "," : "") + js_Boot.__string_rec(o[i1],s);
			}
			str += "]";
			return str;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( e1 ) {
			var e2 = (e1 instanceof js__$Boot_HaxeError) ? e1.val : e1;
			return "???";
		}
		if(tostr != null && tostr != Object.toString && typeof(tostr) == "function") {
			var s2 = o.toString();
			if(s2 != "[object Object]") {
				return s2;
			}
		}
		var k = null;
		var str1 = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) {
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str1.length != 2) {
			str1 += ", \n";
		}
		str1 += s + k + " : " + js_Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str1 += "\n" + s + "}";
		return str1;
	case "string":
		return o;
	default:
		return String(o);
	}
};
function $getIterator(o) { if( o instanceof Array ) return HxOverrides.iter(o); else return o.iterator(); }
var $fid = 0;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $fid++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = m.bind(o); o.hx__closures__[m.__id__] = f; } return f; }
String.__name__ = true;
Array.__name__ = true;
Object.defineProperty(js__$Boot_HaxeError.prototype,"message",{ get : function() {
	return String(this.val);
}});
GameView.__meta__ = { fields : { FRUIT : { role : null}, PLAYFIELD : { role : null}, SNAKE : { role : null}, SCORE : { role : null}, HISCORE : { role : null}}};
contexts_Collisions.__meta__ = { fields : { SNAKE : { role : null}, FRUIT : { role : null}, GAME : { role : null}}};
contexts_Controlling.__meta__ = { fields : { SNAKE : { role : null}, CONTROLLER : { role : null}}};
contexts_GameOver.__meta__ = { fields : { CONTROLLER : { role : null}, GAME : { role : null}, SCREEN : { role : null}}};
contexts_Movement.__meta__ = { fields : { PLAYFIELD : { role : null}, SNAKE : { role : null}, HEAD : { role : null}}};
Main.main();
})();

//# sourceMappingURL=game.js.map
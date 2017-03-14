(function (console) { "use strict";
var $estr = function() { return js_Boot.__string_rec(this,''); };
function $extend(from, fields) {
	function Inherit() {} Inherit.prototype = from; var proto = new Inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var HxOverrides = function() { };
HxOverrides.__name__ = true;
HxOverrides.cca = function(s,index) {
	var x = s.charCodeAt(index);
	if(x != x) return undefined;
	return x;
};
HxOverrides.substr = function(s,pos,len) {
	if(pos != null && pos != 0 && len != null && len < 0) return "";
	if(len == null) len = s.length;
	if(pos < 0) {
		pos = s.length + pos;
		if(pos < 0) pos = 0;
	} else if(len < 0) len = s.length + len - pos;
	return s.substr(pos,len);
};
HxOverrides.indexOf = function(a,obj,i) {
	var len = a.length;
	if(i < 0) {
		i += len;
		if(i < 0) i = 0;
	}
	while(i < len) {
		if(a[i] === obj) return i;
		i++;
	}
	return -1;
};
HxOverrides.remove = function(a,obj) {
	var i = HxOverrides.indexOf(a,obj,0);
	if(i == -1) return false;
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
Lambda.fold = function(it,f,first) {
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		first = f(x,first);
	}
	return first;
};
var List = function() {
	this.length = 0;
};
List.__name__ = true;
List.prototype = {
	add: function(item) {
		var x = [item];
		if(this.h == null) this.h = x; else this.q[1] = x;
		this.q = x;
		this.length++;
	}
	,push: function(item) {
		var x = [item,this.h];
		this.h = x;
		if(this.q == null) this.q = x;
		this.length++;
	}
	,first: function() {
		if(this.h == null) return null; else return this.h[0];
	}
	,pop: function() {
		if(this.h == null) return null;
		var x = this.h[0];
		this.h = this.h[1];
		if(this.h == null) this.q = null;
		this.length--;
		return x;
	}
	,clear: function() {
		this.h = null;
		this.q = null;
		this.length = 0;
	}
	,iterator: function() {
		return new _$List_ListIterator(this.h);
	}
	,__class__: List
};
var _$List_ListIterator = function(head) {
	this.head = head;
	this.val = null;
};
_$List_ListIterator.__name__ = true;
_$List_ListIterator.prototype = {
	hasNext: function() {
		return this.head != null;
	}
	,next: function() {
		this.val = this.head[0];
		this.head = this.head[1];
		return this.val;
	}
	,__class__: _$List_ListIterator
};
Math.__name__ = true;
var Std = function() { };
Std.__name__ = true;
Std.string = function(s) {
	return js_Boot.__string_rec(s,"");
};
Std["int"] = function(x) {
	return x | 0;
};
Std.parseInt = function(x) {
	var v = parseInt(x,10);
	if(v == 0 && (HxOverrides.cca(x,1) == 120 || HxOverrides.cca(x,1) == 88)) v = parseInt(x);
	if(isNaN(v)) return null;
	return v;
};
Std.random = function(x) {
	if(x <= 0) return 0; else return Math.floor(Math.random() * x);
};
var dci_examples_Main = function() { };
dci_examples_Main.__name__ = true;
dci_examples_Main.main = function() {
	new $(dci_examples_Main.initializeMatrix);
};
dci_examples_Main.initializeMatrix = function() {
	var ledger = new dci_examples_moneytransfer_data_Ledger();
	ledger.message = "Initial balance";
	ledger.amount = 1000;
	var neoAccount = new dci_examples_moneytransfer_contexts_Account([ledger]);
	var foodBill = new dci_examples_moneytransfer_data_Creditor();
	foodBill.account = new dci_examples_moneytransfer_contexts_Account([]);
	foodBill.amountOwed = 300;
	foodBill.name = "Groceries";
	var bills = [foodBill];
	var $console = new dci_examples_matrix_Console(new $("#content"),new $("#input")).start();
	if(!new dci_examples_moneytransfer_contexts_ValidateCreditCard(4916239259614484).isValid()) $console.output("Invalid credit card number!");
	$console.load(new dci_examples_matrix_Matrix($console,bills,neoAccount));
};
var dci_examples_matrix_ProcessState = { __ename__ : true, __constructs__ : ["Running","Blocked"] };
dci_examples_matrix_ProcessState.Running = ["Running",0];
dci_examples_matrix_ProcessState.Running.toString = $estr;
dci_examples_matrix_ProcessState.Running.__enum__ = dci_examples_matrix_ProcessState;
dci_examples_matrix_ProcessState.Blocked = ["Blocked",1];
dci_examples_matrix_ProcessState.Blocked.toString = $estr;
dci_examples_matrix_ProcessState.Blocked.__enum__ = dci_examples_matrix_ProcessState;
var dci_examples_matrix__$Console_ProcessList = function() {
	List.call(this);
	this.state = new haxe_ds_ObjectMap();
};
dci_examples_matrix__$Console_ProcessList.__name__ = true;
dci_examples_matrix__$Console_ProcessList.__super__ = List;
dci_examples_matrix__$Console_ProcessList.prototype = $extend(List.prototype,{
	__class__: dci_examples_matrix__$Console_ProcessList
});
var haxedci_Context = function() { };
haxedci_Context.__name__ = true;
var dci_examples_matrix_Console = function(screen,input) {
	this.__screen = screen;
	this.__input = input;
	this.__processes = new dci_examples_matrix__$Console_ProcessList();
};
dci_examples_matrix_Console.__name__ = true;
dci_examples_matrix_Console.__interfaces__ = [haxedci_Context];
dci_examples_matrix_Console.prototype = {
	start: function() {
		var _g = this;
		this.get_screen().fadeTo(0,0.25).fadeTo(6000,1);
		this.get_input().keyup($bind(this,this.input__sendMessage));
		this.get_input().focus();
		this.get_screen().on("click",null,function() {
			_g.get_input().focus();
		});
		return this;
	}
	,clear: function() {
		this.screen__clear();
	}
	,getScreen: function() {
		return this.get_screen();
	}
	,getInput: function() {
		return this.get_input();
	}
	,load: function(process) {
		return this.processes__load(process);
	}
	,output: function(msg,delay,padding) {
		if(padding == null) padding = 0;
		return this.screen__type(msg,delay,padding);
	}
	,newline: function(delay) {
		return this.screen__newline(delay);
	}
	,turnOff: function() {
		var def = new $.Deferred();
		this.get_screen().fadeTo(3500,0);
		this.get_input().fadeTo(3500,0,null,function() {
			def.resolve();
		});
		return def;
	}
	,get_processes: function() {
		return this.__processes;
	}
	,processes__read: function(s) {
		var _g = this;
		var self = this.get_processes();
		if(!this.processes__acceptsRead()) return;
		var k = this.processes__current();
		var v = dci_examples_matrix_ProcessState.Blocked;
		self.state.set(k,v);
		v;
		this.processes__current().input(s).done(function() {
			var k1 = _g.processes__current();
			var v1 = dci_examples_matrix_ProcessState.Running;
			self.state.set(k1,v1);
			v1;
		});
	}
	,processes__acceptsRead: function() {
		var self = this.get_processes();
		return this.processes__current() != null && (function($this) {
			var $r;
			var key = $this.processes__current();
			$r = self.state.h[key.__id__];
			return $r;
		}(this)) == dci_examples_matrix_ProcessState.Running;
	}
	,processes__current: function() {
		var self = this.get_processes();
		return self.first();
	}
	,processes__load: function(process) {
		var _g = this;
		var self = this.get_processes();
		self.push(process);
		var v = dci_examples_matrix_ProcessState.Blocked;
		self.state.set(process,v);
		v;
		return process.start().progress(function() {
			var v1 = dci_examples_matrix_ProcessState.Running;
			self.state.set(process,v1);
			v1;
			_g.get_input().focus();
		}).done(function() {
			if(_g.processes__current() != process) throw new js__$Boot_HaxeError("Error: Terminating process not executing!");
			var key = self.pop();
			self.state.remove(key);
		});
	}
	,get_input: function() {
		return this.__input;
	}
	,input__initialize: function() {
		var self = this.get_input();
		self.keyup($bind(this,this.input__sendMessage));
		self.focus();
	}
	,input__sendMessage: function(e) {
		var self = this.get_input();
		if(e.which != 13) return;
		if(self.val() == "" || !this.processes__acceptsRead()) {
			this.screen__flash();
			return;
		}
		var msg = self.val();
		self.val("");
		this.processes__read(msg);
	}
	,input__setFocus: function() {
		var self = this.get_input();
		self.focus();
	}
	,get_screen: function() {
		return this.__screen;
	}
	,screen__type: function(txt,delay,padding) {
		var self = this.get_screen();
		if(padding == null) padding = 0;
		var p = new $.Deferred();
		this.screen__typeString(txt,padding).then((function(f1,f,a1) {
			return function() {
				return f1(f,a1);
			};
		})(haxe_Timer.delay,(function(f2) {
			return function() {
				return f2();
			};
		})($bind(p,p.resolve)),delay));
		return p.promise();
	}
	,screen__clear: function() {
		var self = this.get_screen();
		self.find("div.text").remove();
	}
	,screen__flash: function() {
		var self = this.get_screen();
		self.css("background-color","#ddd");
		haxe_Timer.delay(function() {
			self.css("background-color","black");
		},50);
	}
	,screen__typeString: function(txt,padding) {
		var self = this.get_screen();
		var lines = self.find("div.text").length;
		if(lines > 22) self.find("div.text:first").remove();
		var timeOut;
		var txtLen = txt.length;
		var $char = 0;
		var typeIt = null;
		var def = new $.Deferred();
		var el = new $("<div class='text' />").css("margin-left",padding + "px").appendTo(self);
		if(txt.length == 0) {
			el.html("&nbsp;");
			return def.resolve().promise();
		}
		(typeIt = function() {
			var humanize = Math.round(Math.random() * 20) + 30;
			timeOut = haxe_Timer.delay(function() {
				var type;
				var pos = $char++;
				type = HxOverrides.substr(txt,pos,1);
				var currentText;
				var _this = el.text();
				var len = el.text().length - 1;
				currentText = HxOverrides.substr(_this,0,len);
				el.html(currentText + type + "|");
				if($char == txtLen) {
					el.html(currentText + type);
					def.resolve();
				} else typeIt();
			},humanize);
		})();
		return def.promise();
	}
	,screen__turnOn: function() {
		var self = this.get_screen();
		self.fadeTo(0,0.25).fadeTo(6000,1);
		self.on("click",null,$bind(this,this.input__setFocus));
		this.input__initialize();
	}
	,screen__newline: function(delay) {
		var self = this.get_screen();
		return this.screen__type("",delay);
	}
	,__class__: dci_examples_matrix_Console
};
var dci_examples_matrix_Matrix = function(console,bills,neoAccount) {
	this.__console = console;
	this.__bills = bills;
	this.__neoAccount = neoAccount;
	this.process = new $.Deferred();
};
dci_examples_matrix_Matrix.__name__ = true;
dci_examples_matrix_Matrix.__interfaces__ = [haxedci_Context];
dci_examples_matrix_Matrix.prototype = {
	start: function() {
		var _g = this;
		var effect = new dci_examples_matrix_MatrixEffect(this.get_console()).start();
		var type = ($_=this.get_console(),$bind($_,$_.output));
		var newline = ($_=this.get_console(),$bind($_,$_.newline));
		var i = 13;
		while(--i > 0) newline();
		type("PRESS ANY KEY",0,245);
		this.get_console().getInput().one("keydown",null,function(e) {
			e.preventDefault();
			effect.clear();
			_g.get_console().clear();
			type("Hello Neo...",1250).then((function(f,a1,a2) {
				return function() {
					return f(a1,a2);
				};
			})(type,"It's time to pay your bills, Neo.",500)).then(newline).then(newline).then($bind(_g,_g.menu)).then(newline).then(($_=_g.process,$bind($_,$_.notify)));
		});
		return this.process;
	}
	,menu: function() {
		var totalToPay = Lambda.fold(this.get_bills(),function(cr,a) {
			return cr.amountOwed + a;
		},0.0);
		var type = ($_=this.get_console(),$bind($_,$_.output));
		return type("Current account balance: " + this.get_neoAccount().balance()).then((function(f,a1) {
			return function() {
				return f(a1);
			};
		})(type,"1 - Pay bills (" + totalToPay + ")")).then((function(f1,a11) {
			return function() {
				return f1(a11);
			};
		})(type,"2 - Order some food"));
	}
	,input: function(msg) {
		var _g = msg.toLowerCase();
		switch(_g) {
		case "":
			break;
		case "1":
			try {
				new dci_examples_moneytransfer_contexts_PayBills(this.get_neoAccount(),this.get_bills()).payBills();
				this.get_console().output("Account balance after paying bills: " + this.get_neoAccount().balance());
			} catch( e ) {
				if (e instanceof js__$Boot_HaxeError) e = e.val;
				if( js_Boot.__instanceof(e,String) ) {
					this.get_console().output(e);
				} else throw(e);
			}
			break;
		case "2":
			return this.get_console().load(new dci_examples_restaurant_contexts_Restaurant(this.get_console(),this.get_neoAccount())).then($bind(this,this.menu));
		case "dir":case "ls":case "ls -l":
			this.console__hackingDetected();
			break;
		case "exit":
			this.console__exit().then(($_=this.process,$bind($_,$_.resolve)));
			break;
		default:
			this.console__unknownCommand();
		}
		return new $.Deferred().resolve();
	}
	,get_console: function() {
		return this.__console;
	}
	,console__hackingDetected: function() {
		var self = this.get_console();
		return self.output("Tell me, Mr. Anderson, what good is a directory listing if you're unable to...",200).then((function(f,a1) {
			return function() {
				return f(a1);
			};
		})($bind(self,self.output),"see?")).then($bind(self,self.turnOff));
	}
	,console__unknownCommand: function() {
		var self = this.get_console();
		return self.output("Try again, Neo.");
	}
	,console__exit: function() {
		var self = this.get_console();
		return self.output("Goodbye, Neo.").then($bind(self,self.turnOff));
	}
	,get_bills: function() {
		return this.__bills;
	}
	,get_neoAccount: function() {
		return this.__neoAccount;
	}
	,__class__: dci_examples_matrix_Matrix
};
var dci_examples_matrix_MatrixEffect = function(console,fontSize,speed) {
	if(speed == null) speed = 100;
	if(fontSize == null) fontSize = 12;
	this.__screen = console.getScreen();
	this.__columns = new List();
	this.__fontSize = fontSize;
	this.__positions = [];
	this.__speed = speed;
	var max = Math.floor((this.get_screen().width() - 25) / fontSize);
	while(this.get_positions().length < max) this.get_positions().push(this.get_positions().length * fontSize + 25);
};
dci_examples_matrix_MatrixEffect.__name__ = true;
dci_examples_matrix_MatrixEffect.__interfaces__ = [haxedci_Context];
dci_examples_matrix_MatrixEffect.prototype = {
	start: function() {
		this.columns__addColumn();
		return this;
	}
	,clear: function() {
		var _g = this.get_columns().iterator();
		while(_g.head != null) {
			var f;
			f = (function($this) {
				var $r;
				_g.val = _g.head[0];
				_g.head = _g.head[1];
				$r = _g.val;
				return $r;
			}(this));
			f.fadeOut(1500,null,(function(f1) {
				return function() {
					return f1();
				};
			})($bind(f,f.remove)));
		}
		this.get_columns().clear();
		return this;
	}
	,get_screen: function() {
		return this.__screen;
	}
	,get_positions: function() {
		return this.__positions;
	}
	,get_fontSize: function() {
		return this.__fontSize;
	}
	,get_speed: function() {
		return this.__speed;
	}
	,get_columns: function() {
		return this.__columns;
	}
	,columns__addColumn: function() {
		var self = this.get_columns();
		if(this.get_positions().length > 0) {
			var pos = this.get_positions()[Std.random(this.get_positions().length)];
			var el = new $("<div />").css({ 'font-size' : this.get_fontSize() + "px", position : "absolute", width : this.get_fontSize() + "px", margin : "2px", 'word-wrap' : "break-word", overflow : "hidden", height : this.get_screen().height() + 78 + "px", top : 0, left : pos + "px"}).appendTo(this.get_screen());
			var _this = this.get_positions();
			HxOverrides.remove(_this,pos);
			self.add(el);
		}
		this.columns__moveDown();
	}
	,columns__moveDown: function() {
		var _g = this;
		var self = this.get_columns();
		var _g_head = self.h;
		var _g_val = null;
		while(_g_head != null) {
			var column;
			column = (function($this) {
				var $r;
				_g_val = _g_head[0];
				_g_head = _g_head[1];
				$r = _g_val;
				return $r;
			}(this));
			var chars = column.find("span");
			var colors = [["#178f17","#2e2","#0f6b0f","#2e2","#91ff91"]];
			var randomChar = (function() {
				return function() {
					return "&#" + (Std.random(4911) + 192) + ";";
				};
			})();
			var randomColor = (function(colors) {
				return function() {
					return colors[0][Std.random(colors[0].length)];
				};
			})(colors);
			if(chars.length < column.height() * 1.5 / this.get_fontSize()) {
				chars.filter(":last").css("color",randomColor());
				new $("<span>" + randomChar() + "</span>").css("height",this.get_fontSize() + "px").css("width",this.get_fontSize() + "px").css("color","white").appendTo(column);
			}
			if(Math.random() > 0.94) chars.eq(Std.random(chars.length - 1)).html(randomChar()).css("color",randomColor());
		}
		haxe_Timer.delay(function() {
			if(self.length > 0) _g.start();
		},this.get_speed());
		return self;
	}
	,__class__: dci_examples_matrix_MatrixEffect
};
var dci_examples_moneytransfer_contexts_Account = function(ledgers) {
	this.__ledgers = ledgers;
};
dci_examples_moneytransfer_contexts_Account.__name__ = true;
dci_examples_moneytransfer_contexts_Account.__interfaces__ = [haxedci_Context];
dci_examples_moneytransfer_contexts_Account.prototype = {
	balance: function() {
		return this.ledgers__balance();
	}
	,deposit: function(amount) {
		this.ledgers__addEntry("Depositing",amount);
	}
	,withdraw: function(amount) {
		this.ledgers__addEntry("Withdrawing",-amount);
	}
	,get_ledgers: function() {
		return this.__ledgers;
	}
	,ledgers__addEntry: function(message,amount) {
		var self = this.get_ledgers();
		var ledger = new dci_examples_moneytransfer_data_Ledger();
		ledger.message = message;
		ledger.amount = amount;
		self.push(ledger);
	}
	,ledgers__balance: function() {
		var self = this.get_ledgers();
		return Lambda.fold(self,function(a,b) {
			return a.amount + b;
		},0.0);
	}
	,__class__: dci_examples_moneytransfer_contexts_Account
};
var dci_examples_moneytransfer_contexts_MoneyTransfer = function(source,destination,amount) {
	this.__sourceAccount = source;
	this.__destinationAccount = destination;
	this.__amount = amount;
};
dci_examples_moneytransfer_contexts_MoneyTransfer.__name__ = true;
dci_examples_moneytransfer_contexts_MoneyTransfer.__interfaces__ = [haxedci_Context];
dci_examples_moneytransfer_contexts_MoneyTransfer.prototype = {
	transfer: function() {
		this.sourceAccount__transfer(false);
	}
	,transferButDeclineIfNotEnough: function() {
		this.sourceAccount__transfer(true);
	}
	,get_amount: function() {
		return this.__amount;
	}
	,get_sourceAccount: function() {
		return this.__sourceAccount;
	}
	,sourceAccount__transfer: function(declineIfNotEnough) {
		var self = this.get_sourceAccount();
		if(declineIfNotEnough && self.balance() < this.get_amount()) throw new js__$Boot_HaxeError("Declined: Not enough money in account.");
		self.withdraw(this.get_amount());
		this.get_destinationAccount().deposit(this.get_amount());
		return self;
	}
	,get_destinationAccount: function() {
		return this.__destinationAccount;
	}
	,__class__: dci_examples_moneytransfer_contexts_MoneyTransfer
};
var dci_examples_moneytransfer_contexts_PayBills = function(account,creditors) {
	this.__account = account;
	this.__creditors = creditors;
};
dci_examples_moneytransfer_contexts_PayBills.__name__ = true;
dci_examples_moneytransfer_contexts_PayBills.__interfaces__ = [haxedci_Context];
dci_examples_moneytransfer_contexts_PayBills.prototype = {
	payBills: function() {
		this.account__payBills();
	}
	,get_account: function() {
		return this.__account;
	}
	,account__payBills: function() {
		var self = this.get_account();
		var surplus = self.balance() - this.creditors__owed();
		if(surplus < 0) throw new js__$Boot_HaxeError("Not enough money to pay all bills, " + Math.abs(surplus) + " more is needed.");
		var $it0 = $iterator(this.get_creditors())();
		while( $it0.hasNext() ) {
			var creditor = $it0.next();
			new dci_examples_moneytransfer_contexts_MoneyTransfer(self,creditor.account,creditor.amountOwed).transfer();
		}
	}
	,get_creditors: function() {
		return this.__creditors;
	}
	,creditors__owed: function() {
		var self = this.get_creditors();
		return Lambda.fold(self,function(cr,a) {
			return cr.amountOwed + a;
		},0.0);
	}
	,__class__: dci_examples_moneytransfer_contexts_PayBills
};
var dci_examples_moneytransfer_contexts_ValidateCreditCard = function(number) {
	var parsedNumber;
	var _g = [];
	var _g1 = 0;
	var _g2 = Std.string(number).split("");
	while(_g1 < _g2.length) {
		var d = _g2[_g1];
		++_g1;
		_g.push(Std["int"](Std.parseInt(d)));
	}
	parsedNumber = _g;
	this.__checkDigit = parsedNumber.pop();
	this.__digits = parsedNumber;
};
dci_examples_moneytransfer_contexts_ValidateCreditCard.__name__ = true;
dci_examples_moneytransfer_contexts_ValidateCreditCard.__interfaces__ = [haxedci_Context];
dci_examples_moneytransfer_contexts_ValidateCreditCard.prototype = {
	isValid: function() {
		return this.digits__doubleEverySecondFromRight();
	}
	,get_checkDigit: function() {
		return this.__checkDigit;
	}
	,checkDigit__isValid: function() {
		var self = this.get_checkDigit();
		var test = this.digits__sum() * 9;
		return Std.parseInt(HxOverrides.substr(test == null?"null":"" + test,-1,null)) == self;
	}
	,get_digits: function() {
		return this.__digits;
	}
	,digits__doubleEverySecondFromRight: function() {
		var self = this.get_digits();
		var i = this.get_digits().length - 1;
		while(i >= 0) {
			this.get_digits()[i] *= 2;
			if(this.get_digits()[i] > 9) this.get_digits()[i] = this.digits__sumDigitProduct(this.get_digits()[i]);
			i -= 2;
		}
		return (this.digits__sum() + this.get_checkDigit()) % 10 == 0 && this.checkDigit__isValid();
	}
	,digits__sumDigitProduct: function(i) {
		var self = this.get_digits();
		return i % 10 + 1;
	}
	,digits__sum: function() {
		var self = this.get_digits();
		return Lambda.fold(self,function(a,b) {
			return a + b;
		},0);
	}
	,__class__: dci_examples_moneytransfer_contexts_ValidateCreditCard
};
var dci_examples_moneytransfer_data_Creditor = function() {
};
dci_examples_moneytransfer_data_Creditor.__name__ = true;
dci_examples_moneytransfer_data_Creditor.prototype = {
	toString: function() {
		return "" + this.name + ", $" + this.amountOwed;
	}
	,__class__: dci_examples_moneytransfer_data_Creditor
};
var dci_examples_moneytransfer_data_Ledger = function() {
};
dci_examples_moneytransfer_data_Ledger.__name__ = true;
dci_examples_moneytransfer_data_Ledger.prototype = {
	__class__: dci_examples_moneytransfer_data_Ledger
};
var dci_examples_restaurant_contexts_Restaurant = function(console,account) {
	var chef = new dci_examples_restaurant_data_Employee();
	chef.name = "Mr. Blumensay";
	chef.birth = new Date(1970,1,1,0,0,0);
	chef.cookingSkill = Std.random(10);
	var waiter = new dci_examples_restaurant_data_Employee();
	var _g = Std.random(5);
	switch(_g) {
	case 0:
		waiter.name = "Jeeves";
		break;
	case 1:
		waiter.name = "James";
		break;
	case 2:
		waiter.name = "John";
		break;
	case 3:
		waiter.name = "Julian";
		break;
	default:
		waiter.name = "Delbert";
	}
	var menu = [];
	menu.push("Peking Duck");
	menu.push("Shepherds Pie");
	menu.push("Crab Cake");
	menu.push("Roast Beef");
	this.__guests = console;
	this.__waiter = waiter;
	this.__menu = menu;
	this.__order = new dci_examples_restaurant_contexts_ServeFood(waiter,chef,menu,console,account);
};
dci_examples_restaurant_contexts_Restaurant.__name__ = true;
dci_examples_restaurant_contexts_Restaurant.__interfaces__ = [haxedci_Context];
dci_examples_restaurant_contexts_Restaurant.prototype = {
	start: function() {
		this.process = new $.Deferred();
		this.get_order().guestsArriving().then(($_=this.process,$bind($_,$_.notify)));
		return this.process;
	}
	,input: function(msg) {
		var _g1 = this;
		var def = new $.Deferred();
		var choice = Std.parseInt(msg);
		if(choice != null) return this.get_order().guestsOrdering(choice); else {
			var _g = msg.toLowerCase();
			switch(_g) {
			case "":
				break;
			case "quit":case "exit":case "leave":case "goodbye":case "bye":case "pay":case "go home":case "go back":
				this.get_order().guestsPaying().done(function() {
					_g1.waiter__bidFarewell().then(($_=_g1.process,$bind($_,$_.resolve)));
				});
				break;
			default:
				var name;
				if(Std.random(10) == 9) name = "Neo"; else name = "sir";
				this.get_guests().output("Pardon me, " + name + "?");
			}
		}
		return def.resolve().promise();
	}
	,get_waiter: function() {
		return this.__waiter;
	}
	,waiter__bidFarewell: function() {
		var self = this.get_waiter();
		return this.get_guests().output("Goodbye, have a nice evening sir.").then((function(f,a1) {
			return function() {
				return f(a1);
			};
		})(($_=this.get_guests(),$bind($_,$_.output)),""));
	}
	,get_guests: function() {
		return this.__guests;
	}
	,get_menu: function() {
		return this.__menu;
	}
	,get_order: function() {
		return this.__order;
	}
	,__class__: dci_examples_restaurant_contexts_Restaurant
};
var dci_examples_restaurant_contexts_ServeFood = function(waiter,chef,menu,guests,account) {
	this.__waiter = waiter;
	this.__chef = chef;
	this.__menu = menu;
	this.__guests = guests;
	this.__bill = { total : 0};
	this.__account = account;
};
dci_examples_restaurant_contexts_ServeFood.__name__ = true;
dci_examples_restaurant_contexts_ServeFood.__interfaces__ = [haxedci_Context];
dci_examples_restaurant_contexts_ServeFood.prototype = {
	guestsArriving: function() {
		return this.waiter__guestsArriving();
	}
	,guestsOrdering: function(choice) {
		return this.waiter__takeOrder(choice);
	}
	,guestsPaying: function() {
		if(this.get_bill().total > 0) return this.waiter__collectPayment(); else return new $.Deferred().resolve().promise();
	}
	,get_waiter: function() {
		return this.__waiter;
	}
	,waiter__serve: function(food) {
		var self = this.get_waiter();
		var price = Std.random(90) + 10;
		this.guests__eat(food,price);
	}
	,waiter__guestsArriving: function() {
		var self = this.get_waiter();
		var output = ($_=this.get_guests(),$bind($_,$_.output));
		return output("Good evening, my name is " + self.name + ", I'll be your waiter.").then((function(f,a1) {
			return function() {
				return f(a1);
			};
		})(output,"This is on the menu for tonight:")).then((function(f1,a11) {
			return function() {
				return f1(a11);
			};
		})(output,"")).then($bind(this,this.menu__display));
	}
	,waiter__takeOrder: function(choice) {
		var self = this.get_waiter();
		if(choice >= 1 && choice <= this.get_menu().length) {
			var text = this.menu__choice(choice) + ", an excellent choice. I'll be right back.";
			return this.get_guests().output(text).then((function(f,a1) {
				return function() {
					return f(a1);
				};
			})($bind(this,this.chef__cook),choice));
		} else return this.get_guests().output("Sorry sir, we don't have that on the menu tonight.");
	}
	,waiter__collectPayment: function() {
		var _g = this;
		var self = this.get_waiter();
		var restaurantAccount = new dci_examples_moneytransfer_contexts_Account([]);
		return this.get_guests().output("Your total is $" + this.get_bill().total + ".",2000).then(function() {
			try {
				new dci_examples_moneytransfer_contexts_MoneyTransfer(_g.get_account(),restaurantAccount,_g.get_bill().total).transferButDeclineIfNotEnough();
				return _g.get_guests().output("Thank you very much, sir.");
			} catch( e ) {
				if (e instanceof js__$Boot_HaxeError) e = e.val;
				if( js_Boot.__instanceof(e,String) ) {
					var def = new $.Deferred();
					_g.get_guests().output("Sorry sir, your card was declined.").then($bind(def,def.reject));
					return def;
				} else throw(e);
			}
		});
	}
	,get_chef: function() {
		return this.__chef;
	}
	,chef__cook: function(choice) {
		var _g = this;
		var self = this.get_chef();
		var def = new $.Deferred();
		var points = 2;
		var wait = 0;
		if(Std.random(10) < self.cookingSkill) {
			points--;
			wait += 2000;
			haxe_Timer.delay((function(f,a1) {
				return function() {
					return f(a1);
				};
			})($bind(def,def.notify),"You hear a crash in the kitchen."),wait);
		}
		if(Std.random(10) < self.cookingSkill) {
			points--;
			wait += 2000;
			haxe_Timer.delay((function(f1,a11) {
				return function() {
					return f1(a11);
				};
			})($bind(def,def.notify),"Something smells burnt."),wait);
		}
		wait += 3000;
		haxe_Timer.delay(function() {
			var foodName = _g.menu__choice(choice);
			var dish;
			switch(points) {
			case 0:
				dish = "something that looks like a charcoaled roadkill.";
				break;
			case 1:
				dish = "a slightly disfigured " + foodName + ".";
				break;
			case 2:
				dish = "a rather nice looking " + foodName + ".";
				break;
			default:
				throw new js__$Boot_HaxeError("Never send a human to do a machine's job.");
			}
			def.resolve(dish);
		},wait);
		return def.promise().then(function(food) {
			_g.waiter__serve(food);
		},null,function(msg) {
			_g.get_guests().output(msg);
		});
	}
	,get_guests: function() {
		return this.__guests;
	}
	,guests__eat: function(food,price) {
		var self = this.get_guests();
		this.get_bill().total += price;
		self.output("You are served " + food).then((function(f,a1) {
			return function() {
				return f(a1);
			};
		})($bind(self,self.output),"That will be $" + price + ", sir. You can pay when you leave."));
	}
	,get_menu: function() {
		return this.__menu;
	}
	,menu__choice: function(choice) {
		var self = this.get_menu();
		return self[choice - 1];
	}
	,menu__display: function() {
		var self = this.get_menu();
		var index = 0;
		var _g = 0;
		while(_g < self.length) {
			var item = self[_g];
			++_g;
			this.get_guests().output(++index + " - " + item);
		}
		this.get_guests().output("");
	}
	,get_bill: function() {
		return this.__bill;
	}
	,get_account: function() {
		return this.__account;
	}
	,__class__: dci_examples_restaurant_contexts_ServeFood
};
var dci_examples_restaurant_data_Employee = function() {
};
dci_examples_restaurant_data_Employee.__name__ = true;
dci_examples_restaurant_data_Employee.prototype = {
	__class__: dci_examples_restaurant_data_Employee
};
var haxe_IMap = function() { };
haxe_IMap.__name__ = true;
var haxe_Timer = function(time_ms) {
	var me = this;
	this.id = setInterval(function() {
		me.run();
	},time_ms);
};
haxe_Timer.__name__ = true;
haxe_Timer.delay = function(f,time_ms) {
	var t = new haxe_Timer(time_ms);
	t.run = function() {
		t.stop();
		f();
	};
	return t;
};
haxe_Timer.prototype = {
	stop: function() {
		if(this.id == null) return;
		clearInterval(this.id);
		this.id = null;
	}
	,run: function() {
	}
	,__class__: haxe_Timer
};
var haxe_ds_ObjectMap = function() {
	this.h = { };
	this.h.__keys__ = { };
};
haxe_ds_ObjectMap.__name__ = true;
haxe_ds_ObjectMap.__interfaces__ = [haxe_IMap];
haxe_ds_ObjectMap.prototype = {
	set: function(key,value) {
		var id = key.__id__ || (key.__id__ = ++haxe_ds_ObjectMap.count);
		this.h[id] = value;
		this.h.__keys__[id] = key;
	}
	,remove: function(key) {
		var id = key.__id__;
		if(this.h.__keys__[id] == null) return false;
		delete(this.h[id]);
		delete(this.h.__keys__[id]);
		return true;
	}
	,__class__: haxe_ds_ObjectMap
};
var js__$Boot_HaxeError = function(val) {
	Error.call(this);
	this.val = val;
	this.message = String(val);
	if(Error.captureStackTrace) Error.captureStackTrace(this,js__$Boot_HaxeError);
};
js__$Boot_HaxeError.__name__ = true;
js__$Boot_HaxeError.__super__ = Error;
js__$Boot_HaxeError.prototype = $extend(Error.prototype,{
	__class__: js__$Boot_HaxeError
});
var js_Boot = function() { };
js_Boot.__name__ = true;
js_Boot.getClass = function(o) {
	if((o instanceof Array) && o.__enum__ == null) return Array; else {
		var cl = o.__class__;
		if(cl != null) return cl;
		var name = js_Boot.__nativeClassName(o);
		if(name != null) return js_Boot.__resolveNativeClass(name);
		return null;
	}
};
js_Boot.__string_rec = function(o,s) {
	if(o == null) return "null";
	if(s.length >= 5) return "<...>";
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) t = "object";
	switch(t) {
	case "object":
		if(o instanceof Array) {
			if(o.__enum__) {
				if(o.length == 2) return o[0];
				var str2 = o[0] + "(";
				s += "\t";
				var _g1 = 2;
				var _g = o.length;
				while(_g1 < _g) {
					var i1 = _g1++;
					if(i1 != 2) str2 += "," + js_Boot.__string_rec(o[i1],s); else str2 += js_Boot.__string_rec(o[i1],s);
				}
				return str2 + ")";
			}
			var l = o.length;
			var i;
			var str1 = "[";
			s += "\t";
			var _g2 = 0;
			while(_g2 < l) {
				var i2 = _g2++;
				str1 += (i2 > 0?",":"") + js_Boot.__string_rec(o[i2],s);
			}
			str1 += "]";
			return str1;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( e ) {
			if (e instanceof js__$Boot_HaxeError) e = e.val;
			return "???";
		}
		if(tostr != null && tostr != Object.toString && typeof(tostr) == "function") {
			var s2 = o.toString();
			if(s2 != "[object Object]") return s2;
		}
		var k = null;
		var str = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) {
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str.length != 2) str += ", \n";
		str += s + k + " : " + js_Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str += "\n" + s + "}";
		return str;
	case "function":
		return "<function>";
	case "string":
		return o;
	default:
		return String(o);
	}
};
js_Boot.__interfLoop = function(cc,cl) {
	if(cc == null) return false;
	if(cc == cl) return true;
	var intf = cc.__interfaces__;
	if(intf != null) {
		var _g1 = 0;
		var _g = intf.length;
		while(_g1 < _g) {
			var i = _g1++;
			var i1 = intf[i];
			if(i1 == cl || js_Boot.__interfLoop(i1,cl)) return true;
		}
	}
	return js_Boot.__interfLoop(cc.__super__,cl);
};
js_Boot.__instanceof = function(o,cl) {
	if(cl == null) return false;
	switch(cl) {
	case Int:
		return (o|0) === o;
	case Float:
		return typeof(o) == "number";
	case Bool:
		return typeof(o) == "boolean";
	case String:
		return typeof(o) == "string";
	case Array:
		return (o instanceof Array) && o.__enum__ == null;
	case Dynamic:
		return true;
	default:
		if(o != null) {
			if(typeof(cl) == "function") {
				if(o instanceof cl) return true;
				if(js_Boot.__interfLoop(js_Boot.getClass(o),cl)) return true;
			} else if(typeof(cl) == "object" && js_Boot.__isNativeObj(cl)) {
				if(o instanceof cl) return true;
			}
		} else return false;
		if(cl == Class && o.__name__ != null) return true;
		if(cl == Enum && o.__ename__ != null) return true;
		return o.__enum__ == cl;
	}
};
js_Boot.__nativeClassName = function(o) {
	var name = js_Boot.__toStr.call(o).slice(8,-1);
	if(name == "Object" || name == "Function" || name == "Math" || name == "JSON") return null;
	return name;
};
js_Boot.__isNativeObj = function(o) {
	return js_Boot.__nativeClassName(o) != null;
};
js_Boot.__resolveNativeClass = function(name) {
	return (Function("return typeof " + name + " != \"undefined\" ? " + name + " : null"))();
};
function $iterator(o) { if( o instanceof Array ) return function() { return HxOverrides.iter(o); }; return typeof(o.iterator) == 'function' ? $bind(o,o.iterator) : o.iterator; }
var $_, $fid = 0;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $fid++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; o.hx__closures__[m.__id__] = f; } return f; }
if(Array.prototype.indexOf) HxOverrides.indexOf = function(a,o,i) {
	return Array.prototype.indexOf.call(a,o,i);
};
String.prototype.__class__ = String;
String.__name__ = true;
Array.__name__ = true;
Date.prototype.__class__ = Date;
Date.__name__ = ["Date"];
var Int = { __name__ : ["Int"]};
var Dynamic = { __name__ : ["Dynamic"]};
var Float = Number;
Float.__name__ = ["Float"];
var Bool = Boolean;
Bool.__ename__ = ["Bool"];
var Class = { __name__ : ["Class"]};
var Enum = { };
dci_examples_matrix_Console.__meta__ = { fields : { processes : { role : null}, input : { role : null}, screen : { role : null}}};
dci_examples_matrix_Matrix.__meta__ = { fields : { console : { role : null}, bills : { role : null}, neoAccount : { role : null}}};
dci_examples_matrix_MatrixEffect.__meta__ = { fields : { screen : { role : null}, positions : { role : null}, fontSize : { role : null}, speed : { role : null}, columns : { role : null}}};
dci_examples_moneytransfer_contexts_Account.__meta__ = { fields : { ledgers : { role : null}}};
dci_examples_moneytransfer_contexts_MoneyTransfer.__meta__ = { fields : { amount : { role : null}, sourceAccount : { role : null}, destinationAccount : { role : null}}};
dci_examples_moneytransfer_contexts_PayBills.__meta__ = { fields : { account : { role : null}, creditors : { role : null}}};
dci_examples_moneytransfer_contexts_ValidateCreditCard.__meta__ = { fields : { checkDigit : { role : null}, digits : { role : null}}};
dci_examples_restaurant_contexts_Restaurant.__meta__ = { fields : { waiter : { role : null}, guests : { role : null}, menu : { role : null}, order : { role : null}}};
dci_examples_restaurant_contexts_ServeFood.__meta__ = { fields : { waiter : { role : null}, chef : { role : null}, guests : { role : null}, menu : { role : null}, bill : { role : null}, account : { role : null}}};
haxe_ds_ObjectMap.count = 0;
js_Boot.__toStr = {}.toString;
dci_examples_Main.main();
})(typeof console != "undefined" ? console : {log:function(){}});

//# sourceMappingURL=dci.js.map
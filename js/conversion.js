var timer=0;
var tooltipElements = document.getElementsByClassName("tooltip");
var tooltip = tooltipElements[0];

	/**
 	* Calculates the binary(base 2) of a decimal(base 10) number.
 	* @param {number} val The desired decimal number to be converted.
 	* @return {string} Returns a string representation of a binary number.
 	*/
	function getBinary(val){
		var binary = [];
		var binary_str = '';

		if(val<0){
			console.log("Invalid input. Number must be positive.");
		}
		else if(val>0){ 
			while(val>0){
				binary.push(val%2);
				val = Math.floor(val/2);
			}
			binary.reverse();
			binary.push(" ");
			binary_str += binary.join("");
			binary = [];
		}
		else{
				binary_str = "00000000 ";
			}
		return binary_str;
	}

	/**
 	* Calculates the given base number of a decimal(base 10) number.
 	* @param {number} base, The base value to convert to.
 	* @param {number} val, The desired decimal number to be converted.
 	* @return {string} Returns a string representation of a hexidecimal number.
 	*/
	function getBaseX(base, val){

		switch(base){
			case 16:
			case 32:
			case 64:
				//convert(base, val);
				var num = '';

				if(val>=0 && val<base){
					num+=lookup(base, Math.floor(val));
					num+=" ";
					return num;
				}
				else{
					var x = Math.floor(val/base);
					var y = val%base;

					num+=lookup(base, x);
					num+=lookup(base, y);
					num+=" ";

					return num;
				}
				break;

			default:
				console.log("Invalid base. Acceptable bases are 16, 32, and 64");
		}
	}

	/**
 	* Looks up the corresponding value for a given decimal number and base.
 	* @param {number} base, The base value to convert to.
 	* @param {number} val, The desired decimal number to be converted.
 	* @return {string} Returns a single letter or decimal number.
 	*/
	function lookup(base, val){
		var lookup = getLookup(base, val);

		if(val<0){
			console.log("Invalid input. Number must be positive");
		}
		else if(base==16 && val<10){//special case for hexidecimal. it might be better to just omit this condition and make have the base 16 lookup table mimic the others...satisfying case 0-9?
			return val;
		}
		else if(lookup[val] !== undefined){
		//value should be represented as hex value
			return lookup[val];
		}
		else{
			return getBaseX(base, val);
		}
	}

	/**
 	* Creates a base number object containing decimal numbers and their corresponding values .
 	* @param {number} base, The base value to convert to.
 	* @param {number} val, The desired decimal number to be converted.
 	* @return {object} Returns an base number object.
 	*/
	function getLookup(base, val){
		var lookup ={};

		switch(base){
			case 16:
				lookup = {10:'A', 11:'B', 12:'C', 13:'D', 14:'E', 15:'F'};
				return lookup;				
				break;
			
			case 32:
				lookup = {0:'A', 1:'B', 2:'C', 3:'D', 4:'E', 5:'F', 6:'G', 7:'H', 8:'I', 9:'J', 10:'K', 11:'L', 12:'M', 13:'N', 14:'O', 15:'P', 16:'Q', 17:'R', 18:'S', 19:'T', 20:'U', 21:'V', 22:'W', 23:'X', 24:'Y', 25:'Z', 26:'2', 27:'3', 28:'4', 29:'5', 30:'6', 31:'7'};
				return lookup;
				break;
			
			case 64:
				lookup = {0:'A', 1:'B', 2:'C', 3:'D', 4:'E', 5:'F', 6:'G', 7:'H', 8:'I', 9:'J', 10:'K', 11:'L', 12:'M', 13:'N', 14:'O', 15:'P', 16:'Q', 17:'R', 18:'S', 19:'T', 20:'U', 21:'V', 22:'W', 23:'X', 24:'Y', 25:'Z', 26:'a', 27:'b', 28:'c', 29:'d', 30:'e', 31:'f', 32:'g', 33:'h', 34:'i', 35:'j', 36:'k', 37:'l', 38:'m', 39:'n', 40:'o', 41:'p', 42:'q', 43:'r',44:'s', 45:'t', 46:'u', 47:'v', 48:'w', 49:'x', 50:'y', 51:'z', 52:'0', 53:'1', 54:'2', 55:'3', 56:'4', 57:'5', 58:'6', 59:'7', 60:'8', 61:'9', 62:'+', 63:'/'};
				return lookup;
				break;

			default:
				console.log("Invalid Base. Acceptable bases are 16, 32, and 64.");
		}
	}

	/**
 	* Makes a call to setTimeout. Callback of setTimeout calculates base2, base16, base32, and base64 and renders information within a tooltip.
 	* @param {object} ctx A drawing context object.
 	* @param {eventObject} e The mousemove event 
 	*/
	function startTimer(ctx, e){
		/*
		QUESTION: do i really need to clear the timer? what happens if i just reset the timer variable?
		*/

		var x = e.offsetX;
		var y = e.offsetY;
		
		// clear a timer
		if(timer>0){
			clearTimeout(timer);
		}

		// set a time
		//timer = setTimeout(calculateConversions(x, y, ctx), 500);
		timer = setTimeout(function(){
			var rgb = ctx.getImageData(x,y,1,1).data;
			var hex = binary = base32 = base64 = '';

			for(var i = 0; i<(rgb.length)-1; i++){
				binary += getBinary(rgb[i]);
				base32 += getBaseX(32,rgb[i]);
				base64 += getBaseX(64,rgb[i]);
				hex += getBaseX(16,rgb[i]); //QUESTION: i just removed the keyword var from this line. prior to doing that the line didn't work, what exaclty was happening since i essentially redeclared hex every time?
			}
			
			rgb = rgb[0]+" "+rgb[1]+" "+rgb[2];

			var innerHTML = "<p>RGB: "+ rgb+" "+"<br>x16: "+hex+"<br>x2: "+binary+"<br>x32: "+base32+"<br>x64: "+base64+"</p>";
			
			tooltip.innerHTML = innerHTML;
			tooltip.style.display = 'inline';
			console.log(e.pageX+" "+e.pageY);

				if(e.pageY-100 < 35){
					tooltip.style.top = "35px";
				}
				else{
					tooltip.style.top = e.pageY-100+"px"; 
				}

				if(e.pageX-100 < 55){
					tooltip.style.left = "55px";
				}
				else{
					tooltip.style.left = e.pageX-100+"px"; 
				}
			}, 300);
		}

	document.addEventListener('mousemove', function(e){
		if (e.target.nodeName == 'IMG') {
			var	img = e.target;
			var canvas = document.createElement('canvas');
			
			canvas.width = img.width;
			canvas.height = img.height;
			
			var ctx = canvas.getContext('2d');
			ctx.drawImage(img, 0,0);

			console.log(ctx.getImageData(e.offsetX,e.offsetY,1,1).data);
			startTimer(ctx, e);
		}
		else{
			//don't execute calculation from last image mousemove event
			clearTimeout(timer);
			tooltip.style.display = 'none';
		}
	
	})


	/*function calculateConversions(x, y, ctx){
		getHex(ctx.getImageData(x,y,1,1).data);
		calculateBinary(ctx.getImageData(x,y,1,1).data);
		getBase32(ctx.getImageData(x,y,1,1).data);
	}*/

	/*function convert(base, val){
		var num = '';

		if(val>=0 && val<base){
			num+=lookup(base, Math.floor(val));
			num+=" ";
			return num;
		}
		else{
			var x = Math.floor(val/base);
			var y = val%base;

			num+=lookup(base, x);
			num+=lookup(base, y);
			num+=" ";

			return num;
		}
	}*/
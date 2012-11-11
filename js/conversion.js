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
 	* Calculates the hexidecimal(base 16) of a decimal(base 10) number.
 	* @param {number} val The desired decimal number to be converted.
 	* @return {string} Returns a string representation of a hexidecimal number.
 	*/
	function getHex(val){
		var hex = '';
		
		if(val>=0 && val<16){
			hex+=lookupHex(Math.floor(val));
			hex+=" ";
			return hex;
		}
		else{
			var x = Math.floor(val/16);
			var y = val%16;

			hex+=lookupHex(x);
			hex+=lookupHex(y);
			hex+=" ";

			return hex;
		}
	}

	/**
 	* Maps a given decimal(base 10) value with its corresponding hexidecimal representation.
 	* @param {number} val The desired decimal number to map.
 	* @return {string} Returns a single letter or number.
 	*/
	function lookupHex(val){
		var hex_lookup = {10:'A', 11:'B', 12:'C', 13:'D', 14:'E', 15:'F'};

		if(val<0){
			console.log("Invalid input. Number must be positive");
		}
		else if(val<10){
			return val;
		}
		else if(hex_lookup[val] !== undefined){
		//value should be represented as hex value
			return hex_lookup[val];
		}
		else{
			return getHex(val);
		}
	}

	/**
 	* Calculates the base 32 of a decimal(base 10) number.
 	* @param {number} val The desired decimal number to be converted.
 	* @return {string} Returns a string representation of a base 32 number.
 	*/
	function getBase32(val){
		var base32 = '';
		
		if(val>=0 && val<32){
			base32+=lookupBase32(Math.floor(val));
			base32+=" ";
			return base32;
		}
		else{
			var x = Math.floor(val/32);
			var y = val%32;
				
			base32+=lookupBase32(x);
			base32+=lookupBase32(y);
			base32+=" ";
			
			return base32;
		}
	}

	/**
 	* Maps a given decimal(base 10) value with its corresponding base 32 representation.
 	* @param {number} val The desired decimal number to map.
 	* @return {string} Returns a single letter or number.
 	*/
	function lookupBase32(val){
		var base32_lookup = {0:'A', 1:'B', 2:'C', 3:'D', 4:'E', 5:'F', 6:'G', 7:'H', 8:'I', 9:'J', 10:'K', 11:'L', 12:'M', 13:'N', 14:'O', 15:'P', 16:'Q', 17:'R', 18:'S', 19:'T', 20:'U', 21:'V', 22:'W', 23:'X', 24:'Y', 25:'Z', 26:'2', 27:'3', 28:'4', 29:'5', 30:'6', 31:'7'}

		if(val<0){
			console.log("Invalid input. Number must be positive");
		}
		else if(base32_lookup[val] !== undefined){
			return base32_lookup[val];
		}
		else{
			return getBase32(val);
		}
	}

	/**
 	* Calculates the base 64 of a decimal(base 10) number.
 	* @param {number} val The desired decimal number to be converted.
 	* @return {string} Returns a string representation of a base 32 number.
 	*/
	function getBase64(val){
		var base64 = '';

		if(val>=0 && val<64){
			return lookupBase64(Math.floor(val));
		}
		else{
			var x = Math.floor(val/64);
			var y = val%64;
				

			base64+=lookupBase64(x);
			base64+=lookupBase64(y);
			base64+=" ";
			
			return base64;
		}
	}

	function lookupBase64(val){
		var base64_lookup = {0:'A', 1:'B', 2:'C', 3:'D', 4:'E', 5:'F', 6:'G', 7:'H', 8:'I', 9:'J', 10:'K', 11:'L', 12:'M', 13:'N', 14:'O', 15:'P', 16:'Q', 17:'R', 18:'S', 19:'T', 20:'U', 21:'V', 22:'W', 23:'X', 24:'Y', 25:'Z', 26:'a', 27:'b', 28:'c', 29:'d', 30:'e', 31:'f', 32:'g', 33:'h', 34:'i', 35:'j', 36:'k', 37:'l', 38:'m', 39:'n', 40:'o', 41:'p', 42:'q', 43:'r',44:'s', 45:'t', 46:'u', 47:'v', 48:'w', 49:'x', 50:'y', 51:'z', 52:'0', 53:'1', 54:'2', 55:'3', 56:'4', 57:'5', 58:'6', 59:'7', 60:'8', 61:'9', 62:'+', 63:'/'};

		if(val<0){
			console.log("Invalid input. Number must be positive");
		}
		else if(base64_lookup[val] !== undefined){
			return base64_lookup[val];
		}
		else{
			return getBase64(val);
		}
	}

	/**
 	* Maps a given decimal(base 10) value with its corresponding base 64 representation.
 	* @param {number} val The desired decimal number to map.
 	* @return {string} Returns a single letter or number.
 	*/
	function lookupBase64(val){
		var base64_lookup = {0:'A', 1:'B', 2:'C', 3:'D', 4:'E', 5:'F', 6:'G', 7:'H', 8:'I', 9:'J', 10:'K', 11:'L', 12:'M', 13:'N', 14:'O', 15:'P', 16:'Q', 17:'R', 18:'S', 19:'T', 20:'U', 21:'V', 22:'W', 23:'X', 24:'Y', 25:'Z', 26:'a', 27:'b', 28:'c', 29:'d', 30:'e', 31:'f', 32:'g', 33:'h', 34:'i', 35:'j', 36:'k', 37:'l', 38:'m', 39:'n', 40:'o', 41:'p', 42:'q', 43:'r',44:'s', 45:'t', 46:'u', 47:'v', 48:'w', 49:'x', 50:'y', 51:'z', 52:'0', 53:'1', 54:'2', 55:'3', 56:'4', 57:'5', 58:'6', 59:'7', 60:'8', 61:'9', 62:'+', 63:'/'};

		if(val<0){
			console.log("Invalid input. Number must be positive");
		}
		else if(base64_lookup[val] !== undefined){
			return base64_lookup[val];
		}
		else{
			return getBase64(val);
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
			var hex = '';
			var binary = '';
			var base32 = '';
			var base64 = '';

			for(var i = 0; i<(rgb.length)-1; i++){
				hex += getHex(rgb[i]); //QUESTION: i just removed the keyword var from this line. prior to doing that, the line didn't work, what exaclty was happening since i essentially redeclared hex every time?
				binary += getBinary(rgb[i]);
				base32 += getBase32(rgb[i]);
				base64 += getBase64(rgb[i]);
			}
			
			rgb = rgb[0]+" "+rgb[1]+" "+rgb[2];

			var innerHTML = "<p>RGB: "+ rgb+" "+"<br>x16: "+hex+"<br>x2: "+binary+"<br>x32: "+base32+"<br>x64: "+base64;
			
			tooltip.innerHTML = innerHTML;
			tooltip.style.display = 'inline';
			tooltip.style.left = e.pageX+"px"; 
			tooltip.style.top = e.pageY+"px";}, 300);
		}

	/*function calculateConversions(x, y, ctx){
		getHex(ctx.getImageData(x,y,1,1).data);
		calculateBinary(ctx.getImageData(x,y,1,1).data);
		getBase32(ctx.getImageData(x,y,1,1).data);
	}*/


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

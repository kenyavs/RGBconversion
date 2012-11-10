var timer=0;
var tooltipElements = document.getElementsByClassName("tooltip");
var tooltip = tooltipElements[0];
var canvas = document.createElement('canvas');
/*function toBinary(num) {
	// return binary string
}

str = ""
for number in list
	str += toBinary(number)
return str*/

	function calculateBinary(rgb){
		var binary = [];
		var binary_str ='';

		for(var i=0; i<rgb.length-1; i++){
			var x = rgb[i];

			//QUESTION: in this case, is it good enough to just do != versus !==?

			if(x!==0){ 
				while(x>0){
					binary.push(x%2);
					x = Math.floor(x/2);
				}
				binary.reverse();
				binary.push(" ");
				binary_str += binary.join("");
				binary = [];
			}
			else{
				binary_str = "00000000 00000000 00000000";
			}
		}
		return binary_str;
	}

	function calculateHex(rgb){
		var hex ='';
		//QUESTION: is it bad practice to redeclaring x and y? should the declaration happen outside of the loop?

		for(var i=0; i<(rgb.length)-1; i++){//omit A value
			var x = Math.floor(rgb[i]/16);
			var y = rgb[i]%16;

			hex+=lookupHex(x);
			hex+=lookupHex(y);
			hex+=" ";
		}
		return hex;
		//console.log(hex);
	}

	function lookupHex(val){
		var hex_lookup = {10:'A', 11:'B', 12:'C', 13:'D', 14:'E', 15:'F'};

		if(hex_lookup[val] !== undefined){
		//value should be represented as hex value
			return hex_lookup[val];
		}
		else{
			return val;
		}
	}

	function calculateBase32(rgb){
		var base32 = '';

		for(var i=0; i<(rgb.length)-1; i++){
			var x = Math.floor(rgb[i]/32);
			var y = rgb[i]%32;

			/*if(x>31){
				calculateBase32(x)
			}*/

			base32+=lookupBase32(x);
			base32+=lookupBase32(y);
			base32+=" ";
		}
		return base32;
		//console.log(base32);
	}

	function lookupBase32(val){
		var base32_lookup = {0:'A', 1:'B', 2:'C', 3:'D', 4:'E', 5:'F', 6:'G', 7:'H', 8:'I', 9:'J', 10:'K', 11:'L', 12:'M', 13:'N', 14:'O', 15:'P', 16:'Q', 17:'R', 18:'S', 19:'T', 20:'U', 21:'V', 22:'W', 23:'X', 24:'Y', 25:'Z', 26:'2', 27:'3', 28:'4', 29:'5', 30:'6', 31:'7'}

		if(base32_lookup[val] !== undefined){
			return base32_lookup[val];
		}
		else{
			alert("Invalid value");
		}
	}

	function startTimer(ctx, e){
		/*// clear a timer
		clearTimeout(timer);
		QUESTION: do i really need to clear the timer? what happens if i just reset the timer variable?
		*/

		var x = e.offsetX;
		var y = e.offsetY;
		console.log(x+" "+y);
		// clear a timer
		if(timer>0){
			clearTimeout(timer);
		}

		// set a time
		//timer = setTimeout(calculateConversions(x, y, ctx), 500);
		timer = setTimeout(function(){
			var rgb = ctx.getImageData(x,y,1,1).data;
			rgb = rgb[0]+" "+rgb[1]+" "+rgb[2];
			var hex = calculateHex(ctx.getImageData(x,y,1,1).data);
			var binary = calculateBinary(ctx.getImageData(x,y,1,1).data);
			var base32 = calculateBase32(ctx.getImageData(x,y,1,1).data);

			var innerHTML = "<p>RGB: "+ rgb+" "+"<br>Hex: "+hex+"<br>Binary: "+binary+"<br>Base 32: "+base32;
			
			tooltip.innerHTML = innerHTML;
			tooltip.style.display = 'inline';
			tooltip.style.left = e.pageX-100+"px"; 
			tooltip.style.top = e.pageY-100+"px";}, 400);
		}
	//}

	/*function calculateConversions(x, y, ctx){
		calculateHex(ctx.getImageData(x,y,1,1).data);
		calculateBinary(ctx.getImageData(x,y,1,1).data);
		calculateBase32(ctx.getImageData(x,y,1,1).data);
	}*/


	document.addEventListener('mousemove', function(e){
		if (e.target.nodeName == 'IMG') {
			var	img = e.target;
			
			canvas.width = img.width;
			canvas.height = img.height;
			
			var ctx = canvas.getContext('2d');
			ctx.drawImage(img, 0,0);

			console.log(ctx.getImageData(e.offsetX,e.offsetY,1,1).data);
			startTimer(ctx, e);

			/*calculateHex(ctx.getImageData(x,y,1,1).data);
			calculateBinary(ctx.getImageData(x,y,1,1).data);
			calculateBase32(ctx.getImageData(x,y,1,1).data);*/
		}
		else{
			//don't execute calculation from last image mousemove event
			clearTimeout(timer);
			tooltip.style.display = 'none';
		}
	
	})

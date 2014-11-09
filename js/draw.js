window.onload = function(){

	var canvasSupport = document.getElementById('canvas-support'),
			canvas = document.createElement('canvas'),
			context = canvas.getContext('2d');

	canvas.setAttribute('id', 'canvas');
	canvasSupport.appendChild(canvas);
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	
	var	lineWidth = 2,
			radius = 2,
			draw = false;

	context.lineWidth = radius*2;

/* check for touch inputs. If not default to mouse inputs*/

	var ifTouch = ('ontouchstart' in window),
			startEvent = ifTouch ? 'touchstart' : 'mousedown',
			moveEvent = ifTouch ? 'touchmove' : 'mousemove',
			endEvent = ifTouch ? 'touchend' : 'mouseup';

	canvas.addEventListener(startEvent, drawStart, false);
	canvas.addEventListener(moveEvent, drawing, true);
	canvas.addEventListener(endEvent, endDraw, false);

	function drawStart(e){
		e.preventDefault(); 
		draw = true;
		drawing(e);
	}

	function drawing(e){
		if (draw) {
			var x = ifTouch ? (e.targetTouches[0].pageX - canvas.offsetLeft) : (e.offsetX || e.layerX - canvas.offsetLeft),
					y = ifTouch ? (e.targetTouches[0].pageY - canvas.offsetTop) : (e.offsetY || e.layerY - canvas.offsetTop);

			canvas.style.cursor = "crosshair";
			context.lineTo(x, y);
			context.stroke();
			context.beginPath();
			context.arc(x, y, radius, 0, Math.PI*2); 
			context.fill();
			context.beginPath();
			context.moveTo(x, y);
		}
	}

	function endDraw(){
		draw = false;
		canvas.style.cursor = "default";
		context.beginPath();
	}

/* change line width */

	var lineWithOutput = document.getElementById('line-width'),
			brushSizeBtn = document.getElementById('rangeSlider');

	brushSizeBtn.addEventListener('click', toggleRangeSlider, false);
	brushSizeBtn.addEventListener('change', updateLineWidth, false);

	lineWithOutput.innerHTML = radius;

	function updateLineWidth(newSize) {
		newSize = brushSizeBtn.value;
		lineWithOutput.innerHTML = newSize;
		radius = newSize;
		context.lineWidth = radius*2;
		if (brushTypeBtn.classList.contains('icon-pen')) {
			context.shadowBlur = Math.round(newSize / 3);
		}
	}

	function toggleRangeSlider(){
		brushSizeBtn.classList.toggle('show-slider');
	}

/* color button menu and change line color */
	
	var menuButton = document.getElementById('color-menu-button'),
			drop = document.getElementsByClassName('drop-down')[0],
			rise = document.getElementsByClassName('rise-up')[0],
			menuButtonBg = document.getElementsByTagName('nav')[0];

	menuButton.addEventListener('click', menuClick, false);

	function menuClick(){
		if (menuButton.classList.contains('drop-down')){
			menuButton.classList.remove('drop-down');
			menuButton.classList.add('rise-up');
			menuButtonBg.classList.remove('open-whole');
		} else {
			menuButtonBg.classList.add('open-whole');
			menuButton.classList.remove('rise-up');
			menuButton.classList.add('drop-down');  
		}
	}

	var swatches = document.getElementById('swatches');
	var colors = ["#2c3e50", "#3498db", "#2ecc71", "#e74c3c", "#9b59b6", "#f1c40f", "#000", "pink"];

	for(var i = 0, j = colors.length; i<j; i++){
		var swatch = document.createElement('li');
		swatch.style.backgroundColor = colors[i];
		swatches.appendChild(swatch);
	}

	swatches.addEventListener('click', setSwatch, false);

	function setSwatch(e){
		var target = e.target,
				selected = swatches.querySelector("li.selected");

		if(selected){
			selected.classList.remove('selected');
		} 
		
		if(target.nodeName.toLowerCase() === 'li'){
			target.classList.toggle('selected');
			if (menuButton.classList.contains('drop-down')) {
				menuButton.classList.remove('drop-down');
				menuButton.classList.add('rise-up');
			}
			
			menuButtonBg.classList.remove('open-whole');
		}

		setColor(target.style.backgroundColor);
	}

	function setColor(color){
		context.strokeStyle = context.shadowColor = context.fillStyle = color;
	}

setSwatch( { target: swatches.querySelector('li') } );

/* clear canvas */

	var clearButton = document.getElementById('clear');

	clearButton.addEventListener('click', clearCanvas, false);

	function clearCanvas(){
		context.clearRect(0, 0, canvas.width, canvas.height);
	}

/* save image */

	var saveButton = document.getElementById('save');

	saveButton.addEventListener('click', saveImage, false);

	function saveImage(){
		var data = canvas.toDataURL();
		
		window.open(data, '_blank', 'location=0, menubar=0');
	} 

}

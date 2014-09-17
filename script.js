	var canvas = document.getElementById('canvas'),
			context = canvas.getContext('2d'),
			lineWidth = 2,
			draw = false,
			cords = [];

	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

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
	}

	function drawing(e){
		if (draw) {
			var x = ifTouch ? (e.targetTouches[0].pageX - canvas.offsetLeft) : (e.offsetX || e.layerX - canvas.offsetLeft),
	  			y = ifTouch ? (e.targetTouches[0].pageY - canvas.offsetTop) : (e.offsetY || e.layerY - canvas.offsetTop);
			cords.push({
				x: x,
				y: y
			});

			drawOnCanvas(cords);
		}
	}

	function endDraw(){
		draw = false;
		canvas.style.cursor = "default";
		cords = [];
	}

	function drawOnCanvas(cords) {
		canvas.style.cursor = "crosshair";
		context.beginPath();
		context.moveTo(cords[0].x, cords[0].y);

		for (var i=1; i<cords.length; i++) {
			context.lineTo(cords[i].x, cords[i].y);
		}
		context.lineJoin = context.lineCap = 'round';
		context.lineWidth = lineWidth;
		context.stroke();
	}

// Change brush type	

	var	brushTypeBtn = document.getElementById('brush-type'),
			brushSizeBtn = document.getElementById('rangeSlider');

	brushTypeBtn.addEventListener('click', changeBrushType, false);
	brushSizeBtn.addEventListener('click', toggleRangeSlider, false);

	context.shadowBlur = Math.round(lineWidth / 3);

	function changeBrushType(){
		if (brushTypeBtn.classList.contains('icon-pencil')) {
			brushTypeBtn.classList.remove('icon-pencil');
			brushTypeBtn.classList.add('icon-pen');
			context.shadowBlur = Math.round(lineWidth / 3);
		} else if (brushTypeBtn.classList.contains('icon-pen')) {
			brushTypeBtn.classList.remove('icon-pen');
			brushTypeBtn.classList.add('icon-pencil');
			context.shadowBlur = 0;
		}
	}	

// change line width

	var lineWithOutput = document.getElementById('line-width');

	lineWithOutput.innerHTML = lineWidth;

	function updateLineWidth(newSize) {
	 lineWithOutput.innerHTML = newSize;
	 lineWidth = newSize;
	 if (brushTypeBtn.classList.contains('icon-pen')) {
		 context.shadowBlur = Math.round(newSize / 3);
		}
	}

	function toggleRangeSlider(){
		brushSizeBtn.classList.toggle('show-slider');
	}

	// color button menu and change line color
	
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
		// inject swatches into HTML. 
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
		context.strokeStyle = context.shadowColor = color;
	}

setSwatch( { target: swatches.querySelector('li') } );

// clear canvas

	var clearButton = document.getElementById('clear');

	clearButton.addEventListener('click', clearCanvas, false);

	function clearCanvas(){
		context.clearRect(0, 0, canvas.width, canvas.height);
	}

// save image

	var saveButton = document.getElementById('save');

	saveButton.addEventListener('click', saveImage, false);

	function saveImage(){
		var data = canvas.toDataURL();
		
		window.open(data, '_blank', 'location=0, menubar=0');
	} 


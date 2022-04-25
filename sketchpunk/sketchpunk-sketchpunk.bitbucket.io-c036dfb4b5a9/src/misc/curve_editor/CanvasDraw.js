class CanvasDraw{
	constructor( elm=null ){
		this.dom		= document.createElement( "canvas" );
		this.ctx		= this.dom.getContext( "2d" );
		this.fontSize	= 12;

		this.offsetX = 0;
		this.offsetY = 0;

		if( elm ) elm.appendChild( this.dom );
	}

	/////////////////////////////////////////////////////////
	// 
	/////////////////////////////////////////////////////////
		eventXY( e ){ return [ e.clientX - this.offsetX, e.clientY - this.offsetY ]; }

		mouseEvents(onDown=null, onMove=null, onUp=null){
			if(onDown){
				this.ctx.canvas.addEventListener("mousedown", (e)=>{
					e.preventDefault(); e.stopPropagation();
					onDown(e, e.clientX - this.offsetX, e.clientY - this.offsetY);
				});
			}
			if(onMove){
				this.ctx.canvas.addEventListener("mousemove", (e)=>{
					e.preventDefault(); e.stopPropagation();
					onMove(e, e.clientX - this.offsetX, e.clientY - this.offsetY);
				});
			}
			
			if(onUp){
				this.ctx.canvas.addEventListener("mouseup", (e)=>{
					e.preventDefault(); e.stopPropagation();
					onUp(e, e.clientX - this.offsetX, e.clientY - this.offsetY);
				});
			}
			return this;
		}

	/////////////////////////////////////////////////////////
	// SETTER / GETTERS
	/////////////////////////////////////////////////////////
		/** Set Font  */
		font( size, face="Arial", style="Bold"){
			this.ctx.font = `${style} ${size}px ${face}`;
			this.fontSize = size;
			return this;
		}

		/** Set Line Width */
		lineWidth( v ){ this.ctx.lineWidth = v; return this; }
		
		lineDash(ary = null, lineWidth = null){ 
			if(!ary) ary = [0];
			this.ctx.setLineDash(ary);

			if(lineWidth != null) this.ctx.lineWidth = lineWidth;
			return this;
		}
		
		/** Test text width */
		getTextWidth( txt ){ 
			/*
			CHROME SUPPORTS THIS ONLY BEHIND A FLAG, FIREFOX WILL SUPPORT IT AT SOME POINT
			let metrics = ctx.measureText(text);
			let fontHeight = metrics.fontBoundingBoxAscent + metrics.fontBoundingBoxDescent;
			let actualHeight = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;
			 */
			return this.ctx.measureText( txt ).width; }


		/** set colors for fill/stroke and line width */
		style( fill = null, stroke=null, lineWidth=null ){
			if( fill )		this.ctx.fillStyle		= fill;
			if( stroke )	this.ctx.strokeStyle	= stroke;
			if( lineWidth != null ) this.ctx.lineWidth = lineWidth;
			return this;
		}

		/** Set Size of canvas, doing so resets font and style data */
		size( w, h ){
			this.ctx.canvas.style.width		= w + "px";
			this.ctx.canvas.style.height	= h + "px";
			this.ctx.canvas.width			= w;
			this.ctx.canvas.height			= h;

			var box			= this.ctx.canvas.getBoundingClientRect();
			this.offsetX	= box.left;	//Help get X,Y in relation to the canvas position.
			this.offsetY	= box.top;

			return this;
		}

	/////////////////////////////////////////////////////////
	// DRAWING
	/////////////////////////////////////////////////////////
		/** Clears canvas  */
		clear(){
			this.ctx.clearRect( 0, 0, this.ctx.canvas.width, this.ctx.canvas.height );
			return this;
		}

		/** Append Canvas to HTML body to visually see it. */
		appendBody( elm ){
			(elm || document.body).appendChild( this.ctx.canvas );
			this.ctx.canvas.className = "debugCanvas";
			return this;
		}

	/////////////////////////////////////////////////////////
	// DRAWING
	/////////////////////////////////////////////////////////
		/** Draw Text to the center of the canvas */
		drawCenterText( txt, yOffset=0, draw=1 ){
			let tw = this.ctx.measureText( txt ).width,
				th = this.ctx.measureText( "M" ).width, //this.fontSize,
				cw = this.ctx.canvas.width,
				ch = this.ctx.canvas.height;

			//this.drawText( txt, (cw - tw) * 0.5, (ch - th) * 0.5 + yOffset, draw );
			this.drawText( txt, (cw - tw) * 0.5, th + yOffset, draw );
			return this;
		}

		/** Draw text to the canvas */
		drawText( txt, x=0, y=0, color=null, draw=1 ){ 
			//this.ctx.font = "Bold 30px Arial";
			if( (draw & 1) != 0 ){
				if( color ) this.ctx.fillStyle = color;
				this.ctx.fillText( txt, x, y );
			}
			
			if( (draw & 2) != 0 ){
				if( color ) this.ctx.strokeStyle = color;
				this.ctx.strokeText( txt, x, y );
			}
			return this;
		}

		/** Draw a Rounded Border around the canvas */
		drawCanvasBorder( pad, r, color = null, draw=2 ){
			let x = pad,
				y = pad,
				w = this.ctx.canvas.width - pad * 2,
				h = this.ctx.canvas.height - pad * 2;

			this.drawBorder( x, y, w, h, r, color, draw );
			return this;
		}

		drawBorder( x, y, w, h, r=0, color= null, draw=2 ){
			this.ctx.beginPath();

		    this.ctx.moveTo( x+r, y );
		    this.ctx.lineTo( x+w-r, y );
		    this.ctx.quadraticCurveTo( x+w, y, x+w, y+r );

		    this.ctx.lineTo( x+w, y+h-r );
		    this.ctx.quadraticCurveTo( x+w, y+h, x+w-r, y+h );

		    this.ctx.lineTo( x+r, y+h );
		    this.ctx.quadraticCurveTo( x, y+h, x, y+h-r );

		    this.ctx.lineTo( x, y+r );
		    this.ctx.quadraticCurveTo( x, y, x+r, y );

		    this.ctx.closePath();
		    
		    this.draw( draw, color );
			return this;
		}

		rect( x, y, w, h, draw=1, color=null ){
		    if( (draw & 1) != 0 ){
		    	if( color ) this.ctx.fillStyle = color;
		    	this.ctx.fillRect( x, y, w, h );

		    }
			if( (draw & 2) != 0 ){
				if( color ) this.ctx.strokeStyle = color;
				this.ctx.strokeRect( x, y, w, h );
			}
			return this;
		}

		draw( which, color=null ){
		    if( (which & 1) != 0 ){
		    	if( color ) this.ctx.fillStyle = color;
		    	this.ctx.fill();
		    }

			if( (which & 2) != 0 ){
				if( color ) this.ctx.strokeStyle = color;
				this.ctx.stroke();
			}
			return this;
		}

		circle( p, r, color=null, draw=1 ){
			this.ctx.beginPath();
			this.ctx.arc( p[0], p[1], r, 0, 6.283185307179586 );
		    this.draw( draw, color );
			return this;
		}

		path( draw, p0, p1 ){
			this.ctx.beginPath();
			this.ctx.moveTo( p0[0], p0[1] );

			if(arguments.length > 3){
				for(var i=2; i < arguments.length; i++)
					this.ctx.lineTo( arguments[i][0], arguments[i][1] );

			}else this.ctx.lineTo( p1[0], p1[1] );

			this.draw( draw );
			return this;
		}

		line( p0, p1, color=null, draw=2 ){
			this.ctx.beginPath();
			this.ctx.moveTo( p0[0], p0[1] );
			this.ctx.lineTo( p1[0], p1[1] );

			this.draw( draw, color );
			return this;
		}
}

export default CanvasDraw;
import CanvasDraw		from "./CanvasDraw.js";
import Bezier			from "./BezierSpline.js";
import CurveArcLength	from "./CurveArcLength.js";

class CurveEditor{
	constructor( container ){
		let w = 100, h = 100;

		//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
		// DOM
		this.domElm = document.createElement("div");
		this.c0 = new CanvasDraw( this.domElm );
		this.c1 = new CanvasDraw( this.domElm );

		this.domElm.className = "canvasStack";
		this.domElm.appendChild( this.c0.ctx.canvas );
		this.domElm.appendChild( this.c1.ctx.canvas );

		container.getElement()[0].appendChild( this.domElm );
		

		//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
		// EVENTS
		this.onMoveBind	= this.onMove.bind( this );
		this.onUpBind 	= this.onUp.bind( this );
		this.c1.ctx.canvas.addEventListener("mousedown", this.onDown.bind( this ) );

		container.on("resize", ()=>{
			this.setSize( container.width, container.height );
			this.drawGrid().drawPoints();
		});


		//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
		// Configuration
		this.style = {
			gridColor		: "#505050",
			gridTextColor	: "#ffffff",
			gridV_XOffset	: -7,
			gridV_YOffset	: 12,
			gridH_XOffset	: -19,
			gridH_YOffset	: 4,

			pointRadius		: 8,
			pointColor		: "#00ff00",
			pointSampColor	: "#ffff00",
			pointSampAColor	: "#00ffff",
			pointSampSize	: 3,
			pointSampASize	: 5,

			ctrlColor		: "#ff0000",
			ctrlLineColor	: "#ff0000",
			ctrlLineDash	: [7,5],
			ctrlLineSize	: 1.5,

			curveColor		: "#ffff00",
			curveLineSize	: 1.5,
			curveSamples	: 30,
		};

		this.borderSpacing	= 0.2;									// Padding around the graph
		this.radiusSq		= this.style.pointRadius ** 2;			// Radius Squared, for hit detection

		this.width 			= w;
		this.height			= h;
		this.rect 			= { x:0, y:0, xx:0, yy:0, w:0, h:0 };	// Graph Drawing Dimensions
		this.selectedIndex	= -1;									// Which Point was selected

		this.arcSampleCount = 50;
		this.sampleCount	= 10;
		this.showSamples	= false;
		this.showArcSamples	= false;

		//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
		this.setSize( w, h );
		this.curve 	= new Bezier().append( this.rect );
		this.arcMap	= new CurveArcLength();
		this.intersect = new CurveInterect();

		//this.curve.set( 1, 0.2, 0.8 );
		//this.curve.set( 2, 0.8, 0.2 );
		
		//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
		//this.drawGrid();
		//this.drawPoints();
	}

	////////////////////////////////////////////////////////////
	//
	////////////////////////////////////////////////////////////
		setSize( w, h ){
			this.c0.size( w, h );
			this.c1.size( w, h );

			this.width	= w;
			this.height	= h;
			this.resetRect();

			return this;
		}

		resetRect(){
			this.rect.x = this.width	* this.borderSpacing; 
			this.rect.y = this.height	* this.borderSpacing;
			this.rect.w = this.width 	- this.width 	* (this.borderSpacing * 2); 
			this.rect.h = this.height	- this.height 	* (this.borderSpacing * 2);
			this.rect.xx = this.rect.x	+ this.rect.w;
			this.rect.yy = this.rect.y	+ this.rect.h;

			return this;
		}
	
		n2w( p, out = null ){
			out = out || p;
			out[0] = p[0] * this.rect.w + this.rect.x;
			out[1] = (1 - p[1]) * this.rect.h + this.rect.y;
			return out;
		}

		w2n( p, out ){
			out[0] = (p[0] - this.rect.x) / this.rect.w;
			out[1] = 1 - ( (p[1] - this.rect.y) / this.rect.h );
			return out;
		}

		output( n ){
			switch( n ){
				case 0:
					let p, out = new Array();
					for( p of this.curve.points ) out.push( p[0], p[1] );
					return out;
					break;
			}
		}


	////////////////////////////////////////////////////////////
	//
	////////////////////////////////////////////////////////////
		drawGrid(){
			const DIV	= 10;
			const DIVi	= 1 / DIV;

			let txt	= "",
				v0	= [ 0, 0 ],
				v1	= [ 0, 0 ];
			this.c0.clear().style( this.style.gridTextColor, this.style.gridColor );

			for( let i=0; i <= DIV; i++ ){
				//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
				// Draw Vertical lines and Bottom Numbers
				v0[ 0 ] = this.rect.x + this.rect.w * (i * DIVi);
				v0[ 1 ] = this.rect.y;
				v1[ 0 ] = v0[ 0 ];
				v1[ 1 ] = this.rect.yy;
				this.c0.line( v0, v1 );

				if( i != 0 ){
					txt = ( i < DIV ) ? "0." + i : "1.0";
					v1[ 0 ] += this.style.gridV_XOffset;
					v1[ 1 ] += this.style.gridV_YOffset;
					this.c0.drawText( txt, v1[ 0 ], v1[ 1 ] );
				}


				//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
				// Draw Horiztonal lines and Bottom Numbers
				v0[ 0 ] = this.rect.x;
				v0[ 1 ] = this.rect.y + this.rect.h * (i * DIVi);
				v1[ 0 ] = this.rect.xx;
				v1[ 1 ] = v0[ 1 ];
				this.c0.line( v0, v1 );

				if( i != DIV ){
					txt = ( i != 0 ) ? "0." + (DIV-i) : "1.0";

					v0[ 0 ] += this.style.gridH_XOffset;
					v1[ 1 ] += this.style.gridH_YOffset;
					this.c0.drawText( txt , v0[ 0 ], v1[ 1 ] );
				}
			}

			//this.c0.drawCanvasBorder( 2, 0, "#505050" );
			return this;
		}

		drawPoints(){
			this.c1.clear().style( "#00ff00" );
			
			this.curve.draw( this.c1, this.style, this.rect );
			this.intersect.fromCurve( this.curve, this.style.curveSamples, this );

			//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
			// Show basic sampling of the curve
			if( this.showSamples ){
				let p = [ 0, 0 ];

				this.c1.style( this.style.pointSampColor );

				for(let i=0; i < this.sampleCount; i++){
					this.n2w( this.curve.at( i / this.sampleCount, p ), p );
					this.c1.circle( p, this.style.pointSampSize );
				}
			}

			//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
			// Show basic sampling of the curve
			if( this.showArcSamples ){

				this.arcMap.fromCurve( this.curve, this.arcSampleCount );
				this.c1.style( this.style.pointSampAColor );

				let t, p = [ 0, 0 ];
				for(let i=0; i < this.sampleCount; i++){
					t = this.arcMap.mapT( i / this.sampleCount );
					this.n2w( this.curve.at( t, p ) );

					this.c1.circle( p, this.style.pointSampASize );
				}
			}

			return this;
		}

		updateSelected( e ){
			let m = this.c1.eventXY( e ),
				p = this.curve.points[ this.selectedIndex ];
			
			this.w2n( m, p );
			this.curve.positionRule( this.selectedIndex );

			return this;
		}

	////////////////////////////////////////////////////////////
	// Events
	////////////////////////////////////////////////////////////
		onDown(e){
			e.preventDefault(); e.stopPropagation();
			let m = this.c1.eventXY( e ),
				p = [0,0],
				i, lenSq;

			//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
			for( i=0; i < this.curve.points.length; i++ ){
				this.n2w( this.curve.points[ i ], p );
				lenSq	= ( p[0] - m[0] ) ** 2 + ( p[1] - m[1] ) ** 2;

				if( lenSq <= this.radiusSq ){
					this.selectedIndex = i;

					this.c1.ctx.canvas.addEventListener("mousemove", this.onMoveBind );
					this.c1.ctx.canvas.addEventListener("mouseup", this.onUpBind );

					return;
				}
			}

			this.selectedIndex = -1;

			//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
			let t = this.intersect.getIntersect( m[0], m[1], this );
			if( t != -1 ){
				this.curve.addAt( t );
				this.drawPoints();
			}
		}

		onMove(e, x, y){
			e.preventDefault(); e.stopPropagation();
			this.updateSelected( e ).drawPoints();
		}

		onUp(e, x, y){
			e.preventDefault(); e.stopPropagation();
			this.updateSelected( e ).drawPoints();

			this.c1.ctx.canvas.removeEventListener("mousemove", this.onMoveBind );
			this.c1.ctx.canvas.removeEventListener("mouseup", this.onUpBind );
		}
}


class CurveInterect{
	constructor(){
		this.points	= new Array();
		this.length	= 0;
	}

	fromCurve( c, s, o ){
		//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
		// Draw Curve itself
		let si	= 1 / s,
			p	= [0,0],
			len = this.points.length-1,
			i;

		if( len < 0 ) this.points.push( [0,0] );
		o.n2w( c.at( 0, p ), this.points[ 0 ] );
		this.length = 1;

		for( i=1; i <= s; i++ ){

			if( i > len ) this.points.push( [0,0] );
			o.n2w( c.at( i * si, p ), this.points[ i ] );
			this.length++;

		}
	}

	getIntersect( x, y, o ){
		let i, p0, p1, d = [0,0,0];

		for( i=0; i < this.length-1; i++){
			p0 = this.points[ i ];
			p1 = this.points[ i+1 ];

			if( x >= p0[0] && x <= p1[0] && y <= p0[1] && y >= p1[1]){
				
				this.closestPointToLine2D( p0, p1, x, y, d );	// Find the closest point on the line to the mouse position

				let a = i / o.style.curveSamples,				// Take the 2 curveT that form the segment, then Lerp based on segmentT
					b = (i+1) / o.style.curveSamples,
					t = (1 - d[2]) * a + d[2] * b;				// lerrrrrrrrrp

				//o.c1.circle( o.n2w( o.curve.at( t ) ) , 5, "#0000ff" );
				return t;
			}
		}

		return -1;
	}

	//From a point in space, closest spot to a 2D line
	closestPointToLine2D( p0, p1, x, y, out){
		var dx	= p1[0] - p0[0],
			dy	= p1[1] - p0[1],
			t	= ( (x -  p0[0]) * dx + ( y - p0[1] ) * dy ) / ( dx * dx + dy * dy );

		out[0] = p0[0] + (dx * t);
		out[1] = p0[1] + (dy * t);
		out[2] = t;
		return [x,y]
	}
}

export default CurveEditor;
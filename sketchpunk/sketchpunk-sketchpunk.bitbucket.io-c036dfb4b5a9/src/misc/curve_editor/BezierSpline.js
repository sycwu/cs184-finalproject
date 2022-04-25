class Bezier{
	constructor(){
		this.points 	= [];
		this.curveCnt 	= 0;
	}

	loadFlatArray( ary ){
		let i;
		for( i=0; i < ary.length; i+=2 ) this.points.append( [ ary[i], ary[i+1] ] );
		this.curveCnt = Math.floor( ( this.points.length - 1 ) / 3 );
	}

	positionRule( idx, p ){
		p = this.points[ idx ];

		if( idx == 0 && p[0] != 0 )								p[0] = 0;
		else if( idx == this.points.length -1 && p[0] != 1)		p[0] = 1;

		if( idx == 0 || idx == this.points.length -1 ){
			if( p[1] < 0 )			p[1] = 0;
			else if( p[1] > 1 )		p[1] = 1;
		}
	}

	/////////////////////////////////////////////////////////////////////////////
	// 
	/////////////////////////////////////////////////////////////////////////////
	append( rect ){
		let x = 0;

		if( this.curveCnt != 0 )	x = this.points[ this.points.length-1 ][0];
		else 						this.points.push( [ 0, 0 ] );

		this.points.push(
			[ 0.3, 0.3 ],
			[ 0.7, 0.7 ],
			[ 1, 1 ],
		);

		this.curveCnt++;
		return this;
	}

	addAt( n ){
		let tmp = this.segT( n ),
			i = tmp[0],
			p = Bezier.at( this.points[i], this.points[i+1], this.points[i+2], this.points[i+3], tmp[1] );


		this.points.splice(i+2, 0, [ p[0]-0.1, p[1] ] );
		this.points.splice(i+3, 0, p );
		this.points.splice(i+4, 0, [ p[0]+0.1, p[1] ] );

		return this;
	}

	set( i, xi, yi ){
		this.points[ i ][ 0 ] = xi;
		this.points[ i ][ 1 ] = yi; 
		return this;
	}


	/////////////////////////////////////////////////////////////////////////////
	// 
	/////////////////////////////////////////////////////////////////////////////
	at( t=0, out=null ){
		let i;
		out = out || [ 0, 0 ];

		//Final Curve in the spline
		//This only work if norm is less then 1, 1 can screw things up so this condition prevents things from breaking.
		if(t >= 1){
			t = 1;
			i = this.points.length - 4;
		}else if( t <= 0 ){
			t = 0;
			i = 0;
		}else{ //Determine which curve is being accessed.
			t *= (this.points.length - 1) * 0.33333333333; // divide by 3
			i = t | 0;		// Curve index by stripping out the decimal
			t -= i;					// Strip out the whole number to get the decimal norm to be used for the curve ( FRACT )
			i *= 3;					// Each curve starts at the 4th point in the array, so times 3 gets us the index where the curve starts.	
		}

		return Bezier.at( this.points[i], this.points[i+1], this.points[i+2], this.points[i+3], t, out );
	}

	segT( t ){
		let i;
		if(t >= 1){				t = 1; 		i = this.points.length - 4;
		}else if( t <= 0 ){		t = 0;		i = 0;
		}else{
			t *= (this.points.length - 1) * 0.33333333333;
			i = t | 0;
			t -= i;
			i *= 3;
		}
		return [ i, t ];
	}


	/////////////////////////////////////////////////////////////////////////////
	// 
	/////////////////////////////////////////////////////////////////////////////

	translate( p, rect, out=null ){
		out = out || p;
		out[0] = p[0] * rect.w + rect.x;
		out[1] = (1 - p[1]) * rect.h + rect.y;
	}

	draw( c, style, rect ){
		//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
		// Draw points and control lines
		let last = this.points.length - 1,
			p0 = [0,0],
			p1 = [0,0],
			i = 0;

		c.lineDash( style.ctrlLineDash, style.ctrlLineSize );

		for( i=0; i < this.points.length; i++ ){
			this.translate( this.points[ i ], rect, p0 );

			if( ( i % 3 ) == 0 ){

				// Next Control Point Line
				if( i != last ){
					this.translate( this.points[ i+1 ], rect, p1 );
					c.line( p0, p1, style.ctrlLineColor );
				} 

				// Back Control Point Line
				if( i != 0 ){
					this.translate( this.points[ i-1 ], rect, p1 );
					c.line( p0, p1, style.ctrlLineColor );
				}

				c.circle( p0, style.pointRadius, style.pointColor );	// Draw Main Point

			}else c.circle( p0, style.pointRadius, style.ctrlColor );	// Draw Control Point
		}

		//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
		// Draw Curve itself
		let si = 1 / style.curveSamples,
			t;

		this.translate( this.at( 0, p0 ), rect );
		c.lineDash( null, style.curveLineSize ).style( null, style.curveColor );

		for( i=1; i <= style.curveSamples; i++ ){
			t = i * si;

			this.translate( this.at( t, p1 ), rect );
			c.line( p0, p1 );

			p0[ 0 ] = p1[ 0 ];
			p0[ 1 ] = p1[ 1 ];
		}

		return this;
	}

	/////////////////////////////////////////////////////////////////////////////
	// Main Bezier Equation to get Point based on 4 Points
	/////////////////////////////////////////////////////////////////////////////
	static at( p0, p1, p2, p3, t, out ){
		let i		= 1 - t,
			ii		= i * i,
			iii		= ii * i,
			tt 		= t * t,
			ttt 	= tt * t,
			iit3 	= 3 * ii * t,
			itt3 	= 3 * i * tt;
		out = out || [ 0, 0 ];
		out[0] = iii * p0[0] + iit3 * p1[0] + itt3 * p2[0] + ttt * p3[0];
		out[1] = iii * p0[1] + iit3 * p1[1] + itt3 * p2[1] + ttt * p3[1];
		return out;
	}
}

export default Bezier;
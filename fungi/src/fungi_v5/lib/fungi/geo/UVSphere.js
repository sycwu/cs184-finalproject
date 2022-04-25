import App	from "../App.js";

function Sphere( name, mat ){
    let geo     = Sphere.geo();
    let mesh    = App.Mesh.from_data( "Sphere", geo.vert, geo.idx );
    return App.$Draw( name, mesh, mat, App.Mesh.TRI_STRIP );
}

Sphere.geo = function( y_len=18, x_len=25, radius = 0.5, close_loop=true ){
    return {
		vert    : verts( y_len, x_len, radius, close_loop ) ,
		idx 	: tri_strip_idx( y_len, x_len, radius, close_loop ),
	};
}

function verts( y_len=18, x_len=25, radius = 0.5, close_loop=true ){
    let y_rad	= Math.PI,				// Look Angles
        x_rad	= Math.PI * 2,
        y_inc	= Math.PI / y_len,		// Loop Increment
        x_inc	= Math.PI * 2 / x_len,
        x_stop  = (close_loop)? x_len : x_len - 1,
        cnt		= ( y_len + 1 ) * ( x_stop + 1 ) * 3,
        out 	= new Float32Array( cnt ),
        i		= 0,
        x_cos, x_sin, y_sin;

    for(let x=0; x <= x_stop; x++){
        y_rad = Math.PI;
        x_cos = Math.cos( x_rad ) * radius;
        x_sin = Math.sin( x_rad ) * radius;

        for(var y=0; y <= y_len; y++){
            y_sin = Math.sin( y_rad );

            //Calculate the vertex position based on the polar coord
            out[i++] = y_sin * x_cos;
            out[i++] = radius * Math.cos( y_rad );					
            out[i++] = y_sin * x_sin; // Y & Z are flipped.

            y_rad -= y_inc;
        }
        x_rad -= x_inc;	//Move onto the next Longitude
    }
    return out;
}

function tri_strip_idx( y_len=18, x_len=25, close_loop=true ){
    //...........................................
    // Triangulate all the vertices for Triangle Strip
    let vert_cnt 	= (close_loop)? ( x_len ) * ( y_len + 1 ) : ( x_len-1 ) * ( y_len + 1 ),
        idx_cnt		= ((y_len+1) * 2) * x_len + (x_len-1) * 2,	// Y = col, X is Rows, TODO fix to take into account no closed_loop
        out 		= new Uint16Array( idx_cnt ), // out = [],
        ii			= 0,
        x, y; 

    for(var i=0; i < vert_cnt; i++){
        x = Math.floor( i / ( y_len + 1 ) );	// Current longitude
        y = i % ( y_len + 1 );					// Current latitude

        //Column index of row R and R+1
        //out.push( x * ( y_len + 1 ) + y,  ( x + 1 ) * ( y_len + 1 ) + y );
        out[ii++] = x * ( y_len + 1 ) + y;
        out[ii++] = ( x + 1 ) * ( y_len + 1 ) + y;

        //Create Degenerate Triangle, Last AND first index of the R+1 (next row that becomes the top row )
        if( y == y_len && i < vert_cnt-1 ){
            //out.push( (x+1) * (y_len+1) + y, (x+1) * (y_len+1) );
            out[ii++] = (x+1) * (y_len+1) + y;
            out[ii++] = (x+1) * (y_len+1);
        }
    }

    return out;
}

export default Sphere;
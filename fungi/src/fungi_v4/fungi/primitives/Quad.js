import App			from "../engine/App.js";
import Vao			from "../core/Vao.js";

const NAME = "Quad";

function Quad( matName, name=NAME ){
	let e = App.$Draw( name );
	e.Draw.add( Quad.vao( name, -1, -1, 0, 1, 1, 0, true), matName );
	return e;
}

Quad.vertData = function(bx0=-1, by0=-1, bz0=0, bx1=1, by1=1, bz1=0, stand=true){
	return {
		uv			:[ 0.0,0.0,   1.0,0.0,   1.0,1.0,   0.0,1.0 ],
		indices 	:[ 0,1,2, 2,3,0 ],
		vertices	:(stand)?
				[ bx0,by0,bz0,   bx1,by0,bz1,   bx1,by1,bz0,   bx0,by1,bz0 ] :
				[ bx0,by0,bz0,   bx0,by0,bz1,   bx1,by1,bz1,   bx1,by1,bz0 ]
				//[ bx0,by0,bz0,   bx1,by0,bz0,   bx1,by1,bz1,   bx0,by1,bz1 ]
	};
}

Quad.vao = function( name=NAME, bx0=-1, by0=-1, bz0=0, bx1=1, by1=1, bz1=0, stand=true){
	if( App.cache.hasVAO( name ) ) return App.cache.getVAO( name );

	var d = Quad.vertData(bx0, by0, bz0, bx1, by1, bz1, stand);
	return Vao.buildStandard( name, 3, d.vertices, null, d.uv, d.indices );
}


/*
Quad.gridVao = function(name, size, divide){
	const vertCompLen = 4;
	let vAry	= new Array(),			//Vertex Array
		iAry	= new Array(),			//Index Array
		uAry	= new Array(),			//UV Array
		inc		= new Array(divide+1),	//Cache increment Values
		x, y, idx;

	//Calc the over all increment
	for(x=0; x <= divide; x++) inc[x] = x / divide * size;

	//Generate Grid
	for(y=0; y < divide; y++){
		for(x=0; x < divide; x++){
			idx	= vAry.length / vertCompLen;
			vAry.push( inc[x],		0,	inc[y+1],	0);	//B Left
			vAry.push( inc[x+1],	0,	inc[y+1],	1);	//B Right
			vAry.push( inc[x+1],	0,	inc[y],		2);	//T Right
			vAry.push( inc[x],		0,	inc[y],		3);	//T Left
			iAry.push( idx, idx+1, idx+2, idx+2, idx+3, idx );	//Triangle Index for Quad
			uAry.push( 0,0,  1,0,  1,1,  0,1);					//UV Values for Quad
		}
	}
	return Vao.standardRenderable(name, 4, vAry, null, uAry, iAry);
}
*/

export default Quad;
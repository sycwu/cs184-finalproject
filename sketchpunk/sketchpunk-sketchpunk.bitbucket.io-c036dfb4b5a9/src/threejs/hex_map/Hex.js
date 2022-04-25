// Original : https://www.redblobgames.com/grids/hexagons/codegen/output/lib-module.js
class Orientation {
    constructor( f0, f1, f2, f3, b0, b1, b2, b3, start_angle ){
        this.f0 = f0;
        this.f1 = f1;
        this.f2 = f2;
        this.f3 = f3;
        this.b0 = b0;
        this.b1 = b1;
        this.b2 = b2;
        this.b3 = b3;
        this.start_angle = start_angle;
    }
}

const SQRT3 = Math.sqrt( 3.0 );
class Layout{
    static Pointy   = new Orientation( SQRT3, SQRT3 / 2.0, 0.0, 3.0 / 2.0, SQRT3 / 3.0, -1.0 / 3.0, 0.0, 2.0 / 3.0, 0.5 );
    static Flat     = new Orientation( 3.0 / 2.0, 0.0, SQRT3 / 2.0, SQRT3, 2.0 / 3.0, 0.0, -1.0 / 3.0, SQRT3 / 3.0, 0.0 );

    static spacing( radius, isPointy=false ){
        return ( isPointy )?
            [ SQRT3 * radius, 2 * radius * (3/4) ] :
            [ 2 * radius * (3/4), SQRT3 * radius ];
    }

    constructor( radius, orientation=Layout.Flat, origin=[0,0] ){
        this.radius         = radius; //Layout.spacing( radius, ( orientation === Layout.Pointy ) );
        this.orientation    = orientation;
        this.origin         = origin;
    }

    // Same as HexToPixel, Except it takes raw coords instead of hex object.
    axialToPixel( ax, ay ){
        const M = this.orientation;
        const x = ( M.f0 * ax + M.f1 * ay ) * this.radius;
        const y = ( M.f2 * ax + M.f3 * ay ) * this.radius;

        return [ x + this.origin[ 0 ], y + this.origin[ 1 ] ];
    }

    hexToPixel( h ){
        const M = this.orientation;
        const x = ( M.f0 * h.x + M.f1 * h.y ) * this.radius;
        const y = ( M.f2 * h.x + M.f3 * h.y ) * this.radius;

        return [ x + this.origin[ 0 ], y + this.origin[ 1 ] ];
    }

    /*pixelToHex( p ){
        var M = this.orientation;
        var size = this.size;
        var origin = this.origin;
        var pt = new Point((p.x - origin.x) / size.x, (p.y - origin.y) / size.y);
        var q = M.b0 * pt.x + M.b1 * pt.y;
        var r = M.b2 * pt.x + M.b3 * pt.y;
        return new Hex(q, r, -q - r); 
    }*/
}


class Hex extends Int16Array{
    constructor( x, y, z=null ){
        super( 3 );
        this.xyz( x, y, z );
    }

    xyz( x, y, z=null ){
        if( z == null ) z = -x - y;
        if( x + y + z != 0 ){ console.log( "Bad Axial Coordinate : : q %d r %d s %d", x, y, z ); }

        this[ 0 ] = x;
        this[ 1 ] = y;
        this[ 2 ] = z;
        return this;
    }

    get x(){ return this[ 0 ]; }
    get y(){ return this[ 1 ]; }
    get z(){ return this[ 2 ]; }

    get len(){
        return Math.floor(
            (
                Math.abs( this[ 0 ] ) + 
                Math.abs( this[ 1 ] ) + 
                Math.abs( this[ 2 ] )
            ) / 2
        ); 
    }
}

export { Hex, Orientation, Layout };
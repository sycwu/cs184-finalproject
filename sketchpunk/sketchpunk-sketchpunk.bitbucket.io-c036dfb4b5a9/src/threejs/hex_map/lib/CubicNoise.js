/*
// https://jobtalle.com/cubic_noise.html
float random( vec3 x ){ return fract( sin( x.x + x.y * 57.0 + x.z * 113.0 ) * 43758.5453 ); }

float interpolate( float a, float b, float c, float d, float x ){
    float p = (d - c) - (a - b);
    return x * (x * (x * p + ((a - b) - p)) + (c - a)) + b;
}

float sampleX( vec3 at ){
    float floored = floor( at.x );
    return interpolate(
        random( vec3( floored - 1.0, at.yz ) ),
        random( vec3( floored, at.yz ) ),
        random( vec3( floored + 1.0, at.yz ) ),
        random( vec3( floored + 2.0, at.yz ) ),
    	fract( at.x ) ) * 0.5 + 0.25;
}

float sampleY( vec3 at ){
    float floored = floor( at.y );
    return interpolate(
        sampleX( vec3( at.x, floored - 1.0, at.z ) ),
        sampleX( vec3( at.x, floored, at.z ) ),
        sampleX( vec3( at.x, floored + 1.0, at.z ) ),
        sampleX( vec3( at.x, floored + 2.0, at.z ) ),
        fract( at.y ) );
}

float cubicNoise( vec3 at ){
    float floored = floor( at.z );
    return interpolate(
        sampleY( vec3( at.xy, floored - 1.0 ) ),
        sampleY( vec3( at.xy, floored ) ),
        sampleY( vec3( at.xy, floored + 1.0 ) ),
        sampleY( vec3( at.xy, floored + 2.0 ) ),
        fract( at.z ) );
}

float cubicOctaves( vec3 coord ){
    vec3 p;
    float n;
    float period    = UPeriod;
    float qual      = 3.0;
    float amplitude = 1.0;
    float fOctave   = float( UOctave );
    
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    if( UFalloff - 1.0 == 0.0 )
        amplitude = ( 1.0 / fOctave ) / UFalloff;
    else
        amplitude = ( ( ( UFalloff - 1.0 ) * pow( UFalloff, fOctave ) ) / ( pow( UFalloff, fOctave ) - 1.0) )  / UFalloff;

    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    for( int i=0; i < UOctave; i++ ){
        p           = ( UVox == 0.0 )? 
                        coord * period :
                        floor( ( coord * period ) * UVox ) / UVox;

        n           += cubicNoise( p ) * amplitude;
        
        //period      *= UPeriodFreq;
        period      /= UPeriodFreq;
		amplitude   /= UFalloff;
    }

    return n;
}
*/

class CubicNoise{

    static octaves( x, y, z, oct=1, period=2, periodFreq=2, falloff=2, vox=0 ){
        let amplitude = 1.0,
            n         = 0,
            xx, yy, zz;

        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        if( falloff - 1.0 == 0.0 )
            amplitude = ( 1.0 / oct ) / falloff;
        else
            amplitude = ( ( ( falloff - 1.0 ) * Math.pow( falloff, oct ) ) / ( Math.pow( falloff, oct ) - 1.0) )  / falloff;
    
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        for( let i=0; i < oct; i++ ){
            xx = x * period;
            yy = y * period;
            zz = z * period;

            if( vox != 0 ){
                xx = Math.floor( xx * vox ) / vox;
                yy = Math.floor( yy * vox ) / vox;
                zz = Math.floor( zz * vox ) / vox;
            }

            n           += this.get( xx, yy, zz ) * amplitude;
            period      /= periodFreq;
            amplitude   /= falloff;
        }
    
        return n;
    }

    static get( x, y, z ){
        const floored = Math.floor( z );
        const fract   = z - floored;
        return this.interpolate(
            this.sampleY( x, y, floored - 1.0 ),
            this.sampleY( x, y, floored ),
            this.sampleY( x, y, floored + 1.0 ),
            this.sampleY( x, y, floored + 2.0 ),
            fract
        );
    }

    static sampleY( x, y, z ){
        const floored = Math.floor( y );
        const fract   = y - floored;
        return this.interpolate(
            this.sampleX( x, floored - 1.0, z ),
            this.sampleX( x, floored,       z ),
            this.sampleX( x, floored + 1.0, z ),
            this.sampleX( x, floored + 2.0, z ),
            fract
        );
    }
    
    static sampleX( x, y, z ){
        const floored = Math.floor( x );
        const fract   = x - floored;
        return this.interpolate(
            this.random( floored - 1.0, y, z ),
            this.random( floored,       y, z ),
            this.random( floored + 1.0, y, z ),
            this.random( floored + 2.0, y, z ),
            fract
        ) * 0.5 + 0.25;
    }

    static random( x, y, z ){ 
        const s = Math.sin( x + y * 57.0 + z * 113.0 ) * 43758.5453;
        return s - Math.floor( s ); // Fract( s )
    }

    static interpolate( a, b, c, d, x ){
        const p = (d - c) - (a - b);
        return x * (x * (x * p + ((a - b) - p)) + (c - a)) + b;
    }
}

export default CubicNoise;
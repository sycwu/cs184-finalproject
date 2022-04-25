import * as THREE from "../../lib/three.module.js";

class Gltf2Util{

    static primitiveGeo( prim ){
        const geo = new THREE.BufferGeometry();
        geo.setAttribute( 'position', new THREE.BufferAttribute( prim.position.data, prim.position.componentLen ) );

        if( prim.indices ) geo.setIndex( new THREE.BufferAttribute( prim.indices.data, 1 ) );
        if( prim.normal )  geo.setAttribute( 'normal', new THREE.BufferAttribute( prim.normal.data, prim.normal.componentLen ) );

        return geo;
    }

    static loadMesh( gltf, name=null, mat=null ){
        const o = gltf.getMesh( name );
        let geo, prim, pmat;

        if( o.primitives.length == 1 ){
            prim = o.primitives[ 0 ];

            if( mat )                           pmat = mat;
            else if( prim.materialIdx != null ) pmat = this.loadMaterial( gltf, prim.materialIdx );
            
            geo = this.primitiveGeo( prim );
            return new THREE.Mesh( geo, pmat );
        }else{
            let mesh, m, c ;
            const grp = new THREE.Group();
            for( prim of o.primitives ){

                if( mat ){
                    pmat = mat;
                }else if( prim.materialIdx != null ){
                    pmat = this.loadMaterial( gltf, prim.materialIdx );
                }
            
                geo     = this.primitiveGeo( prim );
                mesh    = new THREE.Mesh( geo, pmat );
                
                grp.add( mesh );
            }
            return grp;
        }
    }

    static loadMaterial( gltf, id ){
        const config = {};
        const m      = gltf.getMaterial( id );
        
        if( m ){
            if( m.baseColorFactor ){
                config.color = new THREE.Color( m.baseColorFactor[0], m.baseColorFactor[1], m.baseColorFactor[2] );
            }
        }

        return new THREE.MeshPhongMaterial( config );
    }

}

export default Gltf2Util;
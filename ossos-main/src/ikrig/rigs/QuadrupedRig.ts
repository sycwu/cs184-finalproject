//#region IMPORTS
import  { vec3 }                    from 'gl-matrix';
import { BipedIKPose } from '..';
import type Pose                        from '../../armature/Pose';
//import type Armature                    from '../../armature/Armature';
//import BoneMap, { BoneChain, BoneInfo } from '../../armature/BoneMap';
//import HipSolver                        from '../solvers/HipSolver';
//import LimbSolver                       from '../solvers/LimbSolver';
//import SwingTwistSolver                 from '../solvers/SwingTwistSolver';
//import SwingTwistEndsSolver             from '../solvers/SwingTwistEndsSolver';

import { IKChain }                      from './IKChain';
import IKRig                            from './IKRig';

//#endregion

// https://www.schoolofmotion.com/blog/how-to-rig-quadrupeds-animation

class QuadrupedRig extends IKRig{
    //#region MAIN
    hip         ?: IKChain = undefined;
    tail        ?: IKChain = undefined;
    spine       ?: IKChain = undefined;
    neck        ?: IKChain = undefined;
    head        ?: IKChain = undefined;

    hindLegL    ?: IKChain = undefined; // Rear Leg
    hindLegR    ?: IKChain = undefined;
    foreLegL    ?: IKChain = undefined; // Front Leg
    foreLegR    ?: IKChain = undefined;

    tarsalL     ?: IKChain = undefined; // Foot / Rear Paw
    tarsalR     ?: IKChain = undefined;
    carpalL     ?: IKChain = undefined; // Hand / Front Paw
    carpalR     ?: IKChain = undefined;

    constructor(){
        super();
    }
    //#endregion

    /** Setup Chain Data & Sets Alt Directions */
    bindPose( pose: Pose ): this{
        super.bindPose( pose );         // Copy the Local Space Transform of starting Pose to All Chained Bones
        this._setAltDirection( pose );  // Set Alt Direction from starting pose
        return this;
    }

    _setAltDirection( pose: any ): void{
        const FWD : vec3 = [0,0,1];
        const UP  : vec3 = [0,1,0];
        const DN  : vec3 = [0,-1,0];
        const R   : vec3 = [-1,0,0];
        const L   : vec3 = [1,0,0];
        const BAK : vec3 = [0,0,-1];

        if( this.hip )      this.hip.bindAltDirections( pose, FWD, UP );
        if( this.spine )    this.spine.bindAltDirections( pose, UP, FWD );
        if( this.neck )     this.neck.bindAltDirections( pose, FWD, UP );
        if( this.head )     this.head.bindAltDirections( pose, FWD, UP );
        if( this.tail )     this.tail.bindAltDirections( pose, BAK, UP );
        
        if( this.hindLegL ) this.hindLegL.bindAltDirections( pose, DN, FWD );
        if( this.hindLegR ) this.hindLegR.bindAltDirections( pose, DN, FWD );
        if( this.tarsalL )  this.tarsalL.bindAltDirections( pose, FWD, UP );
        if( this.tarsalR )  this.tarsalR.bindAltDirections( pose, FWD, UP );

        if( this.foreLegL ) this.foreLegL.bindAltDirections( pose, DN, FWD );
        if( this.foreLegR ) this.foreLegR.bindAltDirections( pose, DN, FWD );
        if( this.carpalL )  this.carpalL.bindAltDirections( pose, FWD, UP );
        if( this.carpalR )  this.carpalR.bindAltDirections( pose, FWD, UP );
    }

    resolveToPose( pose: any, debug ?: any ){
        let ch: IKChain;
        //console.time( 'resolveToPose' );
        for( ch of this.items.values() ){
            if( ch.solver ) ch.resolveToPose( pose, debug );
        }
        //console.timeEnd( 'resolveToPose' );
    }

    applyBipedIKPose( p: any ): void{ //BipedIKPose
        // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        // Use Biped Legs for the HindLegs, Then Flip R>L for ForeLegs
        // Animals don't really walk like that, there is more of a delay between the Hind & Fore
        // But without running the animation of the legs twice with the second on a slight delay
        // there is no other solution.

        this.hindLegL?.solver.setTargetDir( p.legL.effectorDir, p.legL.poleDir, p.legL.lenScale );
        this.hindLegR?.solver.setTargetDir( p.legR.effectorDir, p.legR.poleDir, p.legR.lenScale );

        //this.foreLegL?.solver.setTargetDir( p.legR.effectorDir, p.legR.poleDir, p.legR.lenScale );
        //this.foreLegR?.solver.setTargetDir( p.legL.effectorDir, p.legL.poleDir, p.legL.lenScale );

        // FIRST IDEA: Try to blend the arm direction with the hindLegs
        let a = vec3.lerp( [0,0,0], p.armL.effectorDir, p.legR.effectorDir, .4 );
        let b = vec3.lerp( [0,0,0], p.armR.effectorDir, p.legL.effectorDir, .4 );
        vec3.normalize( a, a );
        vec3.normalize( b, b );

        let a2 = vec3.lerp( [0,0,0], p.armL.effectorDir, p.legR.effectorDir, 1 );
        let b2 = vec3.lerp( [0,0,0], p.armR.effectorDir, p.legL.effectorDir, 1 );
        vec3.normalize( a2, a2 );
        vec3.normalize( b2, b2 );
        
        // OTHER IDEAS: (not working correctly right now)
        // Maybe Try to lerp between the two hindlegs to create a delay for forelegs??

        let lerpScale = 10;
        let t1 = 0;
        if (p.legL.effectorDir[0] < p.legR.effectorDir[0]) {
            t1 = (p.legR.effectorDir[0] - p.legL.effectorDir[0]) * lerpScale ;
        } else {
            t1 = (p.legL.effectorDir[0] - p.legR.effectorDir[0]) * lerpScale ;
        }
        let t2 = 1 - t1;
        let c = vec3.lerp( [0,0,0], p.legL.effectorDir, p.legR.effectorDir, t1 );
        let d = vec3.lerp( [0,0,0], p.legL.effectorDir, p.legR.effectorDir, t2 );
        //let c1 = vec3.add([0,0,0] , c , d);
        //let d1 = vec3.add([0,0,0] , d , c);
        vec3.normalize( c, c );
        vec3.normalize( d, d );

        // Blend legs with hip?
        let e = vec3.lerp( [0,0,0], p.legR.effectorDir, p.hip.effectorDir, 0.5 );
        let f = vec3.lerp( [0,0,0], p.legL.effectorDir, p.hip.effectorDir, 0.5 );
        vec3.normalize( e, e );
        vec3.normalize( f, f );

        //this.hindLegL?.solver.setTargetDir( e, p.legL.poleDir, p.legL2.lenScale );
        //this.hindLegR?.solver.setTargetDir( f, p.legR.poleDir, p.legR2.lenScale );
        //this.hindLegL?.solver.setTargetDir( p.legL.effectorDir, p.legL.poleDir , p.legL2.lenScale );
        //this.hindLegR?.solver.setTargetDir( p.legR.effectorDir, p.legR.poleDir, p.legR2.lenScale );

        this.foreLegL?.solver.setTargetDir( c, p.legR.poleDir, p.legR2.lenScale);
        this.foreLegR?.solver.setTargetDir( d, p.legL.poleDir, p.legL2.lenScale);
        //this.foreLegL?.solver.setTargetDir( p.legR.effectorDir, p.legR.poleDir );
        //this.foreLegR?.solver.setTargetDir( p.legL.effectorDir, p.legL.poleDir );

        this.tarsalL?.solver.setTargetDir( p.footL.effectorDir, p.footL.poleDir );
        this.tarsalR?.solver.setTargetDir( p.footR.effectorDir, p.footR.poleDir );

        //Carpals need to adjusted to fix the foot wobbles?
        this.carpalL?.solver.setTargetDir( p.footR.effectorDir, p.footR.poleDir );
        this.carpalR?.solver.setTargetDir( p.footL.effectorDir, p.footL.poleDir );

        // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        this.head?.solver.setTargetDir( p.head.effectorDir, p.head.poleDir );

        this.hip?.solver
            .setTargetDir( p.hip.effectorDir, p.hip.poleDir )
            .setMovePos( p.hip.pos, p.hip.isAbsolute, p.hip.bindHeight );
        
        // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        // Spine dampening for quadrapeds: The spine for quadrupeds initially "wobbled" 
        // quite a lot. This is not significant in bipeds because the shoulder / arms 
        // do in fact wobble passively. But for a quadruped the head swaying looks goofy.
        // A possible solution is to make the spine stationary, like the hip currently is.
        
        let dampened_spine_start = vec3.lerp( [0,0,0], [0,0,0], p.spine.startEffectorDir, 0.1 );
        vec3.normalize( dampened_spine_start, dampened_spine_start );

        let dampened_spine_end = vec3.lerp( [0,0,0], [0,0,0], p.spine.endEffectorDir, 0.1 );
        vec3.normalize( dampened_spine_end, dampened_spine_end );

        let dampened_spine_poles = vec3.lerp( [0,0,0], [0,0,0], p.spine.startPoleDir, 0 );
        vec3.normalize( dampened_spine_poles, dampened_spine_poles );

        let dampened_spine_polee = vec3.lerp( [0,0,0], [0,0,0], p.spine.endPoleDir, 0 );
        vec3.normalize( dampened_spine_polee, dampened_spine_polee );

        this.spine?.solver
            //.setStartDir( p.spine.startEffectorDir, p.spine.startPoleDir )
            //.setEndDir( p.spine.endEffectorDir, p.spine.endPoleDir );
            .setStartDir( dampened_spine_start, dampened_spine_poles )
            .setEndDir( dampened_spine_end, dampened_spine_polee );
    }
}

export default QuadrupedRig;
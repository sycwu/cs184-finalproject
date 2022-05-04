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

class FishRig extends IKRig{
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

        this.hindLegL?.solver.setTargetDir( p.hip.effectorDir * 0, p.hip.poleDir, p.legL.lenScale );
        this.hindLegR?.solver.setTargetDir( p.hip.effectorDir * 0, p.hip.poleDir, p.legL.lenScale );

        this.foreLegL?.solver.setTargetDir( p.hip.effectorDir * 0, p.hip.poleDir, p.legL.lenScale );
        this.foreLegR?.solver.setTargetDir( p.hip.effectorDir * 0, p.hip.poleDir, p.legL.lenScale );

        // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        p.hip.effectorDir[0] = p.hip.effectorDir[0] * 3;
        this.hip?.solver.setTargetDir( p.hip.effectorDir, p.hip.poleDir );

        //p.head.effectorDir[0] = p.head.effectorDir[0] * 3;
        this.head?.solver.setTargetDir( p.hip.effectorDir, p.hip.poleDir );
        
        // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        //p.spine.startEffectorDir[0] = p.spine.startEffectorDir[0] * 15;
        //p.spine.endEffectorDir[0] = p.spine.endEffectorDir[0] * 15;
        //[p.spine.startEffectorDir[1], p.spine.startEffectorDir[2]] = [p.spine.startEffectorDir[2], p.spine.startEffectorDir[1]];
        [p.head.poleDir[1], p.head.poleDir[2]] = [p.head.poleDir[1], p.head.poleDir[2]];
        [p.head.effectorDir[2], p.head.effectorDir[1]] = [p.head.effectorDir[1], p.head.effectorDir[2]];
        p.head.effectorDir[1] =  p.head.effectorDir[1] * 0.3;
        p.head.poleDir[1] = p.head.poleDir[1] * -1;
        this.spine?.solver.setTargetDir( p.head.effectorDir, p.head.poleDir );
            //.setStartDir( p.spine.startEffectorDir, p.spine.startPoleDir )
            //.setEndDir( p.spine.endEffectorDir, p.spine.endPoleDir );
            //.setStartDir( dampened_spine_start, dampened_spine_poles )
            //.setEndDir( dampened_spine_end, dampened_spine_polee );
    }
}

export default FishRig;
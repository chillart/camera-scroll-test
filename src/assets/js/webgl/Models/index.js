import * as THREE from 'three'
import gsap from "gsap"
import {stage} from "../stage"
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'

import Mountain from './Mountain/index'

class Model{

    constructor(){
        this.cameraObject = null

        this.mountain = null

        this.clock = null
        this.time = 0
        this.mixer = null
        this.cameraAction = null
        this.animationDuration = null

        this.currentTime = 0
        this.sensitivity = 0.001
        this.lerpFactor = 0.05

        this.targetTime = 0
        this.deltaY = 0
    }

    init(){
        this.clock = new THREE.Clock()
        this.gltfLoader = new GLTFLoader()
        this.dracoLoader = new DRACOLoader()
        this.gltfLoader.setDRACOLoader(this.dracoLoader)
        this.gltfLoader.load(
            "/models/scene1.glb",
            (gltf) =>{
                stage.scene.add(gltf.scene)
                this.cameraObject = gltf.scene.getObjectByName("CameraData")
                this.mixer = new THREE.AnimationMixer(gltf.scene)
                this.cameraAction = this.mixer.clipAction(gltf.animations[0])
                this.animationDuration = this.cameraAction.getClip().duration
                this.cameraAction.timeScale = 0
                this.cameraAction.play()
                
                stage._setCamera()
                // this.mountain = new Mountain(gltf.scene.getObjectByName('mountain'))
            }
        )            
    }

    wheel(e){   
        // if (this.mixer) {
        //     let deltaTime = e.deltaY * 0.0001

        //     gsap.to(this.mixer,{
        //         duration:.15,
        //         onUpdate:()=>{
        //             this.mixer.update(deltaTime)
        //         }
        //     }
        // }
        this.deltaY = e.deltaY * this.sensitivity
        this.targetTime += this.deltaY
        this.targetTime = Math.max(0, Math.min(this.targetTime, this.animationDuration))
    }


    render(){
        const elapsedTime = this.clock.getElapsedTime()
        this.time = elapsedTime
        if (this.mixer) {
            //update(0)で更新処理を行う。再生処理はaction.timeの値に代入して再現
            this.currentTime = this.currentTime + (this.targetTime - this.currentTime) * this.lerpFactor
            this.cameraAction.time = this.currentTime
            this.mixer.update(0)
        }
    }
}

export const model = new Model()
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
                const cameraAction = this.mixer.clipAction(gltf.animations[0])
                cameraAction.play()
                
                stage._setCamera()
                // this.mountain = new Mountain(gltf.scene.getObjectByName('mountain'))
            }
        )            
    }

    wheel(e){   
        if (this.mixer) {
            let deltaTime = e.deltaY * 0.0001

            gsap.to(this.mixer,{
                duration:.15,
                onUpdate:()=>{
                    this.mixer.update(deltaTime)
                }
            })
            
        }
    }


    render(){
        const elapsedTime = this.clock.getElapsedTime()
        this.time = elapsedTime
    }
}

export const model = new Model()
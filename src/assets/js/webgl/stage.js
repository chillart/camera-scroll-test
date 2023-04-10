import * as THREE from "three"
import { Scene } from 'three/src/scenes/Scene'
import { model } from "./Models"
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import gsap from "gsap"

class Stage{
    constructor(){
        
        this.sizes = {
            width:window.innerWidth,
            height:window.innerHeight
        }
        this.scene = null
        this.camera = null
        this.cameraTargetPosition = new THREE.Vector3(0,0,0)
        this.renderer = null
        this.webglElement = null
        this.controls = null
    }

    init(){
        this._setScene()
        this._setRenderer()
        this._setLight()
    }

    _setControl(){
        this.controls = new OrbitControls(this.camera, this.webglElement)
        this.controls.enableDamping = true
    }

    _setScene(){
        this.scene = new Scene()
    }

    _setRenderer(){
        this.renderer = new THREE.WebGLRenderer({antialias:true,alpha:true})
        this.renderer.setSize(this.sizes.width,this.sizes.height)
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.outputEncoding = THREE.sRGBEncoding;
        this.renderer.toneMapping = THREE.CineonToneMapping;
        this.renderer.toneMappingExposure = 1.75;
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.renderer.physicallyCorrectLights = true;

        this.webglElement = document.getElementById("webgl-canvas")
        this.webglElement.appendChild(this.renderer.domElement)
    }

    _setLight(){
        const directionalLight = new THREE.DirectionalLight("#E0CD9B",1.5);
        directionalLight.position.set(-2, 1, 5);
        directionalLight.castShadow = true;
        directionalLight.shadow.mapSize.width = 4096/2;
        directionalLight.shadow.mapSize.height = 4096/2;
        directionalLight.shadow.camera.near = 1;
        directionalLight.shadow.camera.far = 10;
        const ambientLight = new THREE.AmbientLight("#1E212A", 2.5);
      
        this.scene.add(directionalLight, ambientLight);
    }

    _setCamera(){
        this.camera = model.cameraObject.children[0]
    }

    render(){
        if(this.controls){
            this.controls.update()
        }
        if(this.camera){
            // this.camera.lookAt(this.cameraTargetPosition)
            this.renderer.render(this.scene, this.camera)
        }
    }

    resize(){
        this.sizes.width = window.innerWidth
        this.sizes.height = window.innerHeight
        if(this.camera){
            this.camera.aspect = this.sizes.width / this.sizes.height
            this.camera.updateProjectionMatrix()
        }
        this.renderer.setSize(this.sizes.width, this.sizes.height)
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    }
}

export const stage = new Stage()
import * as THREE from "three"
import vertexShader from "../../shader/vert.glsl"
import fragmentShader from '../../shader/frag.glsl'

export default class Mountain{
    constructor(obj){
        this.obj = obj
        console.log(this.obj)
        this.meshList = []

        this.uniforms = {
            ...THREE.UniformsLib.lights,
            uLightPos:{
                value:new THREE.Vector3(2,1,1)
            },
            uLightColor:{
                value:new THREE.Color("orange")
            },
            uLightIntensity:{
                value:0
            },
            uColor:{
                value:new THREE.Vector3(1,1,1)
            },
            uMatcapTexture:{
                value:new THREE.TextureLoader().load("/img/matcap_panel.png")
            }
        }

        this.init()
        this.setMaterial()
    }

    init(){
        this.obj.children.map((mesh=>{
            mesh.castShadow = true
            this.meshList.push(mesh)
        }))
    }

    setMaterial(){
        this.meshList.map((m)=>{
            m.material = new THREE.ShaderMaterial({
                lights:true,
                uniforms:this.uniforms,
                vertexShader:vertexShader,
                fragmentShader:fragmentShader,
                transparent:true
            })
        })
    }
}

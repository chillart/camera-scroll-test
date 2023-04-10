import * as THREE from "three"

import {stage} from "./stage"
import {model} from "./Models/index"

class Webgl{
    constructor(){
    }

    init(){
        stage.init()
        model.init()
        window.addEventListener("resize",this.resize.bind(this))
        window.addEventListener("wheel",this.wheel.bind(this))

        this.resize()
        this.onRaf()

    }

    render(){
        stage.render()
        model.render()
    }

    onRaf(){
        this.render()
        requestAnimationFrame(this.onRaf.bind(this))
    }

    wheel(e){
        model.wheel(e)
    }

    resize(){
        stage.resize()
    }
}

export const webgl = new Webgl()
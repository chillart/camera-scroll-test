precision highp float;
#include <common>
#include <lights_pars_begin>

uniform sampler2D uMatcapTexture;
uniform sampler2D uHoverTexture;
uniform float uTime;
uniform float uHoverFactor;
varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vEye;
varying vec3 vViewDir;
uniform vec3 uColor;


void main() {
    float NdotL = dot(vNormal, directionalLights[0].direction);
    float lightIntensity = smoothstep(0.0, 0.01, NdotL);
    vec3 directionalLight = directionalLights[0].color * lightIntensity;

    vec2 uvTexture = vNormal.xy  * 0.5 + 0.5;

    vec4 matcapColor = texture2D(uMatcapTexture,uvTexture);


    gl_FragColor = matcapColor;
}

varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vEye;
varying vec3 vViewDir;
uniform float uTime;

void main() {
    vUv = uv;
    vec4 worldPos = modelMatrix * vec4(position,1.0);
    vNormal = normalize(mat3(transpose(inverse(modelMatrix))) * normal);
    vEye = normalize(worldPos.xyz - cameraPosition);

    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 clipPosition = projectionMatrix * viewPosition;

    vViewDir = normalize(-viewPosition.xyz);


    gl_Position = clipPosition;
}

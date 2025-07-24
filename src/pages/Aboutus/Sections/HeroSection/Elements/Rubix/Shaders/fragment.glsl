varying vec2 vUv;
varying vec2 vUvtwo;
varying vec2 vUvthree;
varying vec2 vUvfour;
varying vec2 vUvfive;
varying vec2 vUvsix;
varying vec2 vUvseven;


varying vec3 vColor;
varying float vInstanceId;

uniform float uOpacity;
uniform sampler2D uLogo;

void main()
{
    // Convert to integer for switch statement
    int instanceId = int(round(vInstanceId));
    
    // Select UV coordinates using switch
    vec2 uv;
    switch (instanceId) {
        case 0:
            uv = vUv;
            break;
        case 1:
            uv = vUvtwo;
            break;
        case 2:
            uv = vUvthree;
            break;
        case 3:
            uv = vUvfour;
            break;
        case 4:
            uv = vUvfive;
            break;
        case 5:
            uv = vUvsix;
            break;
        case 6:
            uv = vUvseven;
            break;
        case 7:
            uv = vUvtwo;
            break;
        case 22:
            uv = vUvthree;
            break;
        case 23:
            uv = vUv;
            break;
        case 24:
            uv = vUvthree;
            break;
        case 25:
            uv = vUv;
            break;
        case 26:
            uv = vUv;
            break;                    
        default:
            uv = uv; // Fallback
    }
    
    
    vec2 maskVec2 = step(uv, vec2(1.0)) * step(vec2(0.0), uv); 
    float mask = maskVec2.x * maskVec2.y;

    vec4 color = texture(uLogo, uv);
    vec3 modcolor = pow( color.rgb, vec3(1.0 / 2.2)); 

    vec3 modvcolor = pow(vColor, vec3(1.0 / 2.2));
    vec4 finalColor = mix(vec4(modvcolor,1.0), vec4(modcolor, 1.0) * 1.1, mask * color.a); 

    gl_FragColor = finalColor;
    gl_FragColor.a *= uOpacity;
}
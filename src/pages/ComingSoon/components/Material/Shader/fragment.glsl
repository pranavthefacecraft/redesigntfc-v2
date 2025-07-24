varying vec2 vUv;

varying vec3 vColor;

uniform float uOpacity;
uniform sampler2D uLogo;

void main()
{
    vec2 uv = vUv; // Default UV
    
    
    vec2 maskVec2 = step(uv, vec2(1.0)) * step(vec2(0.0), uv); 
    float mask = maskVec2.x * maskVec2.y;

    vec4 color = texture(uLogo, uv);
    vec3 modcolor = pow( color.rgb, vec3(1.0 / 2.2)); 

    vec3 modvcolor = pow(vColor, vec3(1.0 / 2.2));
    vec4 finalColor = mix(vec4(modvcolor,1.0), vec4(modcolor, 1.0) * 1.0, mask * color.a); 

    gl_FragColor = finalColor;
    gl_FragColor.a *= uOpacity;
}
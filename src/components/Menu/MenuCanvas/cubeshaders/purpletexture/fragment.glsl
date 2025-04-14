varying vec2 vUv;

uniform sampler2D uLogo;
uniform float uX;
uniform float uY;
uniform float uScaleX;
uniform float uScaleY;
uniform vec3 uBaseColor;

void main()
{

    vec2 uv = vec2(vUv.x * uScaleX, vUv.y * uScaleY);
    uv.y -= uY;
    uv.x -= uX;

    // Apply rotation to the UV coordinates
    float angle = radians(0.0); 
    float cosAngle = cos(angle);
    float sinAngle = sin(angle);
    uv = vec2(
        uv.x * cosAngle - uv.y * sinAngle,
        uv.x * sinAngle + uv.y * cosAngle
    );

    vec2 maskVec2 = step(uv, vec2(1.0)) * step(vec2(0.0), uv); 
    float mask = maskVec2.x * maskVec2.y;

    vec4 color = texture(uLogo, uv);

    vec3 modbasecolor = pow( uBaseColor, vec3( 1.0 / 2.2 ));

   
    vec4 bgColor = vec4(modbasecolor, 1.0);
    vec4 finalColor = mix(bgColor, color * 1.5, mask * color.a); 

    gl_FragColor = finalColor;

}

uniform vec3 uBaseColor;
uniform float uOpacity;



void main()
{

    vec3 modbasecolor = pow( uBaseColor, vec3( 1.0 / 2.2 ));

    vec4 bgColor = vec4(modbasecolor, 1.0);

    gl_FragColor = bgColor;
    gl_FragColor.a *= uOpacity;

}

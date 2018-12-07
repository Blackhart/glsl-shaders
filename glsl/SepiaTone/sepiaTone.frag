#version 430 core

// In
smooth in highp vec2    texCoord;

// Uni
uniform sampler2D   uni_Texture;
uniform float   uni_Brightness;
uniform vec3    uni_Color;

// Out
out vec4    color;

void    main()
{
    vec4    lTex = texture2D(uni_Texture, texCoord);
    float   lGreyScale = dot(lTex.rgb, vec3(0.3f, 0.59f, 0.11f));
    color = vec4(lGreyScale * uni_Color * uni_Brightness, lTex.a);
}

#version 150 core

// In
smooth in highp vec2    texCoord;

// Uni
uniform sampler2D   uni_Texture;
uniform float       uni_Time;

// Out
out vec4    out_Color;

void    main()
{
    float   gray = fract(sin(dot(texCoord + uni_Time, vec2(12.9898f, 78.233f))) * 43758.5453f);
    out_Color = vec4(vec3(gray), texture2D(uni_Texture, texCoord).a);
}

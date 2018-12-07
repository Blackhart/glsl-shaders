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
    vec2    v = texCoord - vec2(0.5f);
    float   len = length(v);
    float   fi = atan(v.y, v.x) + uni_Time * 0.3f;
    vec2    uv = vec2(mod(fi + 0.1f / len, 1.0f), mod(0.3f / len + uni_Time * 0.5f, 1.0f));
    vec4    texColor = texture2D(uni_Texture, uv);
    texColor.rgb *= len * 1.5f;
    out_Color = texColor;
}

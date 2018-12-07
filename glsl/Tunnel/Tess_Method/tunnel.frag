#version 430 core

// In
smooth in highp vec2    texCoord;
smooth in float         depth;

// Uni
uniform sampler2D   uni_Texture;
uniform float       uni_Time;
uniform float       uni_Shadow;

// Out
out vec4    out_Color;

void main()
{
    vec2    tex = mod(texCoord + vec2(0.0f, -uni_Time), 1.0f);
    vec4    color = texture2D(uni_Texture, tex);
    float   dc = smoothstep(0.0f, uni_Shadow, depth);
    out_Color = vec4(color.rgb * dc, color.a);
}

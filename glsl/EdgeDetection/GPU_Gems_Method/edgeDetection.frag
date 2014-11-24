#version 430 core

// In
smooth in highp vec2    texCoord;

// Uni
uniform sampler2D   uni_Texture;
uniform vec2        uni_Delta;
uniform float       uni_Threshold;

// Out
out vec4    out_Color;

void    main()
{
    vec2    dx = vec2(uni_Delta.x, 0.0f);
    vec2    dy = vec2(0.0f, uni_Delta.y);
    vec2    tc = texCoord - dy;
    float   g00 = texture2D(uni_Texture, tc - dx).x;
    float   g01 = texture2D(uni_Texture, tc).x;
    float   g02 = texture2D(uni_Texture, tc + dx).x;
    tc = texCoord;
    float   g10 = texture2D(uni_Texture, tc - dx).x;
    float   g12 = texture2D(uni_Texture, tc + dx).x;
    tc = texCoord + dy;
    float   g20 = texture2D(uni_Texture, tc - dx).x;
    float   g21 = texture2D(uni_Texture, tc).x;
    float   g22 = texture2D(uni_Texture, tc + dx).x;
    float   sx = g20 + g22 - g00 - g02 + 2.0f * (g21 - g01);
    float   sy = g22 + g02 - g00 - g20 + 2.0f * (g12 - g10);
    float   dist = distance(sx, sy);
    if (dist > uni_Threshold)
        out_Color = vec4(0.0f, 0.0f, 0.0f, 1.0f);
    else
        out_Color = vec4(1.0f);
}

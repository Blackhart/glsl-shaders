#version 430 core

// In
smooth in highp vec2    texCoord;

// Uni
uniform sampler2D   uni_Texture;
uniform vec2        uni_Delta;
uniform float       uni_Threshold;

// Out
out vec4    out_Color;

float luminance(vec3 c)
{
    return dot(c, vec3(0.2126, 0.7152, 0.0722));
}

void    main()
{
    vec2    dx = vec2(uni_Delta.x, 0.0f);
    vec2    dy = vec2(0.0f, uni_Delta.y);
    vec2    tc = texCoord - dy;
    vec3    g00 = texture2D(uni_Texture, tc - dx).xyz;
    vec3    g01 = texture2D(uni_Texture, tc).xyz;
    vec3    g02 = texture2D(uni_Texture, tc + dx).xyz;
    tc = texCoord;
    vec3    g10 = texture2D(uni_Texture, tc - dx).xyz;
    vec3    g11 = texture2D(uni_Texture, tc).xyz;
    vec3    g12 = texture2D(uni_Texture, tc + dx).xyz;
    tc = texCoord + dy;
    vec3    g20 = texture2D(uni_Texture, tc - dx).xyz;
    vec3    g21 = texture2D(uni_Texture, tc).xyz;
    vec3    g22 = texture2D(uni_Texture, tc + dx).xyz;
    vec3    hc = g00 + g01 * 2.0f + g02 - g20 - g21 * 2.0f - g22;
    vec3    vc = g00 + g10 * 2.0f + g20 - g02 - g12 * 2.0f - g22;
    vec3    color = g11 * pow(luminance(vc*vc + hc*hc), uni_Threshold);
    out_Color = vec4(color, 1.0f);
}

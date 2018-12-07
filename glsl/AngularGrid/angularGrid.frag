#version 430 core

// In
smooth in highp vec2    texCoord;

// Uni
uniform sampler2D   uni_Texture;
uniform float       uni_Gap;
uniform float       uni_Length;
uniform vec3        uni_Color;
uniform vec2        uni_Center;
uniform float       uni_Smooth;

// Out
out vec4    out_Color;

void    main()
{
    float   lDist = length(gl_FragCoord.xy - uni_Center);
    float   lModRatio = fract(lDist / uni_Gap) * uni_Gap;
    float   lInvEdge = uni_Gap - uni_Length;
    if (lModRatio <= uni_Length)
    {
        float   lSmoothCoeff = smoothstep(uni_Length, uni_Length - uni_Smooth - 0.001f, lModRatio);
        out_Color = vec4(uni_Color, 1.0f) * texture2D(uni_Texture, texCoord) * lSmoothCoeff;
    }
    else if (lModRatio >= lInvEdge)
    {
        float   lSmoothCoeff = smoothstep(lInvEdge, lInvEdge + uni_Smooth, lModRatio);
        out_Color = vec4(uni_Color, 1.0f) * texture2D(uni_Texture, texCoord) * lSmoothCoeff;
    }
    else
        out_Color = vec4(0.0f);
}

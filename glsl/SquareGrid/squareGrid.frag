#version 150 core

// In
smooth in highp vec2    texCoord;

// Uni
uniform sampler2D   uni_Texture;
uniform vec2        uni_Gap;
uniform vec2        uni_Length;
uniform vec2        uni_Smooth;

// Out
out vec4    out_Color;

void    main()
{
    vec2    lModRatio = fract(gl_FragCoord.xy / uni_Gap) * uni_Gap;
    vec2    lInvEdge = uni_Gap - uni_Length;

    // Horizontal
    float   lHorSmoothCoeff = 0.0f;
    if (lModRatio.x <= uni_Length.x)
        lHorSmoothCoeff = smoothstep(uni_Length.x, uni_Length.x - uni_Smooth.x  - 0.001f, lModRatio.x);
    else if (lModRatio.x >= lInvEdge.x)
        lHorSmoothCoeff = smoothstep(lInvEdge.x, lInvEdge.x + uni_Smooth.x, lModRatio.x);

    // Vertical
    float   lVertSmoothCoeff = 0.0f;
    if (lModRatio.y <= uni_Length.y)
        lVertSmoothCoeff = smoothstep(uni_Length.y, uni_Length.y - uni_Smooth.y  - 0.001f, lModRatio.y);
    else if (lModRatio.y >= lInvEdge.y)
        lVertSmoothCoeff = smoothstep(lInvEdge.y, lInvEdge.y + uni_Smooth.y, lModRatio.y);

    // Finally
    float   lSmoothCoeff = min(1.0f, lHorSmoothCoeff + lVertSmoothCoeff);
    out_Color = texture2D(uni_Texture, texCoord) * lSmoothCoeff;
}

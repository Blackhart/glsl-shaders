#version 150 core

// In
smooth in highp vec2    texCoord;

// Uni
uniform sampler2D   uni_Texture;
uniform float       uni_GridGap;
uniform float       uni_GridCircleLength;
uniform float       uni_GridSmooth;
uniform vec3        uni_GridColor;
uniform vec2        uni_GridCenter;
uniform float       uni_GridContrast;
uniform float       uni_GridBrightness;
uniform float       uni_HaloAngle;
uniform float       uni_HaloLength;

// Out
out vec4    out_Color;

void    main()
{
    vec4    lTexColor = texture2D(uni_Texture, texCoord);
    // Grid
    float   lDist = length(gl_FragCoord.xy - uni_GridCenter);
    float   lModRatio = fract(lDist / uni_GridGap) * uni_GridGap;
    float   lInvEdge = uni_GridGap - uni_GridCircleLength;
    vec4    lGridColor;
    if (lModRatio <= uni_GridCircleLength)
    {
        float   lSmoothCoeff = smoothstep(uni_GridCircleLength, uni_GridCircleLength - uni_GridSmooth - 0.001f, lModRatio);
        lGridColor = vec4(uni_GridColor, 1.0f) * lSmoothCoeff;
    }
    else if (lModRatio >= lInvEdge)
    {
        float   lSmoothCoeff = smoothstep(lInvEdge, lInvEdge + uni_GridSmooth, lModRatio);
        lGridColor = vec4(uni_GridColor, 1.0f) * lSmoothCoeff;
    }
    else
        lGridColor = lTexColor;

    // GrayScale
    float   lGraySum = (lGridColor.r + lGridColor.g + lGridColor.b) / 3.0f;
    vec4    lGrayColor = vec4(vec3((lGraySum + uni_GridBrightness) * uni_GridContrast), lGridColor.a);

    // Radar Halo
    vec2    lNormDirVec = normalize(texCoord - vec2(0.5f));
    float   lCurAngle = degrees(acos(dot(lNormDirVec, vec2(1.0f, 0.0f))));
    if (texCoord.y > 0.5f)
        lCurAngle = 360.0f - lCurAngle;
    float   lDiff0 = lCurAngle - uni_HaloAngle;
    float   lDiff1 = lCurAngle + 360.0f - uni_HaloAngle;
    float   lCoeff0 = max(1.0f - (lDiff0 / uni_HaloLength), 0.0f);
    float   lCoeff1 = max(1.0f - (lDiff1 / uni_HaloLength), 0.0f);
    if (lCoeff0 > 1.0f)
        lCoeff0 = 0.0f;
    if (lCoeff1 > 1.0f)
        lCoeff1 = 0.0f;
    vec4    lHaloColor = lGridColor * max(lCoeff0, lCoeff1);

    // Finally
    out_Color = vec4(mix(lGrayColor.rgb, lHaloColor.rgb, lHaloColor.a), 1.0f);
}

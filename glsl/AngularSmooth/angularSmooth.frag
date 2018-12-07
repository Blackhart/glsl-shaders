#version 150 core

// In
smooth in highp vec2    texCoord;

// Uni
uniform sampler2D   uni_Texture;
uniform float       uni_Angle;
uniform float       uni_Length;

// Out
out vec4    out_Color;

void    main()
{
    vec4    lTexColor = texture2D(uni_Texture, texCoord);
    vec2    lNormDirVec = normalize(texCoord - vec2(0.5f));
    float   lCurAngle = degrees(acos(dot(lNormDirVec, vec2(1.0f, 0.0f))));
    if (texCoord.y > 0.5f)
        lCurAngle = 360.0f - lCurAngle;
    float   lDiff0 = lCurAngle - uni_Angle;
    float   lDiff1 = lCurAngle + 360.0f - uni_Angle;
    float   lCoeff0 = max(1.0f - (lDiff0 / uni_Length), 0.0f);
    float   lCoeff1 = max(1.0f - (lDiff1 / uni_Length), 0.0f);
    if (lCoeff0 > 1.0f)
        lCoeff0 = 0.0f;
    if (lCoeff1 > 1.0f)
        lCoeff1 = 0.0f;
    out_Color = lTexColor * max(lCoeff0, lCoeff1);
}

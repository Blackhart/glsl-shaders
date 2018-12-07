#version 150 core

// In
smooth in highp vec2    texCoord;

// Uni
uniform sampler2D       uni_Texture;
uniform float           uni_Opacity;
uniform float           uni_Angle;
uniform float           uni_Radius;
uniform float           uni_SmoothCoeff;

// Out
out vec4    out_Color;

void    main()
{
    vec2    lUV = 2.0f * texCoord - 1.0f;
    float   lUVLength = length(lUV);
    float   lZ = sqrt(1.0f - pow(lUVLength, 2.0f));
    float   lRayon = atan(lUVLength, lZ) / 3.14159265359;
    float   lPhi = atan(lUV.t, lUV.s);
    float   lTheta = lRayon * uni_Angle / 2.0f;
    lUV.s = lRayon * cos(lTheta) + 0.5f;
    lUV.t = lRayon * sin(lTheta) + 0.5f;
    vec4    lTexColor = texture2D(uni_Texture, texCoord);
    vec4    lCircleColor = texture2D(uni_Texture, lUV);
    float   lSmoothCoeff = 1.0f - smoothstep(uni_Radius - uni_SmoothCoeff, uni_Radius, lUVLength);
    out_Color = mix(lTexColor, lCircleColor, uni_Opacity) * lSmoothCoeff;
}

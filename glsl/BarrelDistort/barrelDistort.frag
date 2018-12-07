#version 150 core

// In
smooth in highp vec2    texCoord;

// Uni
uniform sampler2D       uni_Texture;
uniform float           uni_Opacity;
uniform float           uni_DistortPower;
uniform float           uni_Radius;
uniform float           uni_SmoothCoeff;

// Out
out vec4    out_Color;

void    main()
{
    vec2    lUV = 2.0f * texCoord - 1.0f;
    float   lUVLength = length(lUV);
    float   lAngle = atan(lUV.t, lUV.s);
    lUVLength = pow(lUVLength, uni_DistortPower);
    lUV.s = cos(lAngle) * lUVLength;
    lUV.t = sin(lAngle) * lUVLength;
    vec4    lTexColor = texture2D(uni_Texture, texCoord);
    vec4    lDistortColor = texture2D(uni_Texture, (lUV + 1.0f) * 0.5f);
    float   lSmoothCoeff = 1.0f - smoothstep(uni_Radius - uni_SmoothCoeff, uni_Radius, lUVLength);
    out_Color = mix(lTexColor, lDistortColor, uni_Opacity) * lSmoothCoeff;
}

#version 430 core

// In
smooth in highp vec2    texCoord;

// Uni
uniform sampler2D       uni_Texture;
uniform float           uni_Angle;

// Out
out vec4    out_Color;

void    main()
{
    vec2    lUV = 2.0f * texCoord - 1.0f;
    float   lLimit = sin(uni_Angle * 0.00872664625);
    float   lUVLength = length(lUV);
    if (lUVLength < (2.0f - lLimit))
    {
        float   lD = length(lUV * lLimit);
        float   lZ = sqrt(1.0f - lD * lD);
        float   lRayon = atan(lD, lZ) / 3.14159265359;
        float   lPhi = atan(lUV.t, lUV.s);
        lUV.s = lRayon * cos(lPhi) + 0.5f;
        lUV.t = lRayon * sin(lPhi) + 0.5f;
        out_Color = texture2D(uni_Texture, lUV);
    }
    else
        out_Color = vec4(0.0f, 0.0f, 0.0f, 1.0f);
}

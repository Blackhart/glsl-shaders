#version 150 core

// In
smooth in highp vec2    texCoord;
smooth in highp vec2    smoothTexCoord;

// Uni
uniform sampler2D   uni_Texture;
uniform float       uni_Scale;
uniform float       uni_SmoothBegin;
uniform float       uni_MaxScale;

// Out
out vec4    out_Color;

void    main()
{
    float   mixCoeff = 0.0f;
    if (uni_Scale >= uni_SmoothBegin)
        mixCoeff = smoothstep(uni_SmoothBegin, uni_MaxScale, uni_Scale);
    out_Color = mix(texture2D(uni_Texture, mod(texCoord, 1.0f)),
                    texture2D(uni_Texture, mod(smoothTexCoord, 1.0f)),
                    mixCoeff);
}

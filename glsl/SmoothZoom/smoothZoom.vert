#version 150 core

// In
in highp vec3 in_Vertex;
in highp vec2 in_TexCoord;

// Uni
uniform highp mat4      uni_Matrix;
uniform highp mat4      uni_Rotation;
uniform float           uni_Scale;
uniform float           uni_SmoothBegin;

// Out
smooth out highp vec2   texCoord;
smooth out highp vec2   smoothTexCoord;

void    main()
{
    vec4    lTexCoord = uni_Rotation * vec4((in_TexCoord - 0.5f) * uni_Scale, 0.0f, 1.0f);
    texCoord = lTexCoord.xy / lTexCoord.w + vec2(0.5f);
    if (uni_Scale >= uni_SmoothBegin)
    {
        float   lScale = uni_Scale - uni_SmoothBegin;
        vec4   lSmoothTexCoord = uni_Rotation * vec4((in_TexCoord - 0.5f) * lScale, 0.0f, 1.0f);
        smoothTexCoord = lSmoothTexCoord.xy / lSmoothTexCoord.w + vec2(0.5f);
    }
    gl_Position = uni_Matrix * vec4(in_Vertex, 1.0f);
}

#version 430 core

// In
in highp vec4       in_Vertex;
in highp vec2       in_TexCoord;

// Uni
uniform highp mat4  uni_Matrix;
uniform vec2        uni_Size;

// Out
smooth out highp vec2   texCoord;
smooth out highp vec2   aroundTex[2];

void    main()
{
    texCoord = in_TexCoord;
    gl_Position = uni_Matrix * in_Vertex;
    float   lDX = 1.0f / uni_Size.x;
    float   lDY = 1.0f / uni_Size.y;
    aroundTex[0] = vec2(texCoord.x + lDX, texCoord.y);
    aroundTex[1] = vec2(texCoord.x, texCoord.y + lDY);
}

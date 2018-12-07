#version 430 core

// In
in highp vec3 in_Vertex;
in highp vec2 in_TexCoord;

// Uni
uniform highp mat4  uni_Matrix;
uniform vec2        uni_ScreenSize;

// Out
smooth out highp vec2   texCoord[9];

void    main()
{
    highp vec2  lOffset = 1.0f / uni_ScreenSize;
    texCoord[0] = in_TexCoord - lOffset;
    texCoord[1] = in_TexCoord + vec2(0.0f, -lOffset.t);
    texCoord[2] = in_TexCoord + vec2(lOffset.s, -lOffset.t);
    texCoord[3] = in_TexCoord + vec2(-lOffset.s, 0.0f);
    texCoord[4] = in_TexCoord;
    texCoord[5] = in_TexCoord + vec2(lOffset.s, 0.0f);
    texCoord[6] = in_TexCoord + vec2(-lOffset.s, lOffset.t);
    texCoord[7] = in_TexCoord + vec2(0.0f, lOffset.t);
    texCoord[8] = in_TexCoord + lOffset;
    gl_Position = uni_Matrix * vec4(in_Vertex, 1.0f);
}

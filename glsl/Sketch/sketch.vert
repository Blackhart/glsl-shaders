#version 430 core

// In
in highp vec3   in_Vertex;
in highp vec2   in_TexCoord;

// Uni
uniform highp mat4  uni_Matrix;
uniform vec2        uni_ScreenSize;

// Out
smooth out highp vec2   texCoord[9];

void    main()
{
    texCoord[0] = in_TexCoord;
    vec2    lXOffset = vec2(1.0f / uni_ScreenSize.x, 0.0f);
    vec2    lYOffset = vec2(0.0f, 1.0f / uni_ScreenSize.y);
    vec2    lXYOffset = vec2(lXOffset.x, lYOffset.y);
    vec2    lXInvYOffset = vec2(lXOffset.x, -lYOffset.y);
    texCoord[1] = texCoord[0] - lXYOffset;
    texCoord[2] = texCoord[0] + lXYOffset;
    texCoord[3] = texCoord[0] - lXInvYOffset;
    texCoord[4] = texCoord[0] + lXInvYOffset;
    texCoord[5] = texCoord[0] - lXOffset;
    texCoord[6] = texCoord[0] + lXOffset;
    texCoord[7] = texCoord[0] - lYOffset;
    texCoord[8] = texCoord[0] + lYOffset;
    gl_Position = uni_Matrix * vec4(in_Vertex, 1.0f);
}

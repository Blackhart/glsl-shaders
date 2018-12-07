#version 150 core

// In
in highp vec3 in_Vertex;
in highp vec2 in_TexCoord;

// Uni
uniform highp mat4  uni_Matrix;
uniform vec2        uni_Grid;

// Out
smooth out highp vec2   texCoord;
smooth out highp vec2   limit;

void    main()
{
    limit = in_TexCoord * uni_Grid;
    texCoord = in_TexCoord;
    gl_Position = uni_Matrix * vec4(in_Vertex, 1.0f);
}

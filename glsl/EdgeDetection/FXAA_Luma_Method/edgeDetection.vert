#version 430 core

// In
in highp vec3 in_Vertex;
in highp vec2 in_TexCoord;

// Uni
uniform highp mat4  uni_Matrix;

// Out
noperspective out highp vec2   texCoord;

void    main()
{
    texCoord = in_TexCoord;
    gl_Position = uni_Matrix * vec4(in_Vertex, 1.0f);
}

#version 430 core

// In
in highp vec3 in_Vertex;

// Uni
uniform highp mat4    uni_Matrix;

void    main()
{
    gl_Position = uni_Matrix * vec4(in_Vertex, 1.0f);
}

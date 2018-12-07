#version 430 core

// In
in highp vec4   in_Vertex;

// Uni
uniform mat4    uni_Matrix;

void main(void)
{
    gl_Position = uni_Matrix * in_Vertex;
}

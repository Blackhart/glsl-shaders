#version 430 core

#define lvl 100

// Out
layout (vertices = 4) out;

void main(void)
{
    if (gl_InvocationID == 0)
    {
            gl_TessLevelOuter[0] = lvl;
            gl_TessLevelOuter[1] = lvl;
            gl_TessLevelOuter[2] = lvl;
            gl_TessLevelOuter[3] = lvl;
            gl_TessLevelInner[0] = lvl;
            gl_TessLevelInner[1] = lvl;
    }
    gl_out[gl_InvocationID].gl_Position = gl_in[gl_InvocationID].gl_Position;
}

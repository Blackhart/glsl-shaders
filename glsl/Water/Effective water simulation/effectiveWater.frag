#version 430 core

// Out
out vec4		out_Color;

void main()
{
    vec4    blue = vec4(28.0f, 107.0f, 160.0f, 255.0f) / 255.0f;
    out_Color = blue;
}

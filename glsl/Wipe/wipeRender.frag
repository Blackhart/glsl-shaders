#version 430 core

// In
smooth in highp vec2 texCoord;

// Uni
uniform sampler2D uni_Source;

// Out
out vec4 out_Color;

void main(void)
{
    out_Color = texture2D(uni_Source, texCoord);
}

#version 430 core

// In
smooth in highp vec2    offset[5];

// Uni
uniform sampler2D   uni_Texture;
uniform float       uni_Weight[3];

// Out
out vec4	out_Color;

void	main()
{
    vec4    c = vec4(0.0f);
    c += texture2D(uni_Texture, offset[0]) * uni_Weight[2];
    c += texture2D(uni_Texture, offset[1]) * uni_Weight[1];
    c += texture2D(uni_Texture, offset[2]) * uni_Weight[0];
    c += texture2D(uni_Texture, offset[3]) * uni_Weight[1];
    c += texture2D(uni_Texture, offset[4]) * uni_Weight[2];
    out_Color = c;
}

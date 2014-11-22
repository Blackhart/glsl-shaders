#version 150 core

#define KERNEL 10

// In
smooth in highp vec2	texCoord;
smooth in highp vec2	offsetP[KERNEL];
smooth in highp vec2	offsetN[KERNEL];

// Uni
uniform sampler2D		uni_Source1;
uniform float			uni_Weight[KERNEL];

// Out
out vec4	out_Color;

void	main()
{
    out_Color = texture2D(uni_Source1, texCoord) * uni_Weight[0];
    out_Color += texture2D(uni_Source1, offsetP[1]) * uni_Weight[1];
    out_Color += texture2D(uni_Source1, offsetN[1]) * uni_Weight[1];
    out_Color += texture2D(uni_Source1, offsetP[2]) * uni_Weight[2];
    out_Color += texture2D(uni_Source1, offsetN[2]) * uni_Weight[2];
    out_Color += texture2D(uni_Source1, offsetP[3]) * uni_Weight[3];
    out_Color += texture2D(uni_Source1, offsetN[3]) * uni_Weight[3];
    out_Color += texture2D(uni_Source1, offsetP[4]) * uni_Weight[4];
    out_Color += texture2D(uni_Source1, offsetN[4]) * uni_Weight[4];
    out_Color += texture2D(uni_Source1, offsetP[5]) * uni_Weight[5];
    out_Color += texture2D(uni_Source1, offsetN[5]) * uni_Weight[5];
    out_Color += texture2D(uni_Source1, offsetP[6]) * uni_Weight[6];
    out_Color += texture2D(uni_Source1, offsetN[6]) * uni_Weight[6];
    out_Color += texture2D(uni_Source1, offsetP[7]) * uni_Weight[7];
    out_Color += texture2D(uni_Source1, offsetN[7]) * uni_Weight[7];
    out_Color += texture2D(uni_Source1, offsetP[8]) * uni_Weight[8];
    out_Color += texture2D(uni_Source1, offsetN[8]) * uni_Weight[8];
    out_Color += texture2D(uni_Source1, offsetP[9]) * uni_Weight[9];
    out_Color += texture2D(uni_Source1, offsetN[9]) * uni_Weight[9];
    out_Color.a = texture2D(uni_Source1, texCoord).a;
}

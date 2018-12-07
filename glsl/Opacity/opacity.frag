#version 430 core

// In
smooth in highp vec2 texCoord;

// Uni
uniform sampler2D uni_source1;
uniform sampler2D uni_source2;
uniform float uni_alpha;

// Out
out vec4 out_Color;

void main(void)
{
    vec4	lTex0 = texture2D(uni_source1, texCoord);
    vec4	lTex1 = texture2D(uni_source2, texCoord);
    out_Color = mix(lTex0, lTex1, uni_alpha);
}

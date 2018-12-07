#version 430 core

// In
layout (quads, equal_spacing, cw) in;

// Uni
uniform vec2    uni_NbTexture;

// Out
smooth out highp vec2   texCoord;
smooth out float        depth;

void main(void)
{
    // Compute new vertice pos
    vec4    p1 = mix(gl_in[0].gl_Position, gl_in[1].gl_Position, gl_TessCoord.y);
    vec4    p2 = mix(gl_in[2].gl_Position, gl_in[3].gl_Position, gl_TessCoord.y);
    vec4    p = mix(p1, p2, gl_TessCoord.x);

    p.x = 2.0f * cos(radians(gl_TessCoord.x * 360.0f));
    p.y = 2.0f * sin(radians(gl_TessCoord.x * 360.0f));

    texCoord = gl_TessCoord.xy * uni_NbTexture;
    depth = gl_TessCoord.y;
    gl_Position = p;
}

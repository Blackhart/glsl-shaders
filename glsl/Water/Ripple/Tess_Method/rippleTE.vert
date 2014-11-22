#version 430 core

// In
layout (quads, equal_spacing, cw) in;

// Uni
uniform float   uni_Time;
uniform float   uni_Frequency;
uniform float   uni_Amplitude;
uniform float   uni_Fi;
uniform vec2    uni_Direction;

// Out
smooth out highp vec2   texCoord;

void main(void)
{
    // Compute new vertice pos
    vec4    p1 = mix(gl_in[0].gl_Position, gl_in[1].gl_Position, gl_TessCoord.y);
    vec4    p2 = mix(gl_in[2].gl_Position, gl_in[3].gl_Position, gl_TessCoord.y);
    vec4    p = mix(p1, p2, gl_TessCoord.x);

    // Compute direction
    vec2    center = vec2(0.5f, 0.5f);
    vec2    dir = (gl_TessCoord.xy - center);

    // Compute wave height
    float   theta = -length(dir);
    p.y -= max(0.0f, uni_Amplitude * (1.0f + theta)) * sin(theta * uni_Frequency + uni_Time * uni_Fi);

    texCoord = gl_TessCoord.xy;
    gl_Position = p;
}

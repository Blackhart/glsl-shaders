#version 430 core

#define _EQ_1_
#define _DIRECTIONAL_

// In
layout (quads, equal_spacing, cw) in;

// Uni
uniform float   uni_Time;
uniform float   uni_Frequency;
uniform float   uni_Amplitude;
uniform float   uni_Fi;
uniform vec2    uni_Direction;

uniform sampler2D   uni_Texture;

void main(void)
{
    // Compute new vertice pos
    vec4 p1 = mix(gl_in[0].gl_Position, gl_in[1].gl_Position, gl_TessCoord.x);
    vec4 p2 = mix(gl_in[2].gl_Position, gl_in[3].gl_Position, gl_TessCoord.x);
    vec4 p = mix(p1, p2, gl_TessCoord.y);


    // Center of circular waves or direction of directional waves
    vec2    c = vec2(1.5f, 1.5f);


#ifdef _CIRCULAR_
    vec2    d = c - gl_TessCoord.yx;
#endif
#ifdef _DIRECTIONAL_
    vec2    d = normalize(-uni_Direction);
#endif


    // Simple wave equation
#ifdef _EQ_1_
    p.y -= uni_Amplitude * sin(dot(d, gl_TessCoord.yx) * uni_Frequency + uni_Time * uni_Fi);
#endif
    // Sharper peaks and wider troughs added to the simple wave equation
#ifdef _EQ_2_
    float   k = 1.0f;
    p.y -= 2.0f * uni_Amplitude * pow(((sin(dot(d, gl_TessCoord.yx) * uni_Frequency + uni_Time * uni_Fi) + 1.0f) / 2.0f), k);
#endif
    // Gerstner waves equation
#ifdef _EQ_3_
    float   Q = 0.7f;
    p.x += Q * uni_Amplitude * d.x * cos(uni_Frequency * dot(gl_TessCoord.yx, d) + uni_Fi * uni_Time);
    p.z += Q * uni_Amplitude * d.y * cos(uni_Frequency * dot(gl_TessCoord.yx, d) + uni_Fi * uni_Time);
    p.y -= uni_Amplitude * sin(uni_Frequency * dot(d, gl_TessCoord.yx) + uni_Fi * uni_Time);
#endif


    gl_Position = p;
}

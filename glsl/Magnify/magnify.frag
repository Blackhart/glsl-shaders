#version 430 core

// In
smooth in highp vec2	texCoord;

// Uni
uniform sampler2D	uni_source1;
uniform float		uni_radius;
uniform float		uni_diffraction;
uniform vec2		uni_mousePos;
uniform vec2		uni_screenSize;

// Out
out vec4		out_Color;

void main()
{
    vec2	tc = texCoord;
    vec2	xy = vec2(gl_FragCoord.x, gl_FragCoord.y) - uni_mousePos.xy;
    float	r = sqrt(xy.x * xy.x + xy.y * xy.y);
    if (r < uni_radius)
    {
        float	h = uni_diffraction * 0.5 * uni_radius;
        vec2	new_xy = r < uni_radius ? xy * (uni_radius - h) / sqrt(uni_radius * uni_radius - r * r) : xy;
        tc = (new_xy + uni_mousePos) / uni_screenSize;
    }
    out_Color = texture2D(uni_source1, tc);
}


#version 430 core

// Resin_source2s
// http://www.mathworks.com/help/releases/R2013b/images/hsvcone.gif => Cylindre HSV
// http://lolengine.net/blog/2013/07/27/rgb-to-hsv-in-glsl => Conversion color format

// In
smooth in highp vec2    texCoord;

// Uni
uniform sampler2D	uni_Texture;
uniform float           uni_NormalizedDegree;

// Out
out vec4    out_Color;

// Functions definition
vec4    rgb_to_hsv(vec4);
vec4    hsv_to_rgb(vec4);

void    main(void)
{
    vec4    lRealColor = texture2D(uni_Texture, texCoord);
    vec4    lHSV = rgb_to_hsv(lRealColor);
    lHSV.r += uni_NormalizedDegree;
    if (lHSV.r < 0.0f)
        lHSV.r = 1.0f + lHSV.r;
    else if (lHSV.r > 1.0f)
        lHSV.r = lHSV.r - 1.0f;
    out_Color = hsv_to_rgb(lHSV);
}

vec4    rgb_to_hsv(vec4 color)
{
    vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
    vec4 p = mix(vec4(color.bg, K.wz), vec4(color.gb, K.xy), step(color.b, color.g));
    vec4 q = mix(vec4(p.xyw, color.r), vec4(color.r, p.yzx), step(p.x, color.r));

    float d = q.x - min(q.w, q.y);
    float e = 1.0e-10;
    return vec4(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x, color[3]);
}

vec4    hsv_to_rgb(vec4 hsv)
{
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(hsv.xxx + K.xyz) * 6.0 - K.www);
    return vec4(hsv.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), hsv.y), hsv[3]);
}

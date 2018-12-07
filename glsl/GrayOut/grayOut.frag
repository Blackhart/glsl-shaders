#version 430 core

// Resin_source2s
// http://www.mathworks.com/help/releases/R2013b/images/hsvcone.gif => Cylindre HSV
// http://lolengine.net/blog/2013/07/27/rgb-to-hsv-in-glsl => Conversion color format

// In
smooth in highp vec2    texCoord;

// Uni
uniform sampler2D	uni_Texture;
uniform float		uni_H1;
uniform float		uni_H2;
uniform float       	uni_SaturationMin;
uniform float      	uni_SaturationMax;
uniform float       	uni_LuminanceMin;
uniform float       	uni_LuminanceMax;

// Out
out vec4    out_Color;

// Functions definition
vec4    rgb_to_hsv(vec4);
vec4    process(vec4);

void    main(void)
{
    vec4    lRealColor = texture2D(uni_Texture, texCoord);
    out_Color = process(lRealColor);
}

vec4    process(vec4 pColor)
{
    vec4    lHSV = rgb_to_hsv(pColor);

    if (lHSV.r >= uni_H1 && lHSV.r <= uni_H2)
        // if HUE is between HUE tolerance Min/Max
    {
        if (lHSV.g >= uni_SaturationMin && lHSV.g <= uni_SaturationMax)
            // if Saturation is between Saturation Min/Max
        {
            if (lHSV.b >= uni_LuminanceMin && lHSV.b <= uni_LuminanceMax)
                return pColor;
        }
    }
    return vec4(vec3((pColor.r + pColor.g + pColor.b) / 3.0f), pColor.a);
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

#version 430 core

// Resin_source2s
// http://www.mathworks.com/help/releases/R2013b/images/hsvcone.gif => Cylindre HSV
// http://lolengine.net/blog/2013/07/27/rgb-to-hsv-in-glsl => Conversion color format

// In
smooth in highp vec2    texCoord;

// Uni
uniform sampler2D	uni_Texture;
uniform float		uni_h1;
uniform float		uni_h2;
uniform float		uni_saturationMin;
uniform float		uni_saturationMax;
uniform float		uni_luminanceMin;
uniform float		uni_luminanceMax;
uniform float		uni_Smooth;

// Out
out vec4    out_Color;

// Functions definition
vec4    rgb_to_hsv(vec4);
vec4    hsv_to_rgb(vec4);
vec4    process(vec4);
bool    inHUEInterval(float);
bool    inSaturationInterval(float);
int     inValueInterval(float);

void    main(void)
{
    vec4    lRealColor = texture2D(uni_Texture, texCoord);
    out_Color = process(lRealColor);
}

vec4    process(vec4 pColor)
{
    vec4    lHSV = rgb_to_hsv(pColor);
    float   lSH1 = max(0.0f, uni_h1 - uni_Smooth);
    float   lSH2 = min(1.0f, uni_h2 + uni_Smooth);

    if (inHUEInterval(lHSV.r))
        // if HUE is between HUE tolerance Min/Max
    {
        if (inSaturationInterval(lHSV.g))
            // if Saturation is between Saturation Min/Max
        {
            if (inValueInterval(lHSV.b) == 0)
                // if Value is between minValue/maxValue => color delete
                pColor = vec4(0.0f);
            else if (inValueInterval(lHSV.b) == -1)
                // if Value < minValue => color dark
            {
                lHSV.a = min(1.0f, uni_luminanceMin + 1.0f - (lHSV.b / uni_luminanceMin)); // calcul alpha
                lHSV.b = 0.0f;
                pColor = hsv_to_rgb(lHSV);
            }
            else
                // if Value > maxValue => color lum
            {
                lHSV.a = min(1.0f, ((lHSV.b - uni_luminanceMax) / (1.0f - uni_luminanceMax))); // calcul alpha
                lHSV.b = 1.0f;
                pColor = hsv_to_rgb(lHSV);
            }
        }
    }
    // Smooth test (on HUE index)
    else if (lHSV.r >= lSH1 && lHSV.r < uni_h1)
        pColor.a = smoothstep(uni_h1, lSH1, lHSV.r);
    else if (lHSV.r <= lSH2 && lHSV.r > uni_h2)
        pColor.a = smoothstep(uni_h2, lSH2, lHSV.r);
    return pColor * vec4(pColor.aaa, 1.0f);
}

bool    inHUEInterval(float pHUE)
// Check HUE interval
{
    return (pHUE >= uni_h1) && (pHUE <= uni_h2);
}

bool    inSaturationInterval(float pSat)
// Check saturation interval
{
    return (pSat >= uni_saturationMin) && (pSat <= uni_saturationMax);
}

int     inValueInterval(float pVal)
// Check value interval
{
    if (pVal >= uni_luminanceMin && pVal <= uni_luminanceMax)
        return 0;
    else if (pVal < uni_luminanceMin)
        return -1;
    else
        return 1;
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

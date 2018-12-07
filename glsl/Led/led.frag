#version 150 core

// In
smooth in highp vec2    texCoord;

// Uni
uniform float uni_PixelSize;
uniform vec2  uni_ScreenSize;
uniform float uni_PixelRadius;
uniform int   uni_Luminance;
uniform float uni_LuminanceBoost;
uniform sampler2D   uni_Texture;

// Out
out vec4    color;

// Def Function
void    pixelate();
vec3    luminance(vec3);

void    main()
{
    pixelate();
}

void    pixelate()
{
    highp vec2  lTexStep = 1.0f / uni_ScreenSize;
    highp vec2  lKernelNum = (texCoord / lTexStep) / uni_PixelSize;
    highp vec2  lKernelNumTex = lTexStep * floor(lKernelNum) * uni_PixelSize;
    lKernelNum = fract(lKernelNum);
    vec3        lColorAvg = vec3(0.0f);
    int offset = int(uni_PixelSize) / 3;
    float   nbPix = 0.0f;

    for (int i = offset; i < uni_PixelSize; i+=offset)
    {
        float   x = lKernelNumTex.s + i * lTexStep.s;
        for (int j = offset; j < uni_PixelSize; j+=offset, nbPix+=1.0f)
        {
            float   y = lKernelNumTex.t + j * lTexStep.t;
            lColorAvg += texture2D(uni_Texture, vec2(x, y)).rgb;
        }
    }
    lColorAvg /= nbPix;
    lColorAvg = luminance(lColorAvg);
    if (length(lKernelNum - vec2((1.0f / uni_PixelSize)) * floor(uni_PixelSize / 2.0f)) > uni_PixelRadius)
        lColorAvg = vec3(0.0f);
    color = vec4(lColorAvg.rgb, texture2D(uni_Texture, texCoord).a);
}

vec3    luminance(vec3 pColor)
{
    float   lSum = pColor.r + pColor.g + pColor.b;
    float   lLuminance = lSum / 3.0f;
    vec3    lRatio = pColor / lLuminance;
    float   lLuminanceStep = 1.0f / float(uni_Luminance);
    float   lLuminanceBin = ceil(lLuminance / lLuminanceStep);
    float   lLuminanceFactor = lLuminanceStep * lLuminanceBin + uni_LuminanceBoost;
    return lRatio * lLuminanceFactor;
}

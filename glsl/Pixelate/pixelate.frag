#version 430 core

// In
smooth in highp vec2    texCoord;

// Uni
uniform float		uni_PixelSize;
uniform vec2		uni_ScreenSize;
uniform sampler2D   uni_Texture;

// Out
out vec4    out_Color;

void    main()
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
    out_Color = vec4(lColorAvg.rgb, texture2D(uni_Texture, texCoord).a);
}
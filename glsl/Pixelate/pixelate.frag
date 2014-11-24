#version 430 core

// In
smooth in highp vec2    texCoord;

// Uni
uniform sampler2D	uni_Texture;
uniform float		uni_PixelSize;
uniform vec2		uni_ScreenSize;

// Out
out vec4    out_Color;

void    main()
{
    highp vec2  lTexStep = 1.0f / uni_ScreenSize;
    highp vec2  lKernelNumTex = lTexStep * floor((texCoord / lTexStep) / uni_PixelSize) * uni_PixelSize;
    vec3        lColorAvg = vec3(0.0f);

    for (int i = 0; i < uni_PixelSize; i++)
    {
        float   x = lKernelNumTex.s + i * lTexStep.s;
        for (int j = 0; j < uni_PixelSize; j++)
        {
            float   y = lKernelNumTex.t + j * lTexStep.t;
            lColorAvg += texture2D(uni_Texture, vec2(x, y)).rgb;
        }
    }
    lColorAvg /= (uni_PixelSize * uni_PixelSize);
    out_Color = vec4(lColorAvg.rgb, texture2D(uni_Texture, texCoord).a);
}
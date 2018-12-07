#version 430 core

// In
smooth in highp vec2    texCoord[9];

// Uni
uniform float uni_Bias;
uniform mat4  uni_ConvolutionMat;
uniform sampler2D   uni_Texture;

// Out
out vec4    out_Color;


void    main()
{
    vec4    lColor = texture2D(uni_Texture, texCoord[4]) * uni_ConvolutionMat[1][1];
    lColor.rgb += texture2D(uni_Texture, texCoord[0]).rgb * uni_ConvolutionMat[0][0] +
                  texture2D(uni_Texture, texCoord[1]).rgb * uni_ConvolutionMat[0][1] +
                  texture2D(uni_Texture, texCoord[2]).rgb * uni_ConvolutionMat[0][2] +
                  texture2D(uni_Texture, texCoord[3]).rgb * uni_ConvolutionMat[1][0] +
                  texture2D(uni_Texture, texCoord[5]).rgb * uni_ConvolutionMat[1][2] +
                  texture2D(uni_Texture, texCoord[6]).rgb * uni_ConvolutionMat[2][0] +
                  texture2D(uni_Texture, texCoord[7]).rgb * uni_ConvolutionMat[2][1] +
                  texture2D(uni_Texture, texCoord[8]).rgb * uni_ConvolutionMat[2][2];
    float   lSum = uni_ConvolutionMat[0][0] +
                   uni_ConvolutionMat[0][1] +
                   uni_ConvolutionMat[0][2] +
                   uni_ConvolutionMat[1][0] +
                   uni_ConvolutionMat[1][1] +
                   uni_ConvolutionMat[1][2] +
                   uni_ConvolutionMat[2][0] +
                   uni_ConvolutionMat[2][1] +
                   uni_ConvolutionMat[2][2];
    lSum = max(abs(lSum), 1.0f);
    out_Color = vec4((lColor.rgb / lSum) + uni_Bias, lColor.a);
}

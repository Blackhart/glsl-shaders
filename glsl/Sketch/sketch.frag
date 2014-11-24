#version 430 core

// In
smooth in highp vec2    texCoord[9];

// Uni
uniform sampler2D   uni_Texture;
uniform float       uni_Opacity;
uniform float       uni_Intensity;

// Out
out vec4    out_Color;

void    main()
{
    const vec3  lDefaultIntensity = vec3(0.2125f, 0.7154f, 0.0721f);
    vec4    lTexColor = texture2D(uni_Texture, texCoord[0]);
    float   lEdge1 = dot(texture2D(uni_Texture, texCoord[1]).rgb, lDefaultIntensity);
    float   lEdge2 = dot(texture2D(uni_Texture, texCoord[2]).rgb, lDefaultIntensity);
    float   lEdge3 = dot(texture2D(uni_Texture, texCoord[3]).rgb, lDefaultIntensity);
    float   lEdge4 = dot(texture2D(uni_Texture, texCoord[4]).rgb, lDefaultIntensity);
    float   lEdge5 = dot(texture2D(uni_Texture, texCoord[5]).rgb, lDefaultIntensity);
    float   lEdge6 = dot(texture2D(uni_Texture, texCoord[6]).rgb, lDefaultIntensity);
    float   lEdge7 = dot(texture2D(uni_Texture, texCoord[7]).rgb, lDefaultIntensity);
    float   lEdge8 = dot(texture2D(uni_Texture, texCoord[8]).rgb, lDefaultIntensity);
    float   lSumColor0 = -lEdge3 - 2.0f * lEdge8 - lEdge2 + lEdge1 + 2.0f * lEdge7 + lEdge4;
    float   lSumColor1 = -lEdge1 - 2.0f * lEdge5 - lEdge3 + lEdge4 + 2.0f * lEdge6 + lEdge2;
    highp vec3  lGray = vec3(1.0f - length(vec2(lSumColor0, lSumColor1)));
    out_Color = vec4(mix(lTexColor.rgb, mix(lTexColor.rgb, lGray, uni_Intensity), uni_Opacity), lTexColor.a);
}

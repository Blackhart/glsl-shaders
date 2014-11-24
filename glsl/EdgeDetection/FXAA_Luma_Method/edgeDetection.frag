#version 430 core

// In
noperspective in highp vec2    texCoord;

// Uni
uniform sampler2D   uni_Texture;
uniform vec2        uni_Delta;
uniform float       uni_Threshold;

// Out
out vec4    out_Color;

float luminance(vec3 c)
{
    return dot(c, vec3(0.2126, 0.7152, 0.0722));
}

void    main()
{
    vec4    rgbyM = texture2D(uni_Texture, texCoord);
    float   lumaS = luminance(texture2D(uni_Texture, texCoord + vec2(0.0f, uni_Delta.y)).xyz);
    float   lumaE = luminance(texture2D(uni_Texture, texCoord + vec2(uni_Delta.x, 0.0f)).xyz);
    float   lumaN = luminance(texture2D(uni_Texture, texCoord + vec2(0.0f, -uni_Delta.y)).xyz);
    float   lumaW = luminance(texture2D(uni_Texture, texCoord + vec2(-uni_Delta.x, 0.0f)).xyz);
    float   lumaM = luminance(texture2D(uni_Texture, texCoord).xyz);
    float   maxSM = max(lumaS, lumaM);
    float   minSM = min(lumaS, lumaM);
    float   maxESM = max(lumaE, maxSM);
    float   minESM = min(lumaE, minSM);
    float   maxWN = max(lumaN, lumaW);
    float   minWN = min(lumaN, lumaW);
    float   rangeMax = max(maxWN, maxESM);
    float   rangeMin = min(minWN, minESM);
    float   rangeMaxScaled = rangeMax * 0.125f;
    float   range = rangeMax - rangeMin;
    float   rangeMaxClamped = max(uni_Threshold, rangeMaxScaled);
    bool    earlyExit = range < rangeMaxClamped;
    if(earlyExit)
        out_Color = vec4(vec3(0.0f), 1.0f);
    else
        out_Color = rgbyM;
}

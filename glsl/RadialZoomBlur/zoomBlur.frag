#version 150 core

// In
smooth in highp vec2    texCoord;

// Uni
uniform sampler2D   uni_Texture;
uniform float       uni_ZoomPower;
uniform float       uni_FocalisationPower;
uniform vec2        uni_ZoomCenter;

// Out
out vec4    out_Color;

void    main()
{
    float   lWeight[10] = float[](-0.08f, -0.05f, -0.03f, -0.02f, -0.01f, 0.01f, 0.02f, 0.03f, 0.05f, 0.08f);
    vec2    lDir = uni_ZoomCenter - texCoord;
    float   lDist = length(lDir);
    lDir = normalize(lDir);
    vec4    lColor = texture2D(uni_Texture, texCoord);
    vec4    lSum = lColor;
    for (int i = 0; i < 10; i++)
        lSum += texture2D(uni_Texture, texCoord + lDir * lWeight[i] * uni_ZoomPower);
    lSum *= 1.0f / 11.0f;
    float   lMixRatio = clamp(lDist * uni_FocalisationPower, 0.0f, 1.0f);
    out_Color = mix(lColor, lSum, lMixRatio);
}

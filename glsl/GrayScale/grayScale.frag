#version 150 core

// In
smooth in highp vec2    texCoord;

// Uni
uniform sampler2D   uni_Texture;

// Out
out vec4    out_Color;

void    main()
{
    vec4    lTexColor = texture2D(uni_Texture, texCoord);
    float    lGrayAverage = (lTexColor.r + lTexColor.g + lTexColor.b) / 3.0f;
    out_Color = vec4(vec3(lGrayAverage), lTexColor.a);
}

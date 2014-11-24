#version 430 core

// In
smooth in highp vec2    texCoord;

// Uni
uniform sampler2D   uni_Texture;
uniform float       uni_Amount;

// Out
out vec4    out_Color;

void    main()
{
    vec4    color = texture2D(uni_Texture, texCoord);
    float   grayAverage = (color.r + color.g + color.b) / 3.0f;
    if (uni_Amount <= grayAverage)
        out_Color = vec4(vec3(0.0f), 1.0f);
    else
        out_Color = vec4(1.0f);
}

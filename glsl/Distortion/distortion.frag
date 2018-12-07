#version 150 core

// In
smooth in highp vec2    texCoord;

// Uni
uniform sampler2D   uni_Texture;
uniform vec2        uni_Gap;

// Out
out vec4    out_Color;

void    main()
{
    const float pi = 3.1415926535897932384626433832795028841971693993751058;
    float   eq1 = 8.0f * sin(texCoord.y * 12.0f) + cos(texCoord.y * 14.0f) - 5.0f * cos(texCoord.y * 15.0f);
    float   eq2 = 8.0f * sin(texCoord.x * 6.0f) + cos(texCoord.x * 8.0f) - 5.0f * cos(texCoord.x * 9.0f);
    vec2    uv = texCoord + vec2(eq1 * uni_Gap.x, eq2 * uni_Gap.y);
    out_Color = texture2D(uni_Texture, uv);
}

#version 150 core

// In
smooth in highp vec2    texCoord;

// Uni
uniform sampler2D   uni_Texture;
uniform vec2        uni_TextureSize;
uniform vec2        uni_Center;
uniform float       uni_Rayon;
uniform float       uni_Angle;

// Out
out vec4    out_Color;

void    main()
{
    vec2    uv = texCoord * uni_TextureSize - uni_Center;
    float   d = length(uv);
    if (d < uni_Rayon)
    {
        float   percent = (uni_Rayon - d) / uni_Rayon;
        float   theta = percent * percent * uni_Angle * 8.0f;
        float   s = sin(theta);
        float   c = cos(theta);
        uv = vec2(dot(uv, vec2(c, -s)), dot(uv, vec2(s, c)));
    }
    uv += uni_Center;
    out_Color = texture2D(uni_Texture, uv / uni_TextureSize);
}

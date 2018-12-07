#version 150 core

// In
smooth in highp vec2    texCoord;

// Uni
uniform sampler2D   uni_Texture;

// Out
out vec4    out_Color;

void    main()
{
    vec4    color = texture2D(uni_Texture, texCoord);
    out_Color = vec4(1.0f - color.rgb, color.a);
}

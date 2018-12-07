#version 150 core

// In
smooth in highp vec2    texCoord;

// Uni
uniform sampler2D   uni_Texture;

// Out
out vec4    out_Color;

void    main()
{
    out_Color = texture2D(uni_Texture, texCoord);
}

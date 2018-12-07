#version 150 core

// In
smooth in highp vec2    texCoord;

// Uni
uniform sampler2D   uni_Texture;
uniform vec2        uni_Offset;

// Out
out vec4    out_Color;

void    main()
{
    out_Color = texture2D(uni_Texture, mod(texCoord + uni_Offset, 1.0f));
}

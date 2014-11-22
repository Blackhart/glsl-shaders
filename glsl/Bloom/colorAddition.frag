#version 430 core

// In
smooth in highp vec2    texCoord;

// Uni
uniform sampler2D   uni_Texture1;
uniform sampler2D   uni_Texture2;

// Out
out vec4    out_Color;

void    main()
{
    out_Color = texture2D(uni_Texture1, texCoord) + texture2D(uni_Texture2, texCoord);
}

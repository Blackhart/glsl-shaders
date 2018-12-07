#version 430 core

// In
smooth in highp vec2    texCoord;

// Uni
uniform sampler2D       uni_Texture;

// Out
out vec4                out_Color;


void    main()
{
    out_Color.r = texture2D(uni_Texture, texCoord).r;
    out_Color.a = 1.0f;
}

#version 430 core

// In
smooth in highp vec2    texCoord;

// Uni
uniform sampler2D       uni_Texture;
uniform sampler2D       uni_Backup;

// Exit Variables
out vec4                out_Color;


void    main()
{
    out_Color.rg = texture2D(uni_Backup, texCoord).rg;
    out_Color.b = texture2D(uni_Texture, texCoord).b;
    out_Color.a = 1.0f;
}

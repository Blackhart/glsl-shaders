#version 430 core

// In
smooth in highp vec2    texCoord;

// Uni
uniform sampler2D   uni_Texture;

// Out
out vec4    out_Color;

void    main()
{
    out_Color = vec4(vec3(texture(uni_Texture, texCoord).a), 1.0f);
}

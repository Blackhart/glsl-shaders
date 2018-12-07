#version 150 core

// In
smooth in highp vec2    texCoord;

// Uni
uniform sampler2D       uni_Texture;
uniform vec4            uni_ColorFactor;

// Out
out vec4    out_Color;

void    main()
{
    vec4    lTexColor = texture2D(uni_Texture, texCoord);
    out_Color = vec4(mix(lTexColor.rgb, lTexColor.rgb + uni_ColorFactor.rgb, uni_ColorFactor.a), lTexColor.a);
}

#version 150 core

// In
smooth in highp vec2    texCoord;

// Uni
uniform sampler2D       uni_Texture;
uniform float           uni_Contrast;
uniform float           uni_Brightness;
uniform float           uni_Opacity;

// Out
out vec4    out_Color;

void    main()
{
    vec4    lTexColor = texture2D(uni_Texture, texCoord);
    vec3    lProcessColor = (lTexColor.rgb + uni_Brightness) * uni_Contrast;
    out_Color = vec4(mix(lTexColor.rgb, lProcessColor, uni_Opacity), lTexColor.a);
}

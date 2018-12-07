#version 150 core

// In
smooth in highp vec2    texCoord;

// Uni
uniform sampler2D       uni_Texture;
uniform vec2            uni_Size;
uniform vec2            uni_ScaleSurf;

// Out
out vec4    out_Color;

void    main()
{
    highp vec2  lScaleFactor = uni_ScaleSurf / uni_Size;
    highp vec2  lTexCoord = (lScaleFactor / uni_Size) * gl_FragCoord.xy;
    out_Color = texture2D(uni_Texture, lTexCoord);
}

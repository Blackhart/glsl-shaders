#version 430 core

// In
smooth in highp vec2    texCoord;

// Uni
uniform sampler2D   uni_Texture;
uniform int   uni_Line;
uniform int   uni_HidePercentLine;

// Out
out vec4    out_Color;


void    main()
{
    int lLineWidth = uni_HidePercentLine * uni_Line / 100;
    int lNumLine = int(gl_FragCoord.y) % uni_Line;
    if (lNumLine < lLineWidth)
        out_Color = vec4(0.0f, 0.0f, 0.0f, 0.0f);
    else
        out_Color = texture2D(uni_Texture, texCoord);
}

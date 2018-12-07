#version 430 core

// In
smooth in highp vec2    texCoord;

// Uni
uniform sampler2D   uni_Source1;
uniform sampler2D   uni_Source2;
uniform sampler2D   uni_Source3;
uniform highp float uni_Regen;

// Out
out highp vec4  out_Color;

// Function Def
void    wipe();

void    main()
{
    wipe();
}

void    wipe()
{
    vec4	lRealColor = texture2D(uni_Source2, texCoord);
    vec4	lForeground = texture2D(uni_Source1, texCoord);
    float	lAlpha = 1.0f - texture2D(uni_Source3, texCoord).r;

    if (lAlpha > lRealColor.a + uni_Regen)
        lAlpha = clamp(lRealColor.a + uni_Regen, 0.0f, 1.0f);
    out_Color = mix(lRealColor, lForeground, lAlpha);
    out_Color.rgb *= lAlpha;
    out_Color.a = lAlpha;
}

#version 430 core

// In
smooth in highp vec2      texCoord;

// Uni
uniform sampler2D   uni_Texture;
uniform float       uni_h1;
uniform float       uni_h2;
uniform float       uni_smoothing;

// Out
out vec4            out_Color;

void    main(void)
{
    vec4    lColor = texture2D(uni_Texture, texCoord);
    float   luminance = vec3(0.2126f, 0.7152f, 0.0722f) * lColor.rgb;
    float   lMinSmooth = uni_h1 - uni_smoothing;
    float   lMaxSmooth = uni_h2 + uni_smoothing;

    if (luminance > uni_h1 && luminance < uni_h2)
        lColor = vec4(0.0f);
    else if (luminance > lMinSmooth && luminance < uni_h1)
        lColor[3] = smoothstep(uni_h1, lMinSmooth, luminance); // fix alpha
    else if (luminance > uni_h2 && luminance < lMaxSmooth)
        lColor[3] = smoothstep(uni_h2, lMaxSmooth, luminance); // fix alpha
    out_Color = lColor * vec4(lColor.aaa, 1.0f);
}

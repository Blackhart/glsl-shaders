#version 430 core

// In
smooth in highp vec2      texCoord;

// Uni
uniform sampler2D   uni_source1;
uniform float       uni_h1;
uniform float       uni_h2;
uniform float       uni_smoothing;

// Out
out vec4            out_Color;

// Functions definition
vec4		    treat();

void    main(void)
{
    out_Color = treat();
}

vec4	treat()
{
    vec4    lColor = texture2D(uni_source1, texCoord);
    float   luminance = (0.2126 * lColor.r) + (0.7152 * lColor.g) + (0.0722 * lColor.b);
    float   lMinSmooth = uni_h1 - uni_smoothing;
    float   lMaxSmooth = uni_h2 + uni_smoothing;

    if (luminance > uni_h1 && luminance < uni_h2)
        lColor = vec4(0.0f);
    else if (luminance > lMinSmooth && luminance < uni_h1)
        lColor[3] = smoothstep(uni_h1, lMinSmooth, luminance); // fix alpha
    else if (luminance > uni_h2 && luminance < lMaxSmooth)
        lColor[3] = smoothstep(uni_h2, lMaxSmooth, luminance); // fix alpha
    return lColor * vec4(lColor.aaa, 1.0f);
}

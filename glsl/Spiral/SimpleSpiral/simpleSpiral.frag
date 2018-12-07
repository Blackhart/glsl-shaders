#version 150 core

// In
smooth in highp vec2    texCoord;

// Uni
uniform sampler2D   uni_Texture;
uniform float       uni_Gap;
uniform float       uni_SpireWidth;
uniform float       uni_Rotation;
uniform vec2        uni_Center;
uniform float        uni_Smooth;

// Out
out vec4    out_Color;

void    main()
{
    // Comput position
    vec2    xy = gl_FragCoord.xy - uni_Center;

    // Compute angle
    vec2    v = normalize(xy);
    float   fi = degrees(acos(dot(v, vec2(1.0f, 0.0f))));
    if (texCoord.y > 0.5f)
        fi = 360.0f - fi;
    fi += uni_Rotation;
    if (fi > 360.0f)
        fi -= 360.0f;
    else if (fi < 0.0f)
        fi = 360.0f - fi;
    fi /= 360.0f;

    // Compute rayon
    float   r = length(xy);

    // Spiral equation
    float   mod1 = floor(r / uni_Gap);
    float   nbSpire = fi + mod1;
    float   eq1 = uni_Gap * nbSpire;
    float   eq2 = uni_Gap * (nbSpire - 1.0f);
    float   eq3 = uni_Gap * (nbSpire + 1.0f);

    // Determine color
    if (r > eq1 - uni_SpireWidth && r < eq1 + uni_SpireWidth)
    {
        float   sign = step(eq1, r) * 2.0f - 1.0f;
        float   sc = smoothstep(eq1 + uni_SpireWidth * sign, eq1 + uni_Smooth * sign, r);
        out_Color = texture2D(uni_Texture, texCoord) * sc;
    }
    else if (r > eq2 - uni_SpireWidth && r < eq2 + uni_SpireWidth)
    {
        float   sign = step(eq2, r) * 2.0f - 1.0f;
        float   sc = smoothstep(eq2 + uni_SpireWidth * sign, eq2 + uni_Smooth * sign, r);
        out_Color = texture2D(uni_Texture, texCoord) * sc;
    }
    else if (r > eq3 - uni_SpireWidth && r < eq3 + uni_SpireWidth)
    {
        float   sign = step(eq3, r) * 2.0f - 1.0f;
        float   sc = smoothstep(eq3 + uni_SpireWidth * sign, eq3 + uni_Smooth * sign, r);
        out_Color = texture2D(uni_Texture, texCoord) * sc;
    }
    else
        out_Color = vec4(0.0f);
}

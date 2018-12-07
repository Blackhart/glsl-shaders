#version 150 core

// In
smooth in highp vec2    texCoord;

// Uni
uniform sampler2D   uni_Texture;
uniform float       uni_SpireWidth;
uniform float       uni_SpireWidthCenter;
uniform float       uni_Rotation;
uniform float       uni_Smooth;

// Out
out vec4    out_Color;

void    main()
{
    // Comput position
    vec2    xy = texCoord - vec2(0.5f);

    // Compute angle
    vec2    v = normalize(xy);
    float   fi = degrees(acos(dot(v, vec2(1.0f, 0.0f))));
    if (texCoord.y > 0.5f)
        fi = 360.0f - fi;
    fi += uni_Rotation;

    // Compute rayon
    float   r = length(xy);

    // Compute cur rotation
    float   amod = mod(fi - 120.0f * log(r), 30.0f);

    // Determine color
    if (amod < uni_SpireWidth)
    {
        float   sr = abs(uni_SpireWidthCenter - amod);
        float   sc = smoothstep(uni_SpireWidthCenter, uni_Smooth - 0.001f, sr);
        out_Color = texture2D(uni_Texture, texCoord) * sc;
    }
    else
        out_Color = vec4(0.0f);
}

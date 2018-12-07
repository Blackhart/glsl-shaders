#version 150 core

// In
smooth in highp vec2    texCoord;

// Uni
uniform sampler2D       uni_Texture;
uniform float           uni_BlockNB;

// Out
out vec4    out_Color;

void    main()
{
    vec2    uv = 2.0f * texCoord - 1.0f;
    vec2    nv = normalize(uv);
    float   fi = degrees(acos(dot(nv, vec2(1.0f, 0.0f))));
    float   gap = 181.0f / uni_BlockNB;
    float   block = floor(fi / gap);
    fi = mod(fi, gap);
    if (mod(block, 2.0f) == 0.0f)
        fi = radians(fi);
    else
        fi = radians(gap - fi);
    float   r = length(uv);
    uv.s = cos(fi) * r;
    uv.t = sin(fi) * r;
    out_Color = texture2D(uni_Texture, (uv + 1.0f) * 0.5f);
}

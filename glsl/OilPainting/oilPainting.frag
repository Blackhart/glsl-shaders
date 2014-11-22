#version 430 core

// In
smooth in highp vec2    texCoord;

// Uni
uniform sampler2D       uni_Texture;
uniform int             uni_Radius;
uniform vec2            uni_ScreenSize;

// Out
out vec4    out_Color;

void    main()
{
    float   lRadiusSquare = float((uni_Radius + 1) * (uni_Radius + 1));
    vec3    lColor[4];
    vec3    lColorSquare[4];

    for (int lIndex = 0; lIndex < 4; lIndex++)
    {
        lColor[lIndex] = vec3(0.0f);
        lColorSquare[lIndex] = vec3(0.0f);
    }

    for (int j = -uni_Radius; j <= 0; j++)
    {
        for (int i = -uni_Radius; i <= 0; i++)
        {
            vec3    lTexColor = texture2D(uni_Texture, texCoord + vec2(i, j) / uni_ScreenSize).rgb;
            lColor[0] += lTexColor;
            lColorSquare[0] += lTexColor * lTexColor;
        }
    }

    for (int j = -uni_Radius; j <= 0; j++)
    {
        for (int i = 0; i <= uni_Radius; i++)
        {
            vec3    lTexColor = texture2D(uni_Texture, texCoord + vec2(i, j) / uni_ScreenSize).rgb;
            lColor[1] += lTexColor;
            lColorSquare[1] += lTexColor * lTexColor;
        }
    }

    for (int j = 0; j <= uni_Radius; j++)
    {
        for (int i = 0; i <= uni_Radius; i++)
        {
            vec3    lTexColor = texture2D(uni_Texture, texCoord + vec2(i, j) / uni_ScreenSize).rgb;
            lColor[2] += lTexColor;
            lColorSquare[2] += lTexColor * lTexColor;
        }
    }

    for (int j = 0; j <= uni_Radius; j++)
    {
        for (int i = -uni_Radius; i <= 0; i++)
        {
            vec3    lTexColor = texture2D(uni_Texture, texCoord + vec2(i, j) / uni_ScreenSize).rgb;
            lColor[3] += lTexColor;
            lColorSquare[3] += lTexColor * lTexColor;
        }
    }

    float   lMinSigma = 4.71828182846;

    for (int i = 0; i < 4; i++)
    {
        lColor[i] /= lRadiusSquare;
        lColorSquare[i] = abs(lColorSquare[i] / lRadiusSquare - lColor[i] * lColor[i]);
        float   lSigma = lColorSquare[i].r + lColorSquare[i].g + lColorSquare[i].b;
        if (lSigma < lMinSigma)
        {
            lMinSigma = lSigma;
            out_Color = vec4(lColor[i], texture2D(uni_Texture, texCoord).a);
        }
    }
}

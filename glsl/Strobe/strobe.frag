#version 150 core

// In
smooth in highp vec2    texCoord;

// Uni
uniform sampler2D   uni_Texture;
uniform float       uni_Frequency; // frequency * 0.5f
uniform float       uni_ModF; // mod(actualTime, frequency)
uniform bool        uni_Smooth;

// Out
out vec4    out_Color;

void    main()
{
    // Retrieve texture color
    vec4    texColor = texture2D(uni_Texture, texCoord);

    // Compute blink effect
    float   diff = uni_Frequency - uni_ModF;
    float   c;
    if (uni_Smooth)
    {
        diff = abs(diff);
        c = smoothstep(uni_Frequency, 0.0f, diff);

        // Determine final color
        out_Color = texColor * min(1.0f, (2.0f - (length(texCoord - vec2(0.5f)) * 2.0f))) * c;
    }
    else
    {
        c = step(0.0f, diff);

        // Determine final color
        out_Color = texColor * c;
    }
}

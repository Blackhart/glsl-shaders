#version 150 core

// In
smooth in highp vec2    texCoord;

// Uni
uniform sampler2D   uni_Texture;
uniform float       uni_HUE;
uniform float       uni_Saturation;

// Out
out vec4    out_Color;

// Function definition
vec4    hsv_to_rgb(vec4);

void    main()
{
    // Retrieve texture color
    vec4    texColor = texture2D(uni_Texture, texCoord);

    // Determine gray and rgb color
    vec4    grayMask = vec4(vec3((texColor.r + texColor.g + texColor.b) / 3.0f), 1.0f);
    vec4    colorMask = hsv_to_rgb(vec4(uni_HUE, uni_Saturation, 1.0f, 1.0f));

    // Final color
    out_Color = vec4(grayMask.rgb * colorMask.rgb, texColor.a);
}

vec4    hsv_to_rgb(vec4 hsv)
{
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(hsv.xxx + K.xyz) * 6.0 - K.www);
    return vec4(hsv.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), hsv.y), hsv[3]);
}

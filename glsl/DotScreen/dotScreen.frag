#version 150 core

// In
smooth in highp vec2    texCoord;

// Uni
uniform sampler2D   uni_Texture;
uniform float       uni_Angle;
uniform float       uni_Scale;
uniform float       uni_Saturation;
uniform vec2        uni_Center;

// Out
out vec4    out_Color;

void    main()
{
    // Retrieve color texture
    vec4    texColor = texture2D(uni_Texture, texCoord);

    // Compute gray average
    vec3    grayMask = vec3((texColor.r + texColor.g + texColor.b) / 3.0f);

    // Compute color multiplier
    float   s = sin(uni_Angle);
    float   c = cos(uni_Angle);
    vec2    dist = gl_FragCoord.xy - uni_Center;
    vec2    point = vec2(c * dist.x - s * dist.y, s * dist.x + c * dist.y) * uni_Scale;
    float   colorMult = sin(point.x) * sin(point.y) * 4.0f;

    // Compute saturation color
    vec3    satColor = mix(grayMask, texColor.rgb, uni_Saturation);

    // Final color
    out_Color = vec4(satColor * 10.0f - 5.0f + colorMult, texColor.a);
}

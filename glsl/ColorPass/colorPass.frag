#version 150 core

// In
smooth in highp vec2    texCoord;

// Uni
uniform sampler2D   uni_Texture;
uniform float       uni_HUE1;
uniform float       uni_HUE2;
uniform bool        uni_Invert;

// Out
out vec4    out_Color;

// Function definition
vec4    rgb_to_hsv(vec4);

void    main()
{
    // Retrieve color texture
    vec4    texColor = texture2D(uni_Texture, texCoord);

    // Determine HSV and gray color
    vec4    hsv = rgb_to_hsv(texColor);
    vec4    grayMask = vec4(vec3((texColor.r + texColor.g + texColor.b) / 3.0f), texColor.a);

    // Determine final color
    if (!uni_Invert && (hsv.r > uni_HUE1 && hsv.r < uni_HUE2))
        out_Color = texColor;
    else if (uni_Invert && (hsv.r < uni_HUE1 || hsv.r > uni_HUE2))
        out_Color = texColor;
    else
        out_Color = grayMask;
}

vec4    rgb_to_hsv(vec4 color)
{
    vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
    vec4 p = mix(vec4(color.bg, K.wz), vec4(color.gb, K.xy), step(color.b, color.g));
    vec4 q = mix(vec4(p.xyw, color.r), vec4(color.r, p.yzx), step(p.x, color.r));

    float d = q.x - min(q.w, q.y);
    float e = 1.0e-10;
    return vec4(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x, color[3]);
}

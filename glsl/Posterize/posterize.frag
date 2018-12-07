#version 150 core

// In
smooth in highp vec2    texCoord;

// Uni
uniform sampler2D   uni_Texture;
uniform float       uni_Gamma;
uniform float       uni_ToneRegions;

// Out
out vec4    out_Color;

void    main()
{
    vec4    color = texture2D(uni_Texture, texCoord);
    vec3    postColor = pow(color.rgb, vec3(uni_Gamma));
    postColor *= uni_ToneRegions;
    postColor = floor(postColor);
    postColor = postColor / uni_ToneRegions;
    postColor = pow(postColor, vec3(1.0f / uni_Gamma));
    out_Color = vec4(postColor, color.a);
}

#version 430 core

// In
smooth in highp vec2    texCoord;

// Uni
uniform sampler2D   uni_Texture;
uniform vec2		uni_Size;

// Out
out vec4    out_Color;

void    main()
{
    vec2    texelSize = 1.0f / uni_Size;
    vec4 tl = texture2D(uni_Texture, texCoord);
    vec4 tr = texture2D(uni_Texture, texCoord + vec2(texelSize.x, 0));
    vec4 bl = texture2D(uni_Texture, texCoord + vec2(0, texelSize.y));
    vec4 br = texture2D(uni_Texture, texCoord + texelSize);
    vec2 f = fract( texCoord.xy * uni_Size ); // get the decimal part
    vec4 tA = mix( tl, tr, f.x ); // will interpolate the red dot in the image
    vec4 tB = mix( bl, br, f.x ); // will interpolate the blue dot in the image
    out_Color = mix( tA, tB, f.y ); // will interpolate the green dot in the image
    out_Color = texture2D(uni_Texture, texCoord);
}

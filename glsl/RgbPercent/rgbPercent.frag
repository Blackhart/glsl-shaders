#version 430 core

// In
smooth in highp vec2    texCoord;

// Uni
uniform sampler2D   uni_Texture;
uniform vec3    uni_RedComp;
uniform vec3    uni_GreenComp;
uniform vec3    uni_BlueComp;

// Out
out vec4    out_Color;

void    main()
{
    vec4    lColor = texture(uni_Texture, texCoord);
    float   lRedComp = (lColor.r * uni_RedComp.r + lColor.g * uni_RedComp.g + lColor.b * uni_RedComp.b) / max(1.0f, (uni_RedComp.r + uni_RedComp.g + uni_RedComp.b));
    float   lGreenComp = (lColor.r * uni_GreenComp.r + lColor.g * uni_GreenComp.g + lColor.b * uni_GreenComp.b) / max(1.0f, (uni_GreenComp.r + uni_GreenComp.g + uni_GreenComp.b));
    float   lBlueComp = (lColor.r * uni_BlueComp.r + lColor.g * uni_BlueComp.g + lColor.b * uni_BlueComp.b) / max(1.0f, (uni_BlueComp.r + uni_BlueComp.g + uni_BlueComp.b));
    out_Color = vec4(lRedComp, lGreenComp, lBlueComp, lColor.a);
}

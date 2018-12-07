#version 420
#extension GL_ARB_gpu_shader5 : enable

#ifdef GL_ES
precision highp float;
#endif

smooth in highp vec2 texCoord;
uniform sampler2D in_source1;
uniform sampler2D in_source2;
uniform float in_split;
out vec4 glColor;

void main(void)
{
    if(texCoord.x<in_split)
        glColor = texture2D(in_source1, vec2(texCoord.x,texCoord.y));
    else
        glColor = texture2D(in_source2, vec2(texCoord.x,texCoord.y));
}


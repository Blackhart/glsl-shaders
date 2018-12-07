#version 150 core

// In
in highp vec3 in_Vertex;
in highp vec2 in_TexCoord;

// Uni
uniform highp mat4  uni_Matrix;
uniform float       uni_Scale;
uniform float       uni_Rotation;

// Out
smooth out highp vec2   texCoord;

void    main()
{
    float   scale = pow(uni_Scale, gl_InstanceID);
    float   rotation = mod(uni_Rotation * gl_InstanceID, 360.0f);
    float   c = cos(radians(rotation));
    float   s = sin(radians(rotation));
    mat4    scaleMatrix = mat4(vec4(scale, 0.0f, 0.0f, 0.0f),
                               vec4(0.0f, scale, 0.0f, 0.0f),
                               vec4(0.0f, 0.0f, 1.0f, 0.0f),
                               vec4(0.0f, 0.0f, 0.0f, 1.0f));
    mat4    rotMatrix = mat4(vec4(c, -s, 0.0f, 0.0f),
                             vec4(s, c, 0.0f, 0.0f),
                             vec4(0.0f, 0.0f, 1.0f, 0.0f),
                             vec4(0.0f, 0.0f, 0.0f, 1.0f));
    mat4    transMatrix = rotMatrix * scaleMatrix;
    texCoord = in_TexCoord;
    gl_Position = uni_Matrix * transMatrix * vec4(in_Vertex, 1.0f);
}

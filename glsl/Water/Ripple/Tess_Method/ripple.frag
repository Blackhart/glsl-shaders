#version 430 core

// In
smooth in highp vec2    texCoord;

// Uni
uniform sampler2D   uni_Texture;
uniform float       uni_Time;
uniform float       uni_Frequency;
uniform float       uni_Amplitude;
uniform float       uni_Fi;

// Out
out vec4		out_Color;

// Function Def
vec3	GetNormWave();

void main()
{
    vec3    normal = GetNormWave();

    out_Color = vec4(abs(normal), 1.0f);
}

vec3	GetNormWave()
{
    vec2    center[2] = vec2[2](vec2(0.5f, 0.5f), vec2(0.6f, 0.6f));
    vec3    lNorm = vec3(0.0f);

    for (int i = 0; i < 1; i++) // i Max == nb center
    {
        vec2    dir = (texCoord - center[i]);
        float   theta = -length(dir);
        vec2    A = max(0.0f, uni_Amplitude * (1.0f + theta)) * dir.xy * uni_Frequency;
        lNorm.xy += - (A.xy * cos(theta * uni_Frequency + uni_Time * uni_Fi));
        lNorm.z += 1.0f;
    }
    return normalize(lNorm);
}

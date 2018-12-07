#version 150 core

// In
smooth in highp vec2    texCoord;

// Uni
uniform sampler2D       uni_Albedo;
uniform vec3            uni_LightColor;
uniform vec3            uni_LightPos;
uniform float           uni_nd;
uniform float           uni_ka;

// Out
out vec4    out_Color;

void    main()
{
    vec4    albedo = texture2D(uni_Albedo, texCoord);
    vec3    N = vec3(0.0f, 0.0f, 1.0f);
    vec3    L = normalize(uni_LightPos - vec3(gl_FragCoord.xy, 0.0f));
    vec3    D = vec3(0.0f, 0.0f, -1.0f);
    vec3    ambiant = albedo.rgb * uni_ka;
    vec3    diffuse = albedo.rgb * uni_LightColor * max(dot(N, L), 0.0f);
    float   spotFactor = pow(max(dot(-L, D), 0.0f), uni_nd);
    out_Color = vec4(ambiant + spotFactor * diffuse, albedo.a);
}

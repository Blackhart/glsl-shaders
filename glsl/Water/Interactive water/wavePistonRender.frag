#version 430 core

// In
smooth in highp vec2    texCoord;
smooth in highp vec2    aroundTex[2];

// Uni
uniform sampler2D       uni_Source1;
uniform sampler2D       uni_Source2;
uniform sampler2D	uni_Source3;
uniform bool		uni_Texture2Bind;
uniform bool		uni_Texture3Bind;
uniform float		uni_Kt; // Refract coeff
uniform float           uni_Time;
uniform float           uni_DisturbanceSpeed;

// Out
out highp vec4	out_Color;

// Global
float	Kr = 1.0f - uni_Kt; // 0 ~ 1 reflect coeff

// Function Def
vec3	LaunchRay(vec3, vec3, float, float);
float	Intersect(float, float, float, float);
vec3	GetTextureColor(vec3, sampler2D);
vec3    GenDisturbance();
vec3    GetNormWave(float);

void	main()
{
    vec4	lColor = vec4(0.0f, 0.0f, 0.0f, 1.0f);
    vec3	lNewRayCenter = vec3(texCoord.st, 0.0f);
    vec3	lV = vec3(0.0f, 0.0f, 1.0f);
    vec3	lNormal = vec3(0.0f);

    // GetNormal
    vec3    lVecA = vec3(aroundTex[0], texture2D(uni_Source1, aroundTex[0]).x) - vec3(texCoord, texture2D(uni_Source1, texCoord).x);
    vec3    lVecB = vec3(aroundTex[1], texture2D(uni_Source1, aroundTex[1]).x) - vec3(texCoord, texture2D(uni_Source1, texCoord).x);
    lNormal = vec3(lVecA.y * lVecB.z - lVecA.z * lVecB.y,
                   lVecA.z * lVecB.x - lVecA.x * lVecB.z,
                   lVecA.x * lVecB.y - lVecA.y * lVecB.x);
    if (uni_DisturbanceSpeed > 0.0f)
        lNormal += GenDisturbance() / 3000.0f;
    lNormal = normalize(lNormal);

    // Reflection
    if (uni_Texture3Bind)
        lColor.rgb += Kr * GetTextureColor(LaunchRay(lNewRayCenter, reflect(lV, lNormal), 0.1f, 1.0f), uni_Source3);

    // Refraction
    if (uni_Texture2Bind)
        lColor.rgb += uni_Kt * GetTextureColor(LaunchRay(lNewRayCenter, refract(lV, lNormal, 1.0000f / 1.3330f), -0.1f, 1.0f), uni_Source2);

    out_Color = lColor;
}

vec3	GenDisturbance()
{
    // Check if texCoord.st are in ripple length
    vec2	lDirVec = texCoord.xy;
    float       lLength = (texCoord.x + texCoord.y) * 9.4f + (uni_Time * uni_DisturbanceSpeed);

    // Calcul Normal in 2D Space
    vec3	lNorm = GetNormWave(lLength);

    return lNorm;
}

vec3	GetNormWave(float pLength)
{
    pLength -= 0.01f;
    vec2	lA = vec2(pLength, sin(pLength) / 10.0f);
    pLength += 0.02f;
    vec2	lB = vec2(pLength, sin(pLength) / 10.0f);
    vec2	lVecAB = lB - lA;
    return vec3(lVecAB.y, 0.0f, -lVecAB.x);
}

vec3	LaunchRay(vec3 pRayCenter, vec3 pRayDir, float pPlanCenter, float pPlanNorm)
{
    float	lDist;

    lDist = Intersect(pRayDir.z, pRayCenter.z, pPlanCenter, pPlanNorm);
    return pRayCenter + lDist * pRayDir;
}

vec3	GetTextureColor(vec3 pNewRayCenter, sampler2D pSrc)
{
    if (pNewRayCenter.s < 0.0f)
        pNewRayCenter.s = -pNewRayCenter.s;
    if (pNewRayCenter.t < 0.0f)
        pNewRayCenter.t = -pNewRayCenter.t;
    return texture2D(pSrc, pNewRayCenter.st).rgb;
}

float	Intersect(float pRayDir, float pRayCenter, float pPlanCenter, float pPlanNorm)
{
        float	D = -(pPlanCenter * pPlanNorm);
        float	lDenominator = pPlanNorm * pRayDir;
        float	lNominator = -(pPlanNorm * pRayCenter + D);
        return lNominator * (1.0f / lDenominator);
}

#version 430 core

// In
smooth in highp vec2	texCoord;

// Uni
uniform sampler2D	uni_Source2;
uniform sampler2D	uni_Source3;
uniform bool		uni_Texture2Bind;
uniform bool		uni_Texture3Bind;
uniform float		uni_Kt; // Refract coeff
uniform float		uni_Velocity;
uniform vec2        uni_Center;

// Out
out highp vec4	out_Color;

// Global
float	Kr = 1.0f - uni_Kt; // 0 ~ 1 reflect coeff

// Function Def
vec3	LaunchRay(vec3, vec3, float, float);
float	Intersect(float, float, float, float);
vec3	GetTextureColor(vec3, sampler2D);
vec3	genWave(vec2, bool);
vec3	GetNormWave(float);

void	main()
{
    vec4	lColor = vec4(0.0f, 0.0f, 0.0f, 1.0f);
    vec3	lNewRayCenter = vec3(texCoord.st, 0.0f);
    vec3	lV = vec3(0.0f, 0.0f, 1.0f);
    vec3	lNormal = vec3(0.0f);

    // Get normal vector
    lNormal = normalize(genWave(uni_Center, true));

    // Reflection
    if (uni_Texture3Bind)
        lColor.rgb += Kr * GetTextureColor(LaunchRay(lNewRayCenter, reflect(lV, lNormal), 0.1f, 1.0f), uni_Source3);

    // Refraction
    if (uni_Texture2Bind)
        lColor.rgb += uni_Kt * GetTextureColor(LaunchRay(lNewRayCenter, refract(lV, lNormal, 1.0000f / 1.3330f), -0.1f, 1.0f), uni_Source2);

    out_Color = lColor;
}

vec3	genWave(vec2 center, bool pDisturbance)
{
    // Check if texCoord.st are in ripple length
    vec2	lDirVec = texCoord.xy - center;
    float	lLength = uni_Velocity - length(lDirVec);
    if ((lLength <= 0.0f || lLength > 0.5f) && !pDisturbance)
        return vec3(0.0f);
    else if ((lLength <= 0.0f || lLength > 0.5f) && pDisturbance)
        lLength = 29.9f + (3.1f * (uni_Velocity - length(texCoord.xy - vec2(-0.5f, 0.5f))));
    else
        lLength = (6.65f * (1.0f / 0.5f)) * lLength;

    // Calcul Angle
    float	lCos = dot(normalize(lDirVec), vec2(1.0f, 0.0f));
    float	lAngle = sign(lDirVec.y) * acos(lCos);
    float	lSin = sin(-lAngle);

    // Calcul Normal in 2D Space
    vec3	lNorm = GetNormWave(lLength);

    // Move Normal in 3D Space
    mat3x3	lRot = mat3x3(
                lCos, -lSin, 0.0f,
                lSin, lCos, 0.0f,
                0.0f, 0.0f, 1.0f);
    return lRot * lNorm;
}

vec3	GetNormWave(float pLength)
{
    pLength -= 0.01f;
    vec2	lA = vec2(pLength, sin(pLength * 4.0f) * (1.0f / (2.0 + (pLength * 3.0f))));
    pLength += 0.02f;
    vec2	lB = vec2(pLength, sin(pLength * 4.0f) * (1.0f / (2.0 + (pLength * 3.0f))));
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
    return texture2D(pSrc, mod(pNewRayCenter.st, 1.0f)).rgb;
}

float	Intersect(float pRayDir, float pRayCenter, float pPlanCenter, float pPlanNorm)
{
    float   D = -(pPlanCenter * pPlanNorm);
    float   lDenominator = pPlanNorm * pRayDir;
    float   lNominator = -(pPlanNorm * pRayCenter + D);
    return lNominator * (1.0f / lDenominator);
}

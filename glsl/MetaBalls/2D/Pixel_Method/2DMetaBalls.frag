#version 430 core

/*
  ~~~ COLOR MODE DEFINITION ~~~

  - no color:                   _NO_COLOR_MODE_
  - polygon color mode:         _POLYGON_COLOR_MODE_
  - polygon smooth color mode:  _POLYGON_SMOOTH_COLOR_MODE_
*/
#define _POLYGON_SMOOTH_COLOR_MODE_

/*
  ~~~ SURFACE MODE DEFINITION ~~~

  - plane surface:  _PLANE_SURFACE_
  - bump surface:   _BUMP_SURFACE_
*/
#define _PLANE_SURFACE_

/*
  ~~~ SMOOTH MODE DEFINITION ~~~

  - in smooth:  _IN_SMOOTH_MODE_
  - out smooth: _OUT_SMOOTH_MODE_
*/
#define _IN_SMOOTH_MODE_
#define _OUT_SMOOTH_MODE_




// Constantes
const int   MAX_BALLS = 100;

// struct
struct  ballsData
{
    vec2    center;
    vec3    color;
    float   radius;
};

// Uni
layout (std140, binding = 0) uniform uni_Balls
{
    ballsData   data[MAX_BALLS];
}   balls;

// Out
out vec4    out_Color;

// Function Definition
vec3    computeNormal(float, float, float, vec2);
vec4    getColor(vec3, float);
float   getSmoothCoeff(float);




void    main()
{
    float   lRadius;
    float   lPowRadius;
    vec2    lPowDist;
    float   lPowDistAdd;
    float   lSum = 0.0f;
    vec3    lColor = vec3(0.0f);
#ifdef _BUMP_SURFACE_
    vec3    lNormal = vec3(0.0f);
#endif
#ifdef _POLYGON_COLOR_MODE_
    float   lPowMinDist = 1000000.0f;
#endif
    for (int i = 0; i < MAX_BALLS; i++)
    {
        lRadius = balls.data[i].radius;
        lPowRadius = lRadius * lRadius;
        lPowDist = gl_FragCoord.xy - balls.data[i].center.xy;
        lPowDist *= lPowDist;
        lPowDistAdd = lPowDist.x + lPowDist.y;
        lSum += lPowRadius * 1.0f / lPowDistAdd;
#ifdef _BUMP_SURFACE_
        lNormal += computeNormal(lRadius, lPowRadius, lPowDistAdd, balls.data[i].center);
#endif
#ifdef _POLYGON_COLOR_MODE_
        if (lPowDistAdd < lPowMinDist)
        {
            lPowMinDist = lPowDistAdd;
            lColor = balls.data[i].color;
        }
#endif
#ifdef _POLYGON_SMOOTH_COLOR_MODE_
        float   lDistCoeff = 1.0f - smoothstep(0.0f, lRadius + (160 * (lRadius / 40.0f)), distance(balls.data[i].center, gl_FragCoord.xy));
        lColor += lDistCoeff * balls.data[i].color;
#endif
    }
    if (lSum > 1.0f)
        out_Color = getColor(lColor, getSmoothCoeff(lSum));
    else
        out_Color = vec4(vec3(0.0f), 1.0f);
#ifdef _BUMP_SURFACE_
    out_Color = vec4(normalize(lNormal), 1.0f);
#endif
}

vec4    getColor(vec3 pColor, float pSmoothCoeff)
{
#ifdef _NO_COLOR_MODE_
    return vec4(vec3(1.0f) * pSmoothCoeff, 1.0f);
#endif
#ifdef _POLYGON_COLOR_MODE_
    return vec4(pColor * pSmoothCoeff, 1.0f);
#endif
#ifdef _POLYGON_SMOOTH_COLOR_MODE_
    return vec4(normalize(pColor) * pSmoothCoeff, 1.0f);
#endif
}

float   getSmoothCoeff(float pSum)
{
    float   lSmoothCoeff = 1.0f;
#ifdef _IN_SMOOTH_MODE_
    lSmoothCoeff *= 1.0f - smoothstep(1.0f, 1.5f, pSum);
#endif
#ifdef _OUT_SMOOTH_MODE_
    lSmoothCoeff *= smoothstep(1.0f, 1.5f, pSum);
#endif
    return lSmoothCoeff;
}

vec3    computeNormal(float pRadius, float pPowRadius, float pPowDistAdd, vec2 pCenter)
{
    float   lDist = 1.0f - clamp(distance(pCenter, gl_FragCoord.xy) / pRadius, 0.0f, 1.0f);
    return (pPowRadius * 1.0f) / (pPowDistAdd * pPowDistAdd) * vec3(2.0f * (pCenter.x - gl_FragCoord.x), 2.0f * (pCenter.y - gl_FragCoord.y), 2.0f * sin(lDist) * pRadius);
}

#version 430 core

// In
smooth in highp vec2	texCoord;

// Uni
uniform sampler2D	uni_source1;
uniform float		uni_axisX;
uniform float		uni_axisY;
uniform float		uni_smooth;
uniform vec2		uni_center;

// Out
out vec4		out_Color;

// Function definition
float	IsInsideEllipse(float, float, float, float, float, float);
vec4	treat();

void    main(void)
{
    out_Color = treat();
}

vec4	treat()
{
    vec4    lColor = texture2D(uni_source1, texCoord);
    float   lResEllipse = 0.0f;

    if (uni_axisX == 0.0f || uni_axisY == 0.0f || lColor.a <= 0.01f)
        return vec4(0.0f);
    lResEllipse = IsInsideEllipse(gl_FragCoord.x, gl_FragCoord.y, uni_center.x, uni_center.y, uni_axisX, uni_axisY);
    if (lResEllipse <= 1.0f) // if pixel inside ellipse
        return lColor;
    else if (lResEllipse <= uni_smooth) // if pixel between 1.0f ~ in_smooth (second ellipse)
    {
        lColor[3] = smoothstep(uni_smooth, 1.0f, lResEllipse);
        return vec4(lColor.rgb * lColor[3], lColor[3]);
    }
    else
        return vec4(0.0f);
}

float	IsInsideEllipse(float pX, float pY, float pU, float pV, float pXe, float pYe)
/*
  pX: pixel position (axe X)
  pY: pixel position (axe Y)
  pU: ellipse center (axe X)
  pV: ellipse center (axe Y)
  pXe: ellipse width (axe X)
  pYe: ellipse height (axe Y)

  Ellipse equation:

  (pX - pU)^2      (pY - pV)^2
  -----------   +   -----------   = res
     pXe^2            pYe^2

  if res == 1, point on the edge
  if res < 1, point inside
  if res > 1, point outside
*/
{
    float   lF1 = pow(pX - pU, 2) / pow(pXe, 2);
    float   lF2 = pow(pY - pV, 2) / pow(pYe, 2);
    return lF1 + lF2;
}

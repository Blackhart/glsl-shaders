#version 430 core

// In
smooth in highp vec2	texCoord;
smooth in highp vec2	aroundTex[8];

// Uni
uniform sampler2D	uni_Source;
uniform float           uni_Spread;

// Out
out highp vec4		out_Color;

void	main()
{
    highp vec2	val = texture2D(uni_Source, texCoord).xy;
    highp float	val2 = 0.0f;
    highp float	speed = 0.0f;
    if (aroundTex[0].x > 0.0f && aroundTex[1].y > 0.0f)
    {
        val2 = texture2D(uni_Source, aroundTex[0]).x;
        speed += uni_Spread * (val2 - val.x);
    }
    if (aroundTex[1].y > 0.0f)
    {
        val2 = texture2D(uni_Source, aroundTex[1]).x;
        speed += uni_Spread * (val2 - val.x);
    }
    if (aroundTex[2].x < 1.0f && aroundTex[2].y > 0.0f)
    {
        val2 = texture2D(uni_Source, aroundTex[2]).x;
        speed += uni_Spread * (val2 - val.x);
    }
    if (aroundTex[3].x > 0.0f)
    {
        val2 = texture2D(uni_Source, aroundTex[3]).x;
        speed += uni_Spread * (val2 - val.x);
    }
    if (aroundTex[4].x < 1.0f)
    {
        val2 = texture2D(uni_Source, aroundTex[4]).x;
        speed += uni_Spread * (val2 - val.x);
    }
    if (aroundTex[5].x > 0.0f && aroundTex[5].y < 1.0f)
    {
        val2 = texture2D(uni_Source, aroundTex[5]).x;
        speed += uni_Spread * (val2 - val.x);
    }
    if (aroundTex[6].y < 1.0f)
    {
        val2 = texture2D(uni_Source, aroundTex[6]).x;
        speed += uni_Spread * (val2 - val.x);
    }
    if (aroundTex[7].x < 1.0f && aroundTex[7].y < 1.0f)
    {
        val2 = texture2D(uni_Source, aroundTex[7]).x;
        speed += uni_Spread * (val2 - val.x);
    }
    out_Color.x = val.x + speed;
    out_Color.y = val.y + speed;
}

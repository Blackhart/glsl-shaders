#version 430 core

// In
smooth in highp vec2	texCoord;

// Uni
uniform sampler2D	uni_MouseSource;
uniform sampler2D       uni_KinectSource;
uniform sampler2D	uni_Source2;
uniform float           uni_Tension;
uniform float           uni_Damping;

// Out
out highp vec4		out_Color;

void	main()
{
    float	lTouch = clamp(texture2D(uni_MouseSource, texCoord).s + texture2D(uni_KinectSource, texCoord).s, 0.0f, 1.0f);
    highp vec2	lData = texture2D(uni_Source2, texCoord).xy;

    highp float	speed = lData.y;
    speed += lTouch * 10.0f;

    highp float	x = 0.5f - lData.x;
    highp float	acc = uni_Tension * x - uni_Damping * speed;
    speed += acc;
    out_Color.y = speed;
    out_Color.x = lData.x + speed;
}

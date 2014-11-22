#version 430 core
#define KERNEL 10

// In
in highp vec4		in_Vertex;
in highp vec2		in_TexCoord;

// Uni
uniform highp mat4	uni_Matrix;
uniform int		uni_Type;
uniform vec2		uni_Size;

// Out
smooth out highp vec2	texCoord;
smooth out highp vec2	offsetP[KERNEL];
smooth out highp vec2	offsetN[KERNEL];

// Function def
void	HBlur();
void	VBlur();


void	main()
{
    texCoord = in_TexCoord;
    gl_Position = uni_Matrix * in_Vertex;
    if (uni_Type == 1)
        HBlur();
    else
        VBlur();
}

void	HBlur()
{
    float	lDX = 1.0f / uni_Size.x;
    for (int i = 1; i < KERNEL; i += 1)
    {
        float	x = lDX * i;
        offsetP[i] = vec2(texCoord.x + x, texCoord.y);
        offsetN[i] = vec2(texCoord.x - x, texCoord.y);
    }
}

void	VBlur()
{
    float	lDY = 1.0f / uni_Size.y;
    for (int i = 1; i < KERNEL; i += 1)
    {
        float	y = lDY * i;
        offsetP[i] = vec2(texCoord.x, texCoord.y + y);
        offsetN[i] = vec2(texCoord.x, texCoord.y - y);
    }
}

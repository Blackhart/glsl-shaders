#version 430 core

// Subroutine def
subroutine void BlurType();

// In
in highp vec4   in_Vertex;
in highp vec2   in_TexCoord;

// Uni
uniform highp mat4          uni_Matrix;
uniform vec2                uni_Size;
subroutine uniform BlurType uni_Blur;

// Out
smooth out highp vec2	offset[5];

// function def

subroutine (BlurType) void	VBlur()
{
    float   y = 1.0f / uni_Size.y;
    float   yc = 2.0f * y;
    offset[0] = vec2(in_TexCoord.x, in_TexCoord.y - yc);
    offset[1] = vec2(in_TexCoord.x, in_TexCoord.y - y);
    offset[2] = in_TexCoord;
    offset[3] = vec2(in_TexCoord.x, in_TexCoord.y + y);
    offset[4] = vec2(in_TexCoord.x, in_TexCoord.y + yc);
}

subroutine (BlurType) void	HBlur()
{
    float   x = 1.0f / uni_Size.x;
    float   xc = 2.0f * x;
    offset[0] = vec2(in_TexCoord.x - xc, in_TexCoord.y);
    offset[1] = vec2(in_TexCoord.x - x, in_TexCoord.y);
    offset[2] = in_TexCoord;
    offset[3] = vec2(in_TexCoord.x + x, in_TexCoord.y);
    offset[4] = vec2(in_TexCoord.x + xc, in_TexCoord.y);
}

void	main()
{
    gl_Position = uni_Matrix * in_Vertex;
    uni_Blur();
}

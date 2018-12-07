#version 150 core

// In
smooth in highp vec2    texCoord;
smooth in highp vec2    limit;

// Uni
uniform sampler2D   uni_Texture;
uniform vec2        uni_Grid;
uniform vec2        uni_Speed;

// Out
out vec4    out_Color;

void    main()
{
    float   horGrid = mod(floor(limit.y), 2.0f) * 2.0f - 1.0f;
    float   xGrid = limit.x + uni_Grid.x * uni_Speed.x * horGrid;
    float   vertGrid = mod(floor(xGrid), 2.0f) * 2.0f - 1.0f;
    out_Color = texture2D(uni_Texture, mod(texCoord + uni_Speed * vec2(horGrid, vertGrid), 1.0f));
}

#version 430 core

#define PI	3.141592

// Uniform
uniform vec2	SCREEN_RESOLUTION; // in pixels
uniform float	SQUARE_WIDTH; // in pixels
uniform float	LINE_WIDTH; // in pixels

// Out
out vec4	out_color;

void	main()
{
	vec2 fragCoord = gl_FragCoord.xy;

	// Center the grid into the screen
	fragCoord -= SCREEN_RESOLUTION * 0.5f;
	
	fragCoord = abs(fragCoord);
	
	// 1x1 square
	vec2 thin = fragCoord;
	thin %= SQUARE_WIDTH;
	thin = min(thin, SQUARE_WIDTH - thin);
	
	// 10x10 squares
	vec2 wide = fragCoord;
	wide %= (SQUARE_WIDTH * 10.0f);
	wide = min(wide, (SQUARE_WIDTH * 10.0f) - wide);
	
	out_color = vec4(1.0f) 
		- 0.1f * smoothstep(LINE_WIDTH, 0.0f, min(thin.x, thin.y)) // draw 1x1 square lines
		- 0.2f * smoothstep(LINE_WIDTH, 0.0f, min(wide.x, wide.y)) // draw 10x10 square lines
		- 0.3f * smoothstep(LINE_WIDTH, 0.0f, min(abs(fragCoord.x),abs(fragCoord.y))); // draw origin axis lines
}
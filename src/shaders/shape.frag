precision mediump float;

varying vec2 vTexCoord;

uniform vec3 uColor;
uniform vec2 uResolution;
uniform float uTime;
uniform vec2 uMouse;
uniform vec2 uPosition;

void main() {
  	// now because of the varying vTexCoord, we can access the current texture coordinate

	vec3 background_color = uColor * 0.5;
	vec3 fill_color = uColor * 1.5;

  	vec2 uv = vTexCoord * 0.5;

	//rotate uv dependant on position in grid
	vec2 direction = uv - uPosition;
	float rotation = atan(direction.y, direction.x);
	uv = vec2(
        cos(rotation) * (uv.x - 0.5) + sin(rotation) * (uv.y - 0.5) + 0.5,
        cos(rotation) * (uv.y - 0.5) - sin(rotation) * (uv.x - 0.5) + 0.5
    );

	//lighter dependant on position in grid
	vec3 color = mix(background_color, fill_color, uv.y);


	// circle in the center that gets larger slowly until it loops
	float circle = 0.5 * sin(uTime * 0.5);
	float distance = length(vTexCoord - vec2(0.5));
	float circle_mask = smoothstep(circle, circle + 0.5, distance);

	color = mix(fill_color, color, circle_mask);
	
  	gl_FragColor = vec4(color, 1.0);
}

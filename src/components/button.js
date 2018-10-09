class CCButton extends Component
{
	constructor(options, ctx)
	{
		options = Object.assign(
		{ 
			width: 150, 
			height: 50,
			x: 0,
			y: 0,
			z: 0,

			borderWidth: 1,
			borderColor: '#000',

			fontSize: 8,
			fontColor: '#000',

			backgroundColor: '#353b48'
		}, options);

		super(options, ctx, CanvasComponent.BUTTON);
	}

	// Component update method
	Update(dt)
	{
		
	}

	// Component draw method
	Draw()
	{
		this.ctx.fillStyle = this.options.backgroundColor;
		this.ctx.fillRect(
			this.options.x, 
			this.options.y, 
			this.options.width, 
			this.options.height
		);
	}
}
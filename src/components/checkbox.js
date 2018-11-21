/*
	CLASS: CanvasComponentCheckbox (CCCheckbox)
	DESC: Checkbox component
*/
class CCCheckbox extends Component
{
	constructor(options, ctx)
	{
		options = Object.assign(
		{ 
			width: 15, 
			height: 15,
			x: 0,
			y: 0,
			z: 0,

			borderWidth: 1,
			borderColor: '#000',

			fontSize: 8,
			fontColor: '#000',

			backgroundColor: '#FFF'
		}, options);

		super(options, ctx, CanvasComponent.CHECKBOX);
	}

	// Component update method
	Update(dt)
	{
		
	}

	// Component draw method
	Draw()
	{
		this.ctx.fillStyle = this.options.backgroundColor;
		this.ctx.strokeStyle = this.options.borderColor;
		this.ctx.lineWidth = this.options.borderWidth;

		this.ctx.rect(
			this.options.x, 
			this.options.y, 
			this.options.width, 
			this.options.height
		);

		this.ctx.fill();
		this.ctx.stroke();
	}
}
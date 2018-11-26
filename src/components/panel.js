/*
	CLASS: CanvasComponentPanel (CCPanel)
	DESC: Panel component
*/
class CCPanel extends Component
{
	constructor(options, ctx, canvas)
	{
		options = Object.assign(
		{ 
			width: 150, 
			height: 150,
			x: 0,
			y: 0,
			z: 0,

			borderWidth: 2,
			borderColor: '#000',

			fontSize: 8,
			fontColor: '#000',

			backgroundColor: '#FFF'
		}, options);

		super(options, ctx, canvas, CanvasComponent.PANEL);
	}

	// Component update method
	Update(dt)
	{
		
	}

	// Component draw method
	Draw()
	{
		var gradient = this.ctx.createLinearGradient(
			this.options.x + (this.options.width / 2), 
			this.options.y,
			this.options.x + (this.options.width / 2),
			this.options.y + this.options.height
		);

		gradient.addColorStop(0, 'rgb(244, 244, 244)');
		gradient.addColorStop(1, 'rgb(241, 241, 241');

		this.ctx.fillStyle = gradient;
		this.ctx.strokeStyle = this.options.borderColor;
		this.ctx.lineWidth = this.options.borderWidth;

		this.ctx.beginPath();

		this.ctx.rect(
			this.options.x, 
			this.options.y, 
			this.options.width, 
			this.options.height
		);

		this.ctx.closePath();
		this.ctx.fill();
		this.ctx.stroke();
	}
}
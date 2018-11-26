/*
	CLASS: CanvasComponentButton (CCButton)
	DESC: Button component
*/
class CCButton extends Component
{
	constructor(options, ctx, canvas)
	{
		options = Object.assign(
		{ 
			width: 90, 
			height: 28,
			x: 0,
			y: 0,
			z: 0,

			borderWidth: 2,
			borderColor: '#000',

			backgroundColor: '#353b48'
		}, options);

		super(options, ctx, canvas, CanvasComponent.BUTTON);

		this._componentLabel = new ComponentLabel(
		{
			x: this.options.x + (this.options.width / 2),
			y: this.options.y + (this.options.height / 2)
		}, this.ctx, this);
	}

	SetText(str)
	{
		this._componentLabel.SetText(str);
	}

	// Component update method
	Update(dt)
	{
		this._componentLabel.Update(dt);
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

		this._componentLabel.Draw();
	}
}
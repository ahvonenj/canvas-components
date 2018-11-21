/*
	CLASS: CanvasComponentButton (CCButton)
	DESC: Button component
*/
class CCButton extends Component
{
	constructor(options, ctx)
	{
		options = Object.assign(
		{ 
			width: 90, 
			height: 30,
			x: 0,
			y: 0,
			z: 0,

			borderWidth: 1,
			borderColor: '#000',

			backgroundColor: '#353b48'
		}, options);

		super(options, ctx, CanvasComponent.BUTTON);

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
		this.ctx.fillStyle = this.options.backgroundColor;
		this.ctx.fillRect(
			this.options.x, 
			this.options.y, 
			this.options.width, 
			this.options.height
		);

		this._componentLabel.Draw();
	}
}
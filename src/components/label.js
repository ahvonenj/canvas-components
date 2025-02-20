/*
	CLASS: CanvasComponentLabel (CCLabel)
	DESC: Label component
*/
class CCLabel extends Component
{
	constructor(options, ctx, canvas)
	{
		options = Object.assign(
		{ 
			width: 150, 
			height: 35,
			x: 0,
			y: 0,
			z: 0,

			borderWidth: 1,
			borderColor: '#000',

			fontSize: 16,
			fontColor: '#000',
			fontFamily: 'Arial',

			backgroundColor: '#FFF',

			padding:
			{
				top: 0,
				right: 0,
				bottom: 0,
				left: 0
			},

			margin:
			{
				top: 0,
				right: 0,
				bottom: 0,
				left: 0
			}
		}, options);

		super(options, ctx, canvas, CanvasComponent.LABEL);

		this.textContent = '';
	}

	SetText(str)
	{
		this.textContent = str;
	}

	// Component update method
	Update(dt, mouseState)
	{
		super.Update(dt, mouseState);
	}

	// Component draw method
	Draw()
	{
		this.ctx.textAlign = "start";
		this.ctx.textBaseline = "alphabetic";
		this.ctx.fillStyle = this.options.fontColor;
		this.ctx.strokeStyle = this.options.fontColor;
		this.ctx.font = `${this.options.fontSize}px ${this.options.fontFamily}`;

		this.ctx.beginPath();
		this.ctx.fillText(
			this.textContent, 
			this.relativeContext.x + this.options.x, 
			this.relativeContext.y + this.options.y
		);
		this.ctx.closePath();

		super.Draw();
	}

	// Default component event logic
	_mouseEvent(eventType, e)
	{
		super._mouseEvent(eventType, e);
	}
}
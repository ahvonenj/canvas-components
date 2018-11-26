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

			backgroundColor: '#FFF'
		}, options);

		super(options, ctx, canvas, CanvasComponent.LABEL);

		this.textContent = '';
	}

	SetText(str)
	{
		this.textContent = str;
	}

	// Component update method
	Update(dt)
	{
		
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
		this.ctx.fillText(this.textContent, this.options.x, this.options.y);
		this.ctx.closePath();
	}

	// Default component event logic
	_mouseEvent(eventType, e)
	{
		super._mouseEvent(eventType, e);
	}
}
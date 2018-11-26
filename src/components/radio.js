/*
	CLASS: CanvasComponentRadioButton (CCRadioButton)
	DESC: Radio button component
*/
class CCRadioButton extends Component
{
	constructor(options, ctx, canvas)
	{
		options = Object.assign(
		{ 
			x: 0,
			y: 0,
			z: 0,
			radius: 8,

			borderWidth: 2,
			borderColor: '#000',

			fontSize: 8,
			fontColor: '#000',

			backgroundColor: '#FFF'
		}, options);

		super(options, ctx, canvas, CanvasComponent.RADIO);
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

		this.ctx.beginPath();

		this.ctx.arc(this.options.x, this.options.y, this.options.radius, 0, 2 * Math.PI);

		this.ctx.closePath();
		this.ctx.fill();
		this.ctx.stroke();	
	}

	// Default component event logic
	_mouseEvent(eventType, e)
	{
		switch(eventType)
		{
			case ComponentEvent.MOUSE_OVER:
				document.body.style.cursor = 'pointer';
				break;

			case ComponentEvent.MOUSE_OUT:
				document.body.style.cursor = 'default';
				break;

			default:
				break;
		}

		super._mouseEvent(eventType, e);
	}
}
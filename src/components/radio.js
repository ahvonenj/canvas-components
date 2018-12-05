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

			backgroundColor: '#FFF',
			checkColor: '#000'
		}, options);

		super(options, ctx, canvas, CanvasComponent.RADIO);

		this.group = 0;
		this.state = false;
	}

	SetGroup(group)
	{
		this.group = group || null;
	}

	GetGroup()
	{
		return this.group;
	}

	SetState(state)
	{
		this.state = state || false;
	}

	SwitchState()
	{
		this.state = !this.state;
	}

	GetState()
	{
		return this.state;
	}

	// Component update method
	Update(dt, mouseState)
	{
		super.Update(dt, mouseState);
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

		if(this.state)
		{
			this.ctx.fillStyle = this.options.checkColor;
			this.ctx.strokeStyle = this.options.checkColor;
			this.ctx.lineWidth = this.options.borderWidth;

			this.ctx.beginPath();

			this.ctx.arc(this.options.x, this.options.y, this.options.radius / 3, 0, 2 * Math.PI);

			this.ctx.closePath();
			this.ctx.fill();
			this.ctx.stroke();
		}

		super.Draw();
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

			case ComponentEvent.CLICK:
				this.SwitchState();
				break;

			default:
				break;
		}

		super._mouseEvent(eventType, e);
	}
}
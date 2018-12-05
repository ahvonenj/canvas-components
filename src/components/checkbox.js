/*
	CLASS: CanvasComponentCheckbox (CCCheckbox)
	DESC: Checkbox component
*/
class CCCheckbox extends Component
{
	constructor(options, ctx, canvas)
	{
		options = Object.assign(
		{ 
			width: 15, 
			height: 15,
			x: 0,
			y: 0,
			z: 0,

			borderWidth: 2,
			borderColor: '#000000',

			fontSize: 8,
			fontColor: '#000',

			backgroundColor: '#FFF',
			checkColor: '#000',

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

		super(options, ctx, canvas, CanvasComponent.CHECKBOX);

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

		this.ctx.rect(
			this.options.x, 
			this.options.y, 
			this.options.width, 
			this.options.height
		);

		this.ctx.closePath();
		this.ctx.fill();
		this.ctx.stroke();

		if(this.state)
		{
			this.ctx.fillStyle = this.options.checkColor;
			this.ctx.strokeStyle = this.options.checkColor;
			this.ctx.lineWidth = this.options.borderWidth;

			this.ctx.beginPath();

			var checkWidth = this.options.width / 2;
			var checkHeight = this.options.height / 2;

			this.ctx.rect(
				this.options.x + checkWidth / 2, 
				this.options.y + checkHeight / 2, 
				checkWidth, 
				checkHeight
			);

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
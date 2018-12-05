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

			backgroundColor: null,

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

		super(options, ctx, canvas, CanvasComponent.BUTTON);

		// Default gradient shading
		if(this.options.backgroundColor === null)
		{
			var gradient = this.ctx.createLinearGradient(
				this.options.x + (this.options.width / 2), 
				this.options.y,
				this.options.x + (this.options.width / 2),
				this.options.y + this.options.height
			);

			gradient.addColorStop(0, 'rgb(244, 244, 244)');
			gradient.addColorStop(1, 'rgb(241, 241, 241');

			this.options.backgroundColor = gradient;
		}

		// Instantiate the text of the button as a ComponentLabel
		this._componentLabel = new ComponentLabel(
		{
			x: this.options.x + (this.options.width / 2),
			y: this.options.y + (this.options.height / 2)
		}, this.ctx);
	}

	// Set button text
	SetText(str)
	{
		this._componentLabel.SetText(str);
	}

	// Get button text
	GetText()
	{
		return this._componentLabel.GetText();
	}

	// Component update method
	Update(dt, mouseState)
	{
		this._componentLabel.Update(dt, mouseState, this.options);
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

		this._componentLabel.Draw();
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

			default:
				break;
		}

		super._mouseEvent(eventType, e);
	}
}
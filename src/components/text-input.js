/*
	CLASS: CanvasComponentTextInput (CCTextInput)
	DESC: Text input component
*/
class CCTextInput extends Component
{
	constructor(options, ctx, canvas)
	{
		options = Object.assign(
		{ 
			width: 150, 
			height: 21,
			x: 0,
			y: 0,
			z: 0,

			borderWidth: 2,
			borderColor: '#000',

			backgroundColor: '#FFF',

			padding:
			{
				top: 0,
				right: 0,
				bottom: 0,
				left: 5
			},

			margin:
			{
				top: 0,
				right: 0,
				bottom: 0,
				left: 0
			}
		}, options);

		super(options, ctx, canvas, CanvasComponent.TEXT_INPUT);

		this._componentText = new ComponentEditableText(
		{
			x: this.options.x,
			y: this.options.y + (this.options.height / 2)
		}, this.ctx);
	}

	// Set text input value
	SetValue(str)
	{
		this._componentText.SetValue(str);
	}

	// Get text input value
	GetValue()
	{
		return this._componentText.GetValue();
	}

	// Component update method
	Update(dt, mouseState)
	{
		this._componentText.Update(dt, mouseState, this.options);
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

		this._componentText.Draw(this.options);
		super.Draw();
	}

	// Default component event logic
	_mouseEvent(eventType, e)
	{
		switch(eventType)
		{
			case ComponentEvent.MOUSE_OVER:
				document.body.style.cursor = 'text';
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
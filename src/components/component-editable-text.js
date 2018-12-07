/*
	CLASS: ComponentLabel
	DESC: Meta label component
*/
class ComponentEditableText extends Component
{
	constructor(options, ctx, canvas, parentComponent)
	{
		options = Object.assign(
		{ 
			x: 0,
			y: 0,
			z: 0,

			fontSize: 12,
			fontColor: '#000',
			fontFamily: 'Arial'
		}, options);

		super(options, ctx, canvas, CanvasComponent.COMPONENT_EDITABLE_TEXT);

		this.value = '';
	}

	// Set editable text value
	SetValue(str)
	{
		this.value = str;
	}

	// Get editable text value
	GetValue()
	{
		return this.value;
	}

	// Component update method
	Update(dt, mouseState, parentOptions)
	{
		//super.Update(dt, mouseState);
		this.options.x = parentOptions.x;
		this.options.y = parentOptions.y + (parentOptions.height / 2);
	}

	// Component draw method
	Draw(parentOptions)
	{
		parentOptions = parentOptions || { padding: { left: 0 } };

		this.ctx.textAlign = "start";
		this.ctx.textBaseline = "middle";
		this.ctx.fillStyle = this.options.fontColor;
		this.ctx.strokeStyle = this.options.fontColor;
		this.ctx.font = `${this.options.fontSize}px ${this.options.fontFamily}`;

		this.ctx.beginPath();
		this.ctx.fillText(
			this.value, 
			this.relativeContext.x + this.options.x + parentOptions.padding.left, 
			this.relativeContext.y + this.options.y
		);
		this.ctx.closePath();

		super.Draw();
	}
}
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

		if(CCUtil.IsUndefinedNullOrEmpty(parentComponent))
			CCUtil.Log(`Parent component could not be inherited for ComponentEditableText#${this.id}`);

		this.parentComponent = parentComponent;
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
	Update(dt)
	{
		
	}

	// Component draw method
	Draw()
	{
		this.ctx.textAlign = "start";
		this.ctx.textBaseline = "middle";
		this.ctx.fillStyle = this.options.fontColor;
		this.ctx.strokeStyle = this.options.fontColor;
		this.ctx.font = `${this.options.fontSize}px ${this.options.fontFamily}`;

		this.ctx.beginPath();
		this.ctx.fillText(this.value, this.options.x, this.options.y);
		this.ctx.closePath();
	}
}
/*
	CLASS: ComponentLabel
	DESC: Meta label component
*/
class ComponentLabel extends Component
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

		super(options, ctx, canvas, CanvasComponent.COMPONENT_LABEL);

		/*if(CCUtil.IsUndefinedNullOrEmpty(parentComponent))
			CCUtil.Log(`Parent component could not be inherited for ComponentLabel#${this.id}`);

		this.parentComponent = parentComponent;*/
		this.textContent = '';
	}

	// Set component label text
	SetText(str)
	{
		this.textContent = str;
	}

	// Get component label text
	GetText()
	{
		return this.textContent;
	}

	// Component update method
	Update(dt, mouseState)
	{
		//super.Update(dt, mouseState);
	}

	// Component draw method
	Draw()
	{
		this.ctx.textAlign = "center";
		this.ctx.textBaseline = "middle";
		this.ctx.fillStyle = this.options.fontColor;
		this.ctx.strokeStyle = this.options.fontColor;
		this.ctx.font = `${this.options.fontSize}px ${this.options.fontFamily}`;

		this.ctx.beginPath();
		this.ctx.fillText(this.textContent, this.options.x, this.options.y);
		this.ctx.closePath();

		super.Draw();
	}
}
/*
	CLASS: ComponentLabel
	DESC: Meta label component
*/
class ComponentLabel extends Component
{
	constructor(options, ctx, parentComponent)
	{
		options = Object.assign(
		{ 
			x: 0,
			y: 0,
			z: 0,

			fontSize: 12,
			fontColor: '#FFF',
			fontFamily: 'Arial'
		}, options);

		super(options, ctx, CanvasComponent.COMPONENT_LABEL);

		if(CCUtil.IsUndefinedNullOrEmpty(parentComponent))
			console.error(`Parent component could not be inherited for ComponentLabel#${this.id}`);

		this.parentComponent = parentComponent;
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
		this.ctx.textAlign = "center";
		this.ctx.textBaseline = "middle";
		this.ctx.fillStyle = this.options.fontColor;
		this.ctx.font = `${this.options.fontSize}px ${this.options.fontFamily}`;

		this.ctx.fillText(this.textContent, this.options.x, this.options.y);
	}
}
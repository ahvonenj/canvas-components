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
			fontFamily: 'Arial',

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
	Update(dt, mouseState, parentOptions)
	{
		//super.Update(dt, mouseState);
		this.options.x = parentOptions.x + (parentOptions.width / 2),
		this.options.y = parentOptions.y + (parentOptions.height / 2)
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
		this.ctx.fillText(
			this.textContent, 
			this.relativeContext.x + this.options.x, 
			this.relativeContext.y + this.options.y
		);
		this.ctx.closePath();

		super.Draw();
	}
}
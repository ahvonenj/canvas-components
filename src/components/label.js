/*
	CLASS: CanvasComponentLabel (CCLabel)
	DESC: Label component
*/
class CCLabel extends Component
{
	constructor(options, ctx)
	{
		options = Object.assign(
		{ 
			width: 150, 
			height: 35,
			x: 0,
			y: 0,
			z: 0,

			borderWidth: 0,
			borderColor: '#000',

			fontSize: 12,
			fontColor: '#000',
			fontFamily: 'Arial',

			backgroundColor: '#FFF'
		}, options);

		super(options, ctx, CanvasComponent.LABEL);

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
		this.ctx.fillStyle = this.options.fontColor;
		this.ctx.font = `${this.options.fontSize}px ${this.options.fontFamily}`;

		this.ctx.fillText(this.textContent, this.options.x, this.options.y);
	}
}
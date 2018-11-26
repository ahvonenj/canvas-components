/*
	CLASS: CanvasComponentLabel (CCLabel)
	DESC: Label component
*/
class CCLabel extends Component
{
	constructor(options, ctx, canvas)
	{
		options = Object.assign(
		{ 
			width: 150, 
			height: 35,
			x: 0,
			y: 0,
			z: 0,

			borderWidth: 1,
			borderColor: '#000',

			fontSize: 16,
			fontColor: '#000',
			fontFamily: 'Arial',

			backgroundColor: '#FFF'
		}, options);

		super(options, ctx, canvas, CanvasComponent.LABEL);

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
		this.ctx.textAlign = "start";
		this.ctx.textBaseline = "alphabetic";
		this.ctx.fillStyle = this.options.fontColor;
		this.ctx.strokeStyle = this.options.fontColor;
		this.ctx.font = `${this.options.fontSize}px ${this.options.fontFamily}`;

		this.ctx.beginPath();
		this.ctx.fillText(this.textContent, this.options.x, this.options.y);
		this.ctx.closePath();

		/*this.ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
		this.ctx.strokeStyle = this.options.borderColor;
		this.ctx.lineWidth = this.options.borderWidth;

		var t = this._getBoundingBox();
		this.ctx.beginPath();

		this.ctx.rect(
			t.x, 
			t.y, 
			t.w, 
			t.h
		);

		this.ctx.closePath();
		this.ctx.stroke();*/
	}
}
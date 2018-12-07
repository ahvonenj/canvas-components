/*
	CLASS: CanvasComponentPanel (CCPanel)
	DESC: Panel component
*/
class CCPanel extends Component
{
	constructor(options, ctx, canvas)
	{
		options = Object.assign(
		{ 
			width: 300, 
			height: 350,
			x: 0,
			y: 0,
			z: 0,

			borderWidth: 2,
			borderColor: '#000',

			fontSize: 8,
			fontColor: '#000',

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

		super(options, ctx, canvas, CanvasComponent.PANEL);

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

		this.componentCollection = new CanvasComponentCollection();
	}

	AttachComponent(component)
	{
		if(this.componentCollection.AddComponent(component))
			return component;
		else
			return null;
	}

	DetachComponent(component)
	{
		return this.componentCollection.RemoveComponent(component);
	}

	// Component update method
	Update(dt, mouseState)
	{
		for(var i = 0; i < this.componentCollection.orderedCollection.length; i++)
		{
			this.componentCollection.orderedCollection[i].Update();
		}

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
			this.relativeContext.x + this.options.x, 
			this.relativeContext.y + this.options.y, 
			this.options.width, 
			this.options.height
		);

		this.ctx.closePath();
		this.ctx.fill();
		this.ctx.stroke();

		// This might work later for overflow / scrolling
		this.ctx.save();
		this.ctx.clip();

		for(var i = 0; i < this.componentCollection.orderedCollection.length; i++)
		{
			this.componentCollection.orderedCollection[i].SetRelativeContext(
			{
				x: this.options.x,
				y: this.options.y
			});

			this.componentCollection.orderedCollection[i].Draw();

			this.componentCollection.orderedCollection[i].RestoreRelativeContext();
		}

		this.ctx.restore();

		super.Draw();
	}

	// Default component event logic
	_mouseEvent(eventType, e)
	{
		super._mouseEvent(eventType, e);
	}
}
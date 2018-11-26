// Component superclass for all Canvas Components
class Component
{
	constructor(options, ctx, canvas, componentType)
	{
		// Generate unique id for the component
		this.id = CCUtil.UUID();

		// Log error if canvas context is not given
		if(CCUtil.IsUndefinedNullOrEmpty(ctx))
			console.error('Component: Canvas context is undefined or null!');

		this.ctx = ctx;
		this.canvas = canvas;
		this.ComponentType = componentType || null;
		this.options = options;

		if(this.ComponentType >= 1000)
			this.isMetaComponent = true;
		else
			this.isMetaComponent = false;

		this.mouseEvents = { };

		CCUtil.Log(`Created component with type ${this.ComponentType}`);
	}

	on(eventType, callback)
	{
		if(ComponentEvents.indexOf(eventType) === -1)
		{
			console.error(`Unsupported event '${eventType}' for component`);
			return;
		}

		this.mouseEvents[eventType] = callback.bind(this);
	}

	_mouseEvent(eventType, e)
	{
		if(typeof this.mouseEvents[eventType] !== 'undefined' &&
		   typeof this.mouseEvents[eventType] !== null)
		{
			this.mouseEvents[eventType](e);
		}
	}

	_getBoundingBox()
	{
		if(this.ComponentType === CanvasComponent.RADIO)
		{
			var x = this.options.x - this.options.radius;
			var y = this.options.y - this.options.radius;
			var w = this.options.radius * 2;
			var h = this.options.radius * 2;
		}
		else if(this.ComponentType === CanvasComponent.LABEL)
		{
			// WARNING: HUGE HACK
			// https://stackoverflow.com/questions/1134586/how-can-you-find-the-height-of-text-on-an-html-canvas
			// https://stackoverflow.com/questions/14836350/how-to-get-the-bounding-box-of-a-text-using-html5-canvas
			// https://galactic.ink/journal/2011/01/html5-typographic-metrics/#bboxUnicode
			this.ctx.textAlign = "start";
			this.ctx.textBaseline = "alphabetic";
			this.ctx.fillStyle = this.options.fontColor;
			this.ctx.strokeStyle = this.options.fontColor;
			this.ctx.font = `${this.options.fontSize}px ${this.options.fontFamily}`;

			var w = this.ctx.measureText(this.textContent).width;
			var h = this.ctx.measureText('M').width;
			var x = this.options.x;
			var y = this.options.y - h;	
		}
		else
		{
			var x = this.options.x;
			var y = this.options.y;
			var w = this.options.width;
			var h = this.options.height;
		}

		return { x: x, y: y, w: w, h: h };
	}

	// Component destroy method
	Destroy()
	{
		
	}
}
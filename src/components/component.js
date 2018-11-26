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

		// Events related attributes
		this.hasFocus = false;
		this.isMouseOver = false;

		// Custom events bound to the component
		this.mouseEvents = { };

		CCUtil.Log(`Created component with type ${this.ComponentType}`);
	}

	// Used to bind custom events to components. Does not override default event behaviour by default.
	on(eventType, callback)
	{
		if(Object.values(ComponentEvent).indexOf(eventType) === -1)
		{
			console.error(`Unsupported event '${eventType}' for component`);
			return;
		}

		this.mouseEvents[eventType] = callback.bind(this);
	}

	// Used to unbind custom events to components.
	off(eventType, callback)
	{
		if(typeof this.mouseEvents[eventType] !== 'undefined')
			this.mouseEvents[eventType] = null;
	}

	// Default component event logic
	_mouseEvent(eventType, e)
	{
		switch(eventType)
		{
			case ComponentEvent.CLICK:
				this.hasFocus = true;
				break;

			case ComponentEvent.MOUSE_OVER:
				this.isMouseOver = true;
				break;

			case ComponentEvent.MOUSE_OUT:
				this.isMouseOver = false;
				break;

			default:
				break;
		}

		if(typeof this.mouseEvents[eventType] !== 'undefined' &&
		   typeof this.mouseEvents[eventType] !== null)
		{
			this.mouseEvents[eventType](e);
		}
	}

	// Returns the 2D bounding box of the component
	_getBoundingBox()
	{
		// Radio button is circular, so calculate x, y, w, h from radius
		if(this.ComponentType === CanvasComponent.RADIO)
		{
			var x = this.options.x - this.options.radius;
			var y = this.options.y - this.options.radius;
			var w = this.options.radius * 2;
			var h = this.options.radius * 2;
		}
		else if(this.ComponentType === CanvasComponent.LABEL)
		{
			// WARNING: HUGE HACK (Canvas text bounding box not easy, this gives decent estimate)
			// https://stackoverflow.com/questions/1134586/how-can-you-find-the-height-of-text-on-an-html-canvas
			// https://stackoverflow.com/questions/14836350/how-to-get-the-bounding-box-of-a-text-using-html5-canvas
			// https://galactic.ink/journal/2011/01/html5-typographic-metrics/#bboxUnicode
			this.ctx.textAlign = "start";
			this.ctx.textBaseline = "alphabetic";
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

	// Debug method. Draws a magenta bounding box border around a component when it has focus
	_drawFocus()
	{
		if(!this.hasFocus)
			return;

		this.ctx.strokeStyle = 'magenta';
		this.ctx.fillStyle = 'magenta';
		this.ctx.lineWidth = 2;

		var bb = this._getBoundingBox();

		this.ctx.beginPath();

		this.ctx.rect(
			bb.x - 3, 
			bb.y - 3, 
			bb.w + 6, 
			bb.h + 6
		);

		this.ctx.closePath();
		this.ctx.stroke();
	}

	// Component destroy method
	Destroy()
	{
		
	}
}
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
		if(typeof this.options.radius !== 'undefined')
		{
			var x = this.options.x - this.options.radius;
			var y = this.options.y - this.options.radius;
			var w = this.options.radius * 2;
			var h = this.options.radius * 2;
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
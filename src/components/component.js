// Component superclass for all Canvas Components
class Component
{
	constructor(options, ctx, componentType)
	{
		// Generate unique id for the component
		this.id = CCUtil.UUID();

		// Log error if canvas context is not given
		if(CCUtil.IsUndefinedNullOrEmpty(ctx))
			console.error('Component: Canvas context is undefined or null!');

		this.ctx = ctx;
		this.ComponentType = componentType || null;
		this.options = options;

		if(this.ComponentType >= 1000)
			this.isMetaComponent = true;
		else
			this.isMetaComponent = false;

		CCUtil.Log(`Created component with type ${this.ComponentType}`);
	}

	// Component update method
	/*Update(dt)
	{

	}

	// Component draw method
	Draw(dt)
	{

	}*/

	// Component destroy method
	Destroy()
	{
		
	}
}
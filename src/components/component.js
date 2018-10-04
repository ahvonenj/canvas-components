class Component
{
	constructor(options, ctx, componentType)
	{
		this.id = CCUtil.UUID();

		if(CCUtil.IsUndefinedNullOrEmpty(ctx))
			console.error('Component: Canvas context is undefined or null!');

		this.ctx = ctx;
		this.ComponentType = componentType || null;
		this.options = options;

		CCUtil.Log(`Created component with type ${this.ComponentType}`);
	}

	Update(dt)
	{

	}

	Draw(dt)
	{

	}
}
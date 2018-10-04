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
	}

	Update(dt)
	{

	}

	Draw(dt)
	{

	}
}
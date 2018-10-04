class Component
{
	constructor(options, ctx, componentType)
	{
		this.id = CCUtil.UUID();

		if(CCUtil.IsUndefinedNullOrEmpty(ctx))
			console.error('Component: Canvas context is undefined or null!');

		this.ctx = ctx;
		this.ComponentType = componentType || null;

		if(CCUtil.IsUndefinedNullOrEmpty(options))
		{
			this.options =
			{

			};
		}
		else
		{
			this.options = options;
		}
	}

	Update(dt)
	{

	}

	Draw(dt)
	{

	}
}
function CanvasComponent(options)
{
	this.id = CCUtil.UUID();

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
function ComponentCanvas(canvasselector)
{
	if(CanvasComponentsUtil.IsUndefinedNullOrEmpty(canvasselector))
	{
		console.error('ComponentCanvas: Invalid selector ' + canvasselector);
		return;
	}

	this.canvasselector = canvasselector;

	if(document.querySelector(this.canvasselector) === null)
	{
		console.error('ComponentCanvas: Could not get canvas ' + this.canvasselector);
		return;
	}

	this.canvas = document.querySelector(this.canvasselector);
	this.ctx = this.canvas.getContext('2d');

	this.CanvasComponentCollection = new CanvasComponentCollection();
}

ComponentCanvas.prototype.CreateComponent = function(component)
{
	switch(component)
	{
		case CanvasComponent.BUTTON:

			break;

		case CanvasComponent.CHECKBOX:

			break;

		case CanvasComponent.PANEL:

			break;

		case CanvasComponent.RADIO:

			break;

		case CanvasComponent.TEXT_INPUT:

			break;

		case CanvasComponent.LABEL:

			break;

		default:
			break;
	}
}

ComponentCanvas.prototype.AddComponent = function()
{
	
}

ComponentCanvas.prototype.RemoveComponent = function()
{
	
}

ComponentCanvas.prototype.GetComponent = function()
{
	
}

ComponentCanvas.prototype.Draw = function(dt)
{
	
}

ComponentCanvas.prototype.Update = function(dt)
{
	
}
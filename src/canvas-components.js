function ComponentCanvas(canvasselector)
{
	if(CanvasComponentsUtil.IsUndefinedNullOrEmpty(canvasselector))
	{
		console.error('ComponentCanvas: Could not get canvas ' + canvasselector);
		return;
	}

	this.canvasid = canvasid;
	this.canvas = document.querySelector(canvasselector);
	this.ctx = this.canvas.getContext('2d');
}

ComponentCanvas.prototype.CreateComponent = function(component)
{

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
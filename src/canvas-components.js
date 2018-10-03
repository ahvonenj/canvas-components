function ComponentCanvas(canvasselector)
{
	if(CCUtil.IsUndefinedNullOrEmpty(canvasselector))
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

ComponentCanvas.prototype.CreateComponent = function(componentType, options)
{
	var component = null;

	switch(componentType)
	{
		case CanvasComponent.BUTTON:
			component = new CCButton(options);
			break;

		case CanvasComponent.CHECKBOX:
			component = new CCCheckbox(options);
			break;

		case CanvasComponent.PANEL:
			component = new CCPanel(options);
			break;

		case CanvasComponent.RADIO:
			component = new CCRadioButton(options);
			break;

		case CanvasComponent.TEXT_INPUT:
			component = new CCTextInput(options);
			break;

		case CanvasComponent.LABEL:
			component = new CCLabel(options);
			break;

		default:
			CCUtil.Log('CreateComponent: Component creation failed');
			break;
	}

	return this.AddComponent(component);
}

ComponentCanvas.prototype.AddComponent = function(component)
{
	if(!CCUtil.IsUndefinedNullOrEmpty(component))
	{
		this.CanvasComponentCollection.AddComponent(component);
		return component;
	}

	return null;
}

ComponentCanvas.prototype.RemoveComponent = function(component)
{
	return this.CanvasComponentCollection.RemoveComponent(component);
}

ComponentCanvas.prototype.FindComponent = function(component)
{
	return this.CanvasComponentCollection.FindComponent(component);
}

ComponentCanvas.prototype.FindComponentById = function(id)
{
	return this.CanvasComponentCollection.FindComponentById(component);
}

ComponentCanvas.prototype.Draw = function(dt)
{
	
}

ComponentCanvas.prototype.Update = function(dt)
{
	
}
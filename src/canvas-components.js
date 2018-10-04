// Main class for Canvas Components
class ComponentCanvas
{
	constructor(canvasselector)
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

		// Instantiate CanvasComponentCollection to hold the components in
		this.CanvasComponentCollection = new CanvasComponentCollection();
	}

	// Main component creation method
	CreateComponent(componentType, options)
	{
		var component = null;

		switch(componentType)
		{
			case CanvasComponent.BUTTON:
				component = new CCButton(options, this.ctx);
				break;

			case CanvasComponent.CHECKBOX:
				component = new CCCheckbox(options, this.ctx);
				break;

			case CanvasComponent.PANEL:
				component = new CCPanel(options, this.ctx);
				break;

			case CanvasComponent.RADIO:
				component = new CCRadioButton(options, this.ctx);
				break;

			case CanvasComponent.TEXT_INPUT:
				component = new CCTextInput(options, this.ctx);
				break;

			case CanvasComponent.LABEL:
				component = new CCLabel(options, this.ctx);
				break;

			case CanvasComponent.RANGE_SLIDER:
				component = new CCRangeSlider(options, this.ctx);
				break;

			case CanvasComponent.PROGRESS_BAR:
				component = new CCProgressBar(options, this.ctx);
				break;

			default:
				CCUtil.Log('CreateComponent: Component creation failed');
				break;
		}

		// Returns true or false
		return this.AddComponent(component);
	}

	// Higher level method to add component into the CanvasComponentCollection
	AddComponent(component)
	{
		if(this.CanvasComponentCollection.AddComponent(component))
			return true;
		else
			return false;
	}

	// Higher level method to remove component from the CanvasComponentCollection
	RemoveComponent(component)
	{
		return this.CanvasComponentCollection.RemoveComponent(component);
	}

	// Higher level method to find a component from the CanvasComponentCollection
	FindComponent(component)
	{
		return this.CanvasComponentCollection.FindComponent(component);
	}

	// Higher level method to find a component by unique id from the CanvasComponentCollection
	FindComponentById(id)
	{
		return this.CanvasComponentCollection.FindComponentById(component);
	}

	// Main component draw method and loop
	Draw(dt)
	{
		for(var component in this.CanvasComponentCollection.collection)
		{
			if(!this.CanvasComponentCollection.collection.hasOwnProperty(component))
				continue;

			this.CanvasComponentCollection.collection[component].Draw(dt);
		}
	}

	// Main component update method and loop
	Update(dt)
	{
		
	}
}
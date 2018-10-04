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

		this.CanvasComponentCollection = new CanvasComponentCollection();
	}

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

		return this.AddComponent(component);
	}

	AddComponent(component)
	{
		if(this.CanvasComponentCollection.AddComponent(component))
			return true;
		else
			return false;
	}

	RemoveComponent(component)
	{
		return this.CanvasComponentCollection.RemoveComponent(component);
	}

	FindComponent(component)
	{
		return this.CanvasComponentCollection.FindComponent(component);
	}

	FindComponentById(id)
	{
		return this.CanvasComponentCollection.FindComponentById(component);
	}

	Draw(dt)
	{
		for(var component in this.CanvasComponentCollection.collection)
		{
			if(!this.CanvasComponentCollection.collection.hasOwnProperty(component))
				continue;

			this.CanvasComponentCollection.collection[component].Draw(dt);
		}
	}

	Update(dt)
	{
		
	}
}
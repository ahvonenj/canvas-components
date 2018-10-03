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

		console.log(component)
		console.log(new CCButton(options))

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
		
	}

	Update(dt)
	{
		
	}
}
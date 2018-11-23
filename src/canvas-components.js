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
		this.canvasWidth = this.canvas.width;
		this.canvasHeight = this.canvas.height;

		// Instantiate CanvasComponentCollection to hold the components in
		this.CanvasComponentCollection = new CanvasComponentCollection();

		// Main update and draw loop timing setup
		this.t = 
		{
			now: null,
			acc: 0,
			dt: 0.01,
			last: 0,
			step: 1/60,
			time: 0,
			ft: 0
		}

		// Start main update and draw loop
		this.Loop();
	}

	// Main component creation method
	CreateComponent(componentType, options)
	{
		var component = null;

		// Meta component, skip
		if(componentType >= 1000)
		{
			CCUtil.Log(`CreateComponent: Trying to instantiate Meta Component, ignoring`);
			return false;
		}

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
				CCUtil.Log(`CreateComponent: Component creation failed (${componentType})`);
				break;
		}

		// Returns the component or false
		return this.AddComponent(component);
	}

	// Higher level method to add component into the CanvasComponentCollection
	AddComponent(component)
	{
		if(this.CanvasComponentCollection.AddComponent(component))
			return component;
		else
			return null;
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

	GetContext()
	{
		return this.ctx;
	}

	Loop()
	{
		this.t.now = CCUtil.Timestamp();
		this.t.ft = this.t.now - this.t.last;

		if(this.t.ft > 0.25)
			this.t.ft = 0.25;

		this.t.last = this.t.now; 
		this.t.acc += this.t.ft;

		while(this.t.acc >= this.t.dt) 
		{
			this.Update(this.t.dt);
			
			this.t.time += this.t.dt;
			this.t.acc -= this.t.dt;
		}

		this.Draw();
		requestAnimationFrame(function() { this.Loop(); }.bind(this));
	}

	// Main component draw method and loop
	Draw()
	{
		this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

		for(var component in this.CanvasComponentCollection.collection)
		{
			if(!this.CanvasComponentCollection.collection.hasOwnProperty(component))
				continue;

			this.CanvasComponentCollection.collection[component].Draw();
		}
	}

	// Main component update method and loop
	Update(dt)
	{
		for(var component in this.CanvasComponentCollection.collection)
		{
			if(!this.CanvasComponentCollection.collection.hasOwnProperty(component))
				continue;

			this.CanvasComponentCollection.collection[component].Update(dt);
		}
	}
}
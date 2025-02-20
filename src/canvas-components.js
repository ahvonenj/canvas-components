// Main class for Canvas Components
class ComponentCanvas
{
	constructor(canvasselector, stats)
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

		//Fps counter
		this.stats = stats || null;

		// Canvas attributes
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

		// Bind all the native event listeners and screw them up later with cool custom things
		this.canvas.addEventListener('click', this.e_onClick.bind(this));
		this.canvas.addEventListener('dblclick', this.e_onDblClick.bind(this));
		this.canvas.addEventListener('mousedown', this.e_mouseDown.bind(this));
		this.canvas.addEventListener('mouseup', this.e_mouseUp.bind(this));
		this.canvas.addEventListener('mouseenter', this.e_mouseEnter.bind(this));
		this.canvas.addEventListener('mouseleave', this.e_mouseLeave.bind(this));
		this.canvas.addEventListener('mouseover', this.e_mouseOver.bind(this));
		this.canvas.addEventListener('mouseout', this.e_mouseOut.bind(this));
		this.canvas.addEventListener('mousemove', this.e_mouseMove.bind(this));
		this.canvas.addEventListener('scroll', this.e_mouseScroll.bind(this));

		// Event related attributes
		this.mouseState = 
		{
			lx: -99999,		// Mouse last x
			ly: -99999,		// Mouse last y
			x: -99999,		// Mouse x
			y: -99999,		// Mouse y
			dx: -99999,		// Mouse delta x
			dy: -99999,		// Mouse delta y
			ldx: -99999,	// Last down x
			ldy: -99999,	// Last down y

			isDown: false,

			downStartTime: 0,
			downElapsedTime: 0,
			dragEventFired: false
		};

		this.componentsDragged = [];

		// Start main update and draw loop
		this.Loop();
	}

	// Main component creation method
	CreateComponent(componentType, options, addToCollection = true)
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

		if(addToCollection)
		{
			// Returns the component or false
			return this.AddComponent(component);
		}
		else
		{
			return component;
		}
	}

	// Same as CreateComponent, but does not add it to any collection
	BuildComponent(componentType, options)
	{
		return this.CreateComponent(componentType, options, false);
	}

	GetContext()
	{
		return this.ctx;
	}

	// Actually the main loop
	Loop()
	{
		// Begin fps measurement
		this.stats.begin();	

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

		// End fps measurement
		this.stats.end();

		requestAnimationFrame(function() { this.Loop(); }.bind(this));
	}

	// Main component draw method and loop
	Draw()
	{
		// Clear the canvas, optimize later if enough brain
		this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

		// Draw everything
		for(var i = 0; i < this.CanvasComponentCollection.orderedCollection.length; i++)
		{
			this.CanvasComponentCollection.orderedCollection[i].Draw();
		}
	}

	// Main component update method and loop
	Update(dt)
	{
		var self = this;

		if(this.mouseState.isDown)
		{
			this.mouseState.downElapsedTime = this.t.time - this.mouseState.downStartTime;

			if(this.mouseState.downElapsedTime > 5 && !this.mouseState.dragEventFired)
			{
				this.mouseState.dragEventFired = true;

				// Get all components under mouse click coordinates
				this.componentsDragged = this.GetComponentsAtPoint(this.mouseState.x, this.mouseState.y);

				// Set focus of every component to false
				this.componentsDragged.forEach(function(component)
				{
					component.isDragged = true;
					component.relativeMouseX = self.mouseState.x - component.options.x;
					component.relativeMouseY = self.mouseState.y - component.options.y;
				});
			}
		}

		for(var component in this.CanvasComponentCollection.collection)
		{
			if(!this.CanvasComponentCollection.collection.hasOwnProperty(component))
				continue;

			this.CanvasComponentCollection.collection[component].Update(dt, this.mouseState);
		}
	}

	// Click event handler
	e_onClick(e)
	{
		var self = this;

		// Get all components under mouse click coordinates
		var components = this.GetComponentsAtPoint(e.clientX, e.clientY);

		// Set focus of every component to false
		this.GetComponents().forEach(function(component)
		{
			component.hasFocus = false;
		});

		// Call the click events of all components returned by GetComponentsAtPoint
		components.forEach(function(component)
		{
			if(component.ComponentType === CanvasComponent.RADIO)
			{
				self.GetComponentsOfType(CanvasComponent.RADIO).forEach(function(radio)
				{
					if(radio.GetGroup() === component.GetGroup())
						radio.SetState(false);
				});
			}

			component._mouseEvent(ComponentEvent.CLICK, e);
		});
	}

	// Double click event handler
	e_onDblClick(e)
	{
		
	}

	// Mouse down event handler
	e_mouseDown(e)
	{
		this.mouseState.isDown = true;
		this.mouseState.downStartTime = this.t.time;
		this.mouseState.ldx = e.clientX;
		this.mouseState.ldy = e.clientY;
	}

	// Mouse up event handler
	e_mouseUp(e)
	{
		this.mouseState.isDown = false;
		this.mouseState.dragEventFired = false;

		this.componentsDragged.forEach(function(component)
		{
			component.isDragged = false;
		});
	}

	// Mouse enter event handler
	e_mouseEnter(e)
	{
		
	}

	// Mouse leave event handler
	e_mouseLeave(e)
	{
		
	}

	// Mouse over event handler
	e_mouseOver(e)
	{

	}

	// Mouse out event handler
	e_mouseOut(e)
	{

	}

	// Mouse move event handler
	e_mouseMove(e)
	{
		this.mouseState.lx = this.mouseState.x;
		this.mouseState.ly = this.mouseState.y;
		this.mouseState.x = e.clientX;
		this.mouseState.y = e.clientY;
		this.mouseState.dx = this.mouseState.x - this.mouseState.lx;
		this.mouseState.dy = this.mouseState.y - this.mouseState.ly;

		// Should probably move this to Update loop
		this.GetComponents().forEach(function(component)
		{
			if(CCUtil.Collides(component._getBoundingBox(), e.clientX, e.clientY))
			{
				if(!component.isMouseOver)
					component._mouseEvent(ComponentEvent.MOUSE_OVER, e);
			}
			else
			{
				if(component.isMouseOver)
					component._mouseEvent(ComponentEvent.MOUSE_OUT, e);
			}
		});
	}

	// Mouse scroll event handler
	e_mouseScroll(e)
	{
		
	}

	// Top level CanvasComponentCollection methods

	// Add component to the collection
	AddComponent(component)
	{
		if(this.CanvasComponentCollection.AddComponent(component))
			return component;
		else
			return null;
	}

	// Remove component from the collection
	RemoveComponent(component)
	{
		return this.CanvasComponentCollection.RemoveComponent(component);
	}

	// Find component in the collection by component
	FindComponent(component)
	{
		return this.CanvasComponentCollection.FindComponent(component);
	}

	// Find component in the collection by a component unique id
	FindComponentById(id)
	{
		return this.CanvasComponentCollection.FindComponentById(id);
	}

	// Returns all components whose bounding box collide with given x, y
	GetComponentsAtPoint(x, y)
	{
		return this.CanvasComponentCollection.GetComponentsAtPoint(x, y);
	}

	// Returns all components
	GetComponents()
	{
		return this.CanvasComponentCollection.GetComponents();
	}

	GetComponentsOfType(componentType)
	{
		return this.CanvasComponentCollection.GetComponentsOfType(componentType);
	}
}
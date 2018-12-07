// "Static" Canvas Component Utility Class
var CanvasComponentsUtil = 
{ 
	debug: true
};

CanvasComponentsUtil.IsUndefinedNullOrEmpty = function(variable)
{
	if(typeof variable === 'undefined' ||
		variable === null ||
		variable === '')
	{
		return true;
	}

	return false;
}

CanvasComponentsUtil.IsComponent = function(possiblyComponent)
{
	// Fails after transplying
	//return Object.getPrototypeOf(possiblyComponent.constructor).name === 'Component';
	return true;
}

// Component unique id generator method
CanvasComponentsUtil.UUID = function()
{
	function s4() 
	{
		return Math.floor((1 + Math.random()) * 0x10000)
		.toString(16)
		.substring(1);
	}

	return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

CanvasComponentsUtil.Log = function(str)
{
	if(CanvasComponentsUtil.debug)
		console.log(str);
}

CanvasComponentsUtil.Timestamp = function()
{
	return window.performance && window.performance.now ? window.performance.now() : new Date().getTime();
}

// Basic point-rectangle collision checking method
CanvasComponentsUtil.Collides = function(rect, x, y) 
{
	var left = rect.x;
	var right = rect.x + rect.w;
	var top = rect.y;
	var bottom = rect.y + rect.h;

	if (right >= x && left <= x && bottom >= y && top <= y) 
		return true;

	return false;
}

var CCUtil = CanvasComponentsUtil;;// Collection class for Canvas Components
class CanvasComponentCollection
{
	constructor()
	{
		this.collection = {};
		this.orderedCollection = [];
	}

	_addOrderedComponent(component)
	{
		this.orderedCollection.push(component);

		this.orderedCollection.sort(function(componentA, componentB)
		{
			if(componentA.options.z < componentB.options.z)
				return -1;

			if(componentA.options.z > componentB.options.z)
				return 1;

			return 0;
		});
	}

	_removeOrderedComponent(component)
	{
		for(var i = 0; i < this.orderedCollection.length; i++)
		{
			if(this.orderedCollection[i].id === component.id)
				this.orderedCollection.splice(i, 1);
		}
	}
	
	// Add component to the collection
	AddComponent(component)
	{
		if(CCUtil.IsUndefinedNullOrEmpty(component) || !CCUtil.IsComponent(component))
		{
			CCUtil.Log(`Add: Component is null or given component is not a component`);
			return false;
		}

		if(typeof this.collection[component.id] === 'undefined')
		{
			this.collection[component.id] = component;
			this._addOrderedComponent(component)
			return true;
		}
		else
		{
			CCUtil.Log(`Add: ComponentCollection already has a component with id '${component.id}'`);
			return false;
		}
	}

	// Remove component from the collection
	RemoveComponent(component)
	{
		if(CCUtil.IsUndefinedNullOrEmpty(component) || !CCUtil.IsComponent(component))
			return false;

		if(typeof this.collection[component.id] !== 'undefined')
		{
			this.collection[component.id].Destroy();
			delete this.collection[component.id];
			this._removeOrderedComponent(component);

			return true;
		}
		else
		{
			CCUtil.Log(`Remove: Could not find a component with id '${component.id}'`);
		}

		return false;
	}

	// Find component in the collection by component
	FindComponent(component)
	{
		if(CCUtil.IsUndefinedNullOrEmpty(component) || !CCUtil.IsComponent(component))
			return false;
		
		if(typeof this.collection[component.id] !== 'undefined')
		{
			return this.collection[component.id];
		}
		else
		{
			CCUtil.Log(`FindComponent: Could not find a component with id '${component.id}'`);
		}

		return null;
	}

	// Find component in the collection by a component unique id
	FindComponentById(id)
	{
		if(!CCUtil.IsUndefinedNullOrEmpty(id))
		{
			if(typeof this.collection[id] !== 'undefined')
			{
				return this.collection[id];
			}
			else
			{
				CCUtil.Log(`FindComponentById: Could not find a component with id '${id}'`);
			}
		}

		return null;
	}

	// Returns a bounding box and a component ref for every component in collection
	GetBoundingBoxes()
	{
		return Object.values(this.collection).map(function(component)
		{
			return {
				component: component,
				BB: component._getBoundingBox()
			};
		});
	}

	// Returns all components whose bounding box collide with given x, y
	GetComponentsAtPoint(x, y)
	{
		return Object.values(this.collection).map(function(component)
		{
			return {
				component: component,
				BB: component._getBoundingBox()
			};
		}).filter(function(BBObject)
		{
			return CCUtil.Collides(BBObject.BB, x, y);
		}).map(function(BBObject)
		{
			return BBObject.component;
		});
	}

	// Returns all components
	GetComponents()
	{
		return Object.values(this.collection);
	}

	GetComponentsOfType(componentType)
	{
		return Object.values(this.collection).filter(component => component.ComponentType === componentType);
	}
}

;// Component enumeration for each available Canvas Component
var CanvasComponent = 
{
	BUTTON: 1,
	CHECKBOX: 2,
	PANEL: 3,
	RADIO: 4,
	TEXT_INPUT: 5,
	LABEL: 6,

	RANGE_SLIDER: 7,
	PROGRESS_BAR: 8,


	COMPONENT_LABEL: 1000,
	COMPONENT_EDITABLE_TEXT: 1001
};// "Enum" of supported Canvas Component events
var ComponentEvent =
{
	CLICK: 'click',
	DOUBLE_CLICK: 'dblclick',
	MOUSE_DOWN: 'mousedown',
	MOUSE_UP: 'mouseup',
	MOUSE_ENTER: 'mouseenter',
	MOUSE_LEAVE: 'mouseleave',
	MOUSE_OVER: 'mouseover',
	MOUSE_OUT: 'mouseout',
	MOUSE_MOVE: 'mousemove',
	SCROLL: 'scroll'
};;// Component superclass for all Canvas Components
class Component
{
	constructor(options, ctx, canvas, componentType)
	{
		// Generate unique id for the component
		this.id = CCUtil.UUID();

		// Log error if canvas context is not given
		if(CCUtil.IsUndefinedNullOrEmpty(ctx))
			console.error('Component: Canvas context is undefined or null!');

		this.ctx = ctx;
		this.canvas = canvas;
		this.ComponentType = componentType || null;
		this.options = options;

		if(this.ComponentType >= 1000)
			this.isMetaComponent = true;
		else
			this.isMetaComponent = false;

		// Events related attributes
		this.hasFocus = false;
		this.isMouseOver = false;
		this.isDragged = false;
		this.relativeMouseX = -99999;
		this.relativeMouseY = -99999;

		// Custom events bound to the component
		this.mouseEvents = { };

		CCUtil.Log(`Created component with type ${this.ComponentType}`);
	}

	// Used to bind custom events to components. Does not override default event behaviour by default.
	on(eventType, callback)
	{
		if(Object.values(ComponentEvent).indexOf(eventType) === -1)
		{
			console.error(`Unsupported event '${eventType}' for component`);
			return;
		}

		this.mouseEvents[eventType] = callback.bind(this);
	}

	// Used to unbind custom events to components.
	off(eventType, callback)
	{
		if(typeof this.mouseEvents[eventType] !== 'undefined')
			this.mouseEvents[eventType] = null;
	}

	// Default component event logic
	_mouseEvent(eventType, e)
	{
		switch(eventType)
		{
			case ComponentEvent.CLICK:
				this.hasFocus = true;
				break;

			case ComponentEvent.MOUSE_OVER:
				this.isMouseOver = true;
				break;

			case ComponentEvent.MOUSE_OUT:
				this.isMouseOver = false;
				break;

			default:
				break;
		}

		if(typeof this.mouseEvents[eventType] !== 'undefined' &&
		   typeof this.mouseEvents[eventType] !== null)
		{
			this.mouseEvents[eventType](e);
		}
	}

	// Returns the 2D bounding box of the component
	_getBoundingBox()
	{
		// Radio button is circular, so calculate x, y, w, h from radius
		if(this.ComponentType === CanvasComponent.RADIO)
		{
			var x = this.options.x - this.options.radius;
			var y = this.options.y - this.options.radius;
			var w = this.options.radius * 2;
			var h = this.options.radius * 2;
		}
		else if(this.ComponentType === CanvasComponent.LABEL)
		{
			// WARNING: HUGE HACK (Canvas text bounding box not easy, this gives decent estimate)
			// https://stackoverflow.com/questions/1134586/how-can-you-find-the-height-of-text-on-an-html-canvas
			// https://stackoverflow.com/questions/14836350/how-to-get-the-bounding-box-of-a-text-using-html5-canvas
			// https://galactic.ink/journal/2011/01/html5-typographic-metrics/#bboxUnicode
			this.ctx.textAlign = "start";
			this.ctx.textBaseline = "alphabetic";
			this.ctx.font = `${this.options.fontSize}px ${this.options.fontFamily}`;

			var w = this.ctx.measureText(this.textContent).width;
			var h = this.ctx.measureText('M').width;
			var x = this.options.x;
			var y = this.options.y - h;	
		}
		else
		{
			var x = this.options.x;
			var y = this.options.y;
			var w = this.options.width;
			var h = this.options.height;
		}

		return { x: x, y: y, w: w, h: h };
	}

	// Debug method. Draws a magenta bounding box border around a component when it has focus
	_drawFocus()
	{
		
	}

	// Component draw function
	Draw()
	{
		if(this.hasFocus)
		{
			this.ctx.strokeStyle = 'magenta';
			this.ctx.fillStyle = 'magenta';
			this.ctx.lineWidth = 2;

			var bb = this._getBoundingBox();

			this.ctx.beginPath();

			this.ctx.rect(
				bb.x - 3, 
				bb.y - 3, 
				bb.w + 6, 
				bb.h + 6
			);

			this.ctx.closePath();
			this.ctx.stroke();
		}
	}

	// Component update function
	Update(dt, mouseState)
	{
		if(this.isDragged)
		{
			this.options.x = mouseState.x - this.relativeMouseX;
			this.options.y = mouseState.y - this.relativeMouseY;
		}
	}

	// Component destroy method
	Destroy()
	{
		
	}
};/*
	CLASS: CanvasComponentButton (CCButton)
	DESC: Button component
*/
class CCButton extends Component
{
	constructor(options, ctx, canvas)
	{
		options = Object.assign(
		{ 
			width: 90, 
			height: 28,
			x: 0,
			y: 0,
			z: 1,

			borderWidth: 2,
			borderColor: '#000',

			backgroundColor: null,

			padding:
			{
				top: 0,
				right: 0,
				bottom: 0,
				left: 0
			},

			margin:
			{
				top: 0,
				right: 0,
				bottom: 0,
				left: 0
			}
		}, options);

		super(options, ctx, canvas, CanvasComponent.BUTTON);

		// Default gradient shading
		if(this.options.backgroundColor === null)
		{
			var gradient = this.ctx.createLinearGradient(
				this.options.x + (this.options.width / 2), 
				this.options.y,
				this.options.x + (this.options.width / 2),
				this.options.y + this.options.height
			);

			gradient.addColorStop(0, 'rgb(244, 244, 244)');
			gradient.addColorStop(1, 'rgb(241, 241, 241');

			this.options.backgroundColor = gradient;
		}

		// Instantiate the text of the button as a ComponentLabel
		this._componentLabel = new ComponentLabel(
		{
			x: this.options.x + (this.options.width / 2),
			y: this.options.y + (this.options.height / 2)
		}, this.ctx);
	}

	// Set button text
	SetText(str)
	{
		this._componentLabel.SetText(str);
	}

	// Get button text
	GetText()
	{
		return this._componentLabel.GetText();
	}

	// Component update method
	Update(dt, mouseState)
	{
		this._componentLabel.Update(dt, mouseState, this.options);
		super.Update(dt, mouseState);
	}

	// Component draw method
	Draw()
	{
		this.ctx.fillStyle = this.options.backgroundColor;
		this.ctx.strokeStyle = this.options.borderColor;
		this.ctx.lineWidth = this.options.borderWidth;

		this.ctx.beginPath();

		this.ctx.rect(
			this.options.x, 
			this.options.y, 
			this.options.width, 
			this.options.height
		);

		this.ctx.closePath();
		this.ctx.fill();
		this.ctx.stroke();

		this._componentLabel.Draw();
		super.Draw();
	}

	// Default component event logic
	_mouseEvent(eventType, e)
	{
		switch(eventType)
		{
			case ComponentEvent.MOUSE_OVER:
				document.body.style.cursor = 'pointer';
				break;

			case ComponentEvent.MOUSE_OUT:
				document.body.style.cursor = 'default';
				break;

			default:
				break;
		}

		super._mouseEvent(eventType, e);
	}
};/*
	CLASS: CanvasComponentCheckbox (CCCheckbox)
	DESC: Checkbox component
*/
class CCCheckbox extends Component
{
	constructor(options, ctx, canvas)
	{
		options = Object.assign(
		{ 
			width: 15, 
			height: 15,
			x: 0,
			y: 0,
			z: 0,

			borderWidth: 2,
			borderColor: '#000000',

			fontSize: 8,
			fontColor: '#000',

			backgroundColor: '#FFF',
			checkColor: '#000',

			padding:
			{
				top: 0,
				right: 0,
				bottom: 0,
				left: 0
			},

			margin:
			{
				top: 0,
				right: 0,
				bottom: 0,
				left: 0
			}
		}, options);

		super(options, ctx, canvas, CanvasComponent.CHECKBOX);

		this.group = 0;
		this.state = false;
	}

	SetGroup(group)
	{
		this.group = group || null;
	}

	GetGroup()
	{
		return this.group;
	}

	SetState(state)
	{
		this.state = state || false;
	}

	SwitchState()
	{
		this.state = !this.state;
	}

	GetState()
	{
		return this.state;
	}

	// Component update method
	Update(dt, mouseState)
	{
		super.Update(dt, mouseState);
	}

	// Component draw method
	Draw()
	{
		this.ctx.fillStyle = this.options.backgroundColor;
		this.ctx.strokeStyle = this.options.borderColor;
		this.ctx.lineWidth = this.options.borderWidth;

		this.ctx.beginPath();

		this.ctx.rect(
			this.options.x, 
			this.options.y, 
			this.options.width, 
			this.options.height
		);

		this.ctx.closePath();
		this.ctx.fill();
		this.ctx.stroke();

		if(this.state)
		{
			this.ctx.fillStyle = this.options.checkColor;
			this.ctx.strokeStyle = this.options.checkColor;
			this.ctx.lineWidth = this.options.borderWidth;

			this.ctx.beginPath();

			var checkWidth = this.options.width / 2;
			var checkHeight = this.options.height / 2;

			this.ctx.rect(
				this.options.x + checkWidth / 2, 
				this.options.y + checkHeight / 2, 
				checkWidth, 
				checkHeight
			);

			this.ctx.closePath();
			this.ctx.fill();
			this.ctx.stroke();
		}

		super.Draw();
	}

	// Default component event logic
	_mouseEvent(eventType, e)
	{
		switch(eventType)
		{
			case ComponentEvent.MOUSE_OVER:
				document.body.style.cursor = 'pointer';
				break;

			case ComponentEvent.MOUSE_OUT:
				document.body.style.cursor = 'default';
				break;

			case ComponentEvent.CLICK:
				this.SwitchState();
				break;

			default:
				break;
		}

		super._mouseEvent(eventType, e);
	}
};/*
	CLASS: CanvasComponentPanel (CCPanel)
	DESC: Panel component
*/
class CCPanel extends Component
{
	constructor(options, ctx, canvas)
	{
		options = Object.assign(
		{ 
			width: 300, 
			height: 350,
			x: 0,
			y: 0,
			z: 0,

			borderWidth: 2,
			borderColor: '#000',

			fontSize: 8,
			fontColor: '#000',

			backgroundColor: null,

			padding:
			{
				top: 0,
				right: 0,
				bottom: 0,
				left: 0
			},

			margin:
			{
				top: 0,
				right: 0,
				bottom: 0,
				left: 0
			}
		}, options);

		super(options, ctx, canvas, CanvasComponent.PANEL);

		// Default gradient shading
		if(this.options.backgroundColor === null)
		{
			var gradient = this.ctx.createLinearGradient(
				this.options.x + (this.options.width / 2), 
				this.options.y,
				this.options.x + (this.options.width / 2),
				this.options.y + this.options.height
			);

			gradient.addColorStop(0, 'rgb(244, 244, 244)');
			gradient.addColorStop(1, 'rgb(241, 241, 241');

			this.options.backgroundColor = gradient;
		}
	}

	// Component update method
	Update(dt, mouseState)
	{
		super.Update(dt, mouseState);
	}

	// Component draw method
	Draw()
	{
		this.ctx.fillStyle = this.options.backgroundColor;
		this.ctx.strokeStyle = this.options.borderColor;
		this.ctx.lineWidth = this.options.borderWidth;

		this.ctx.beginPath();

		this.ctx.rect(
			this.options.x, 
			this.options.y, 
			this.options.width, 
			this.options.height
		);

		this.ctx.closePath();
		this.ctx.fill();
		this.ctx.stroke();

		// This might work later for overflow / scrolling
		//this.ctx.save();
		//this.ctx.clip();
		//this.ctx.restore();

		super.Draw();
	}

	// Default component event logic
	_mouseEvent(eventType, e)
	{
		super._mouseEvent(eventType, e);
	}
};/*
	CLASS: CanvasComponentRadioButton (CCRadioButton)
	DESC: Radio button component
*/
class CCRadioButton extends Component
{
	constructor(options, ctx, canvas)
	{
		options = Object.assign(
		{ 
			x: 0,
			y: 0,
			z: 0,
			radius: 8,

			borderWidth: 2,
			borderColor: '#000',

			fontSize: 8,
			fontColor: '#000',

			backgroundColor: '#FFF',
			checkColor: '#000',

			padding:
			{
				top: 0,
				right: 0,
				bottom: 0,
				left: 0
			},

			margin:
			{
				top: 0,
				right: 0,
				bottom: 0,
				left: 0
			}
		}, options);

		super(options, ctx, canvas, CanvasComponent.RADIO);

		this.group = 0;
		this.state = false;
	}

	SetGroup(group)
	{
		this.group = group || null;
	}

	GetGroup()
	{
		return this.group;
	}

	SetState(state)
	{
		this.state = state || false;
	}

	SwitchState()
	{
		this.state = !this.state;
	}

	GetState()
	{
		return this.state;
	}

	// Component update method
	Update(dt, mouseState)
	{
		super.Update(dt, mouseState);
	}

	// Component draw method
	Draw()
	{
		this.ctx.fillStyle = this.options.backgroundColor;
		this.ctx.strokeStyle = this.options.borderColor;
		this.ctx.lineWidth = this.options.borderWidth;

		this.ctx.beginPath();

		this.ctx.arc(this.options.x, this.options.y, this.options.radius, 0, 2 * Math.PI);

		this.ctx.closePath();
		this.ctx.fill();
		this.ctx.stroke();

		if(this.state)
		{
			this.ctx.fillStyle = this.options.checkColor;
			this.ctx.strokeStyle = this.options.checkColor;
			this.ctx.lineWidth = this.options.borderWidth;

			this.ctx.beginPath();

			this.ctx.arc(this.options.x, this.options.y, this.options.radius / 3, 0, 2 * Math.PI);

			this.ctx.closePath();
			this.ctx.fill();
			this.ctx.stroke();
		}

		super.Draw();
	}

	// Default component event logic
	_mouseEvent(eventType, e)
	{
		switch(eventType)
		{
			case ComponentEvent.MOUSE_OVER:
				document.body.style.cursor = 'pointer';
				break;

			case ComponentEvent.MOUSE_OUT:
				document.body.style.cursor = 'default';
				break;

			case ComponentEvent.CLICK:
				this.SwitchState();
				break;

			default:
				break;
		}

		super._mouseEvent(eventType, e);
	}
};/*
	CLASS: CanvasComponentTextInput (CCTextInput)
	DESC: Text input component
*/
class CCTextInput extends Component
{
	constructor(options, ctx, canvas)
	{
		options = Object.assign(
		{ 
			width: 150, 
			height: 21,
			x: 0,
			y: 0,
			z: 0,

			borderWidth: 2,
			borderColor: '#000',

			backgroundColor: '#FFF',

			padding:
			{
				top: 0,
				right: 0,
				bottom: 0,
				left: 5
			},

			margin:
			{
				top: 0,
				right: 0,
				bottom: 0,
				left: 0
			}
		}, options);

		super(options, ctx, canvas, CanvasComponent.TEXT_INPUT);

		this._componentText = new ComponentEditableText(
		{
			x: this.options.x,
			y: this.options.y + (this.options.height / 2)
		}, this.ctx);
	}

	// Set text input value
	SetValue(str)
	{
		this._componentText.SetValue(str);
	}

	// Get text input value
	GetValue()
	{
		return this._componentText.GetValue();
	}

	// Component update method
	Update(dt, mouseState)
	{
		this._componentText.Update(dt, mouseState, this.options);
		super.Update(dt, mouseState);
	}

	// Component draw method
	Draw()
	{
		this.ctx.fillStyle = this.options.backgroundColor;
		this.ctx.strokeStyle = this.options.borderColor;
		this.ctx.lineWidth = this.options.borderWidth;

		this.ctx.beginPath();

		this.ctx.rect(
			this.options.x, 
			this.options.y, 
			this.options.width, 
			this.options.height
		);

		this.ctx.closePath();
		this.ctx.fill();
		this.ctx.stroke();

		this._componentText.Draw(this.options);
		super.Draw();
	}

	// Default component event logic
	_mouseEvent(eventType, e)
	{
		switch(eventType)
		{
			case ComponentEvent.MOUSE_OVER:
				document.body.style.cursor = 'text';
				break;

			case ComponentEvent.MOUSE_OUT:
				document.body.style.cursor = 'default';
				break;

			default:
				break;
		}

		super._mouseEvent(eventType, e);
	}
};/*
	CLASS: CanvasComponentLabel (CCLabel)
	DESC: Label component
*/
class CCLabel extends Component
{
	constructor(options, ctx, canvas)
	{
		options = Object.assign(
		{ 
			width: 150, 
			height: 35,
			x: 0,
			y: 0,
			z: 0,

			borderWidth: 1,
			borderColor: '#000',

			fontSize: 16,
			fontColor: '#000',
			fontFamily: 'Arial',

			backgroundColor: '#FFF',

			padding:
			{
				top: 0,
				right: 0,
				bottom: 0,
				left: 0
			},

			margin:
			{
				top: 0,
				right: 0,
				bottom: 0,
				left: 0
			}
		}, options);

		super(options, ctx, canvas, CanvasComponent.LABEL);

		this.textContent = '';
	}

	SetText(str)
	{
		this.textContent = str;
	}

	// Component update method
	Update(dt, mouseState)
	{
		super.Update(dt, mouseState);
	}

	// Component draw method
	Draw()
	{
		this.ctx.textAlign = "start";
		this.ctx.textBaseline = "alphabetic";
		this.ctx.fillStyle = this.options.fontColor;
		this.ctx.strokeStyle = this.options.fontColor;
		this.ctx.font = `${this.options.fontSize}px ${this.options.fontFamily}`;

		this.ctx.beginPath();
		this.ctx.fillText(this.textContent, this.options.x, this.options.y);
		this.ctx.closePath();

		super.Draw();
	}

	// Default component event logic
	_mouseEvent(eventType, e)
	{
		super._mouseEvent(eventType, e);
	}
};/*
	CLASS: CanvasComponentRangeSlider (CCRangeSlider)
	DESC: Range slider component
*/
class CCRangeSlider extends Component
{
	constructor(options, ctx, canvas)
	{
		options = Object.assign(
		{ 
			width: 200, 
			height: 50,
			x: 0,
			y: 0,
			z: 0,

			borderWidth: 1,
			borderColor: '#000',

			fontSize: 8,
			fontColor: '#000',

			backgroundColor: '#FFF',

			padding:
			{
				top: 0,
				right: 0,
				bottom: 0,
				left: 0
			},

			margin:
			{
				top: 0,
				right: 0,
				bottom: 0,
				left: 0
			}
		}, options);

		super(options, ctx, canvas, CanvasComponent.RANGE_SLIDER);
	}

	// Component update method
	Update(dt, mouseState)
	{
		super.Update(dt, mouseState);
	}

	// Component draw method
	Draw()
	{
		super.Draw();
	}

	// Default component event logic
	_mouseEvent(eventType, e)
	{
		super._mouseEvent(eventType, e);
	}
};/*
	CLASS: CanvasComponentProgressBar (CCProgressBar)
	DESC: Progress bar component
*/
class CCProgressBar extends Component
{
	constructor(options, ctx, canvas)
	{
		options = Object.assign(
		{ 
			width: 200, 
			height: 50,
			x: 0,
			y: 0,
			z: 0,

			borderWidth: 1,
			borderColor: '#000',

			fontSize: 8,
			fontColor: '#000',

			backgroundColor: '#FFF',

			padding:
			{
				top: 0,
				right: 0,
				bottom: 0,
				left: 0
			},

			margin:
			{
				top: 0,
				right: 0,
				bottom: 0,
				left: 0
			}
		}, options);

		super(options, ctx, canvas, CanvasComponent.PROGRESS_BAR);
	}

	// Component update method
	Update(dt, mouseState)
	{
		super.Update(dt, mouseState);
	}

	// Component draw method
	Draw()
	{
		super.Draw();
	}

	// Default component event logic
	_mouseEvent(eventType, e)
	{
		super._mouseEvent(eventType, e);
	}
};/*
	CLASS: ComponentLabel
	DESC: Meta label component
*/
class ComponentLabel extends Component
{
	constructor(options, ctx, canvas, parentComponent)
	{
		options = Object.assign(
		{ 
			x: 0,
			y: 0,
			z: 0,

			fontSize: 12,
			fontColor: '#000',
			fontFamily: 'Arial',

			padding:
			{
				top: 0,
				right: 0,
				bottom: 0,
				left: 0
			},

			margin:
			{
				top: 0,
				right: 0,
				bottom: 0,
				left: 0
			}
		}, options);

		super(options, ctx, canvas, CanvasComponent.COMPONENT_LABEL);

		/*if(CCUtil.IsUndefinedNullOrEmpty(parentComponent))
			CCUtil.Log(`Parent component could not be inherited for ComponentLabel#${this.id}`);

		this.parentComponent = parentComponent;*/
		this.textContent = '';
	}

	// Set component label text
	SetText(str)
	{
		this.textContent = str;
	}

	// Get component label text
	GetText()
	{
		return this.textContent;
	}

	// Component update method
	Update(dt, mouseState, parentOptions)
	{
		//super.Update(dt, mouseState);
		this.options.x = parentOptions.x + (parentOptions.width / 2),
		this.options.y = parentOptions.y + (parentOptions.height / 2)
	}

	// Component draw method
	Draw()
	{
		this.ctx.textAlign = "center";
		this.ctx.textBaseline = "middle";
		this.ctx.fillStyle = this.options.fontColor;
		this.ctx.strokeStyle = this.options.fontColor;
		this.ctx.font = `${this.options.fontSize}px ${this.options.fontFamily}`;

		this.ctx.beginPath();
		this.ctx.fillText(this.textContent, this.options.x, this.options.y);
		this.ctx.closePath();

		super.Draw();
	}
};/*
	CLASS: ComponentLabel
	DESC: Meta label component
*/
class ComponentEditableText extends Component
{
	constructor(options, ctx, canvas, parentComponent)
	{
		options = Object.assign(
		{ 
			x: 0,
			y: 0,
			z: 0,

			fontSize: 12,
			fontColor: '#000',
			fontFamily: 'Arial'
		}, options);

		super(options, ctx, canvas, CanvasComponent.COMPONENT_EDITABLE_TEXT);

		/*if(CCUtil.IsUndefinedNullOrEmpty(parentComponent))
			CCUtil.Log(`Parent component could not be inherited for ComponentEditableText#${this.id}`);

		this.parentComponent = parentComponent;*/
		this.value = '';
	}

	// Set editable text value
	SetValue(str)
	{
		this.value = str;
	}

	// Get editable text value
	GetValue()
	{
		return this.value;
	}

	// Component update method
	Update(dt, mouseState, parentOptions)
	{
		//super.Update(dt, mouseState);
		this.options.x = parentOptions.x;
		this.options.y = parentOptions.y + (parentOptions.height / 2);
	}

	// Component draw method
	Draw(parentOptions)
	{
		parentOptions = parentOptions || { padding: { left: 0 } };

		this.ctx.textAlign = "start";
		this.ctx.textBaseline = "middle";
		this.ctx.fillStyle = this.options.fontColor;
		this.ctx.strokeStyle = this.options.fontColor;
		this.ctx.font = `${this.options.fontSize}px ${this.options.fontFamily}`;

		this.ctx.beginPath();
		this.ctx.fillText(this.value, this.options.x + parentOptions.padding.left, this.options.y);
		this.ctx.closePath();

		super.Draw();
	}
};// Main class for Canvas Components
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
//# sourceMappingURL=canvas-components-dev.js.map

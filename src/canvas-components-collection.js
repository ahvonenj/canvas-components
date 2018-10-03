function CanvasComponentCollection()
{
	this.collection = {};
}

CanvasComponentCollection.prototype.AddComponent = function(component)
{
	if(!CCUtil.IsUndefinedNullOrEmpty(component))
	{
		if(typeof this.collection[component.id] === 'undefined')
		{
			this.collection[component.id] = component;
		}
		else
		{
			CCUtil.Log(`Add: ComponentCollection already has a component with id '${component.id}'`);
		}
	}
}

CanvasComponentCollection.prototype.RemoveComponent = function(component)
{
	if(!CCUtil.IsUndefinedNullOrEmpty(component))
	{
		if(typeof this.collection[component.id] !== 'undefined')
		{
			this.collection[component.id].Destroy();
			delete this.collection[component.id];

			return true;
		}
		else
		{
			CCUtil.Log(`Remove: Could not find a component with id '${component.id}'`);
		}
	}

	return false;
}

CanvasComponentCollection.prototype.FindComponent = function(component)
{
	if(!CCUtil.IsUndefinedNullOrEmpty(component))
	{
		if(typeof this.collection[component.id] !== 'undefined')
		{
			return this.collection[component.id];
		}
		else
		{
			CCUtil.Log(`FindComponent: Could not find a component with id '${component.id}'`);
		}
	}

	return null;
}

CanvasComponentCollection.prototype.FindComponentById = function(id)
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
// Collection class for Canvas Components
class CanvasComponentCollection
{
	constructor()
	{
		this.collection = {};
	}
	
	// Add component to the collection
	AddComponent(component)
	{
		if(CCUtil.IsUndefinedNullOrEmpty(component) || !CCUtil.IsComponent(component))
			return false;

		if(typeof this.collection[component.id] === 'undefined')
		{
			this.collection[component.id] = component;
			return true;
		}
		else
		{
			CCUtil.Log(`Add: ComponentCollection already has a component with id '${component.id}'`);
		}

		return false;
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
}


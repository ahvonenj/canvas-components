// Collection class for Canvas Components
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


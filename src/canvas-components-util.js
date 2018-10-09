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
	return Object.getPrototypeOf(possiblyComponent.constructor).name === 'Component';
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

CanvasComponentsUtil.DefaultsDeep = function(target, defaults) 
{
	var clone = JSON.parse(JSON.stringify(target));

	function run(clone, defaults) 
	{
		const DEFAULTS_PROPERTY_NAMES = Object.getOwnPropertyNames(defaults);

		DEFAULTS_PROPERTY_NAMES.forEach(function (property) 
		{
			if(Object.prototype.toString.call(defaults[property]) === "[object Object]") 
			{
				if(!clone.hasOwnProperty(property)) 
				{
					clone[property] = {};
				}

				run(clone[property], defaults[property]);
			} 
			else if(!clone.hasOwnProperty(property)) 
			{
				clone[property] = defaults[property];
			}
		});
	}

	run(clone, defaults);

	return clone;
}

CanvasComponentsUtil.Timestamp = function()
{
	return window.performance && window.performance.now ? window.performance.now() : new Date().getTime();
}

var CCUtil = CanvasComponentsUtil;
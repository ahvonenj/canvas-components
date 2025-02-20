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

var CCUtil = CanvasComponentsUtil;
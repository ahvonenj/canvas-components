/*
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
}
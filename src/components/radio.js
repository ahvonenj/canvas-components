/*
	CLASS: CanvasComponentRadioButton (CCRadioButton)
	DESC: Radio button component
*/
class CCRadioButton extends Component
{
	constructor(options, ctx)
	{
		options = Object.assign(
		{ 
			width: 25, 
			height: 25,
			x: 0,
			y: 0,
			z: 0,

			borderWidth: 1,
			borderColor: '#000',

			fontSize: 8,
			fontColor: '#000',

			backgroundColor: '#FFF'
		}, options);

		super(options, ctx, CanvasComponent.RADIO);
	}

	// Component update method
	Update(dt)
	{
		
	}

	// Component draw method
	Draw()
	{

	}
}
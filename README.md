# Canvas Components

Allows for creation of inputs and other components in a HTML 5 canvas.
Aiming for easy extendability and ease-of-use.

## Implemented or almost implemented components
- [x] Buttons
- [x] Checkboxes
- [ ] Panels for grouping components
- [x] Radio buttons
- [x] Text inputs
- [x] Labels
- [ ] Range sliders
- [ ] Progress bars

## Todo

- [x] Component superclass
- [x] Component collection
- [x] Components inherited from superclass
- [x] Component enumeration
- [x] Component default options
- [x] Component unique indentifiers
- [x] Draw components on canvas
- [x] Update component states
- [x] Get and set values of inputs
- [x] Interaction with buttons, checkboxes, text inputs, ...
- [ ] Component relative positioning (e.g. when component is inside a panel)
- [x] Default event handlers for components
- [x] Point-rectangle intersection for event handling
- [x] Calculate bounding boxes for components
- [x] Event enumeration
- [x] Meta components / Subcomponents (component-component compositions)
- [x] Destroy / Remove / Delete components
- [ ] Loader component
- [ ] Viewport resize handling
- [ ] Mobile support
- [ ] Touch support
- [ ] Clipping / scrolling & scrollbars
- [x] Mouse event: click
- [ ] Mouse event: dblclick
- [ ] Mouse event: mousedown
- [ ] Mouse event: mouseup
- [ ] Mouse event: mouseenter
- [ ] Mouse event: mouseleave
- [x] Mouse event: mouseover
- [x] Mouse event: mouseout
- [x] Mouse event: mousemove
- [ ] Mouse event: scroll

## Todo 2

- [x] Implement component z-indexing or layers. Draw components in the right order.
- [ ] Implement runtime reordering of components for rendering, if component z-indexes change

## Project related

- [x] Minify everything
- [x] Babel everything
- [x] Concat everything
- [x] Source maps
- [x] Build system
- [x] Livereload
- [x] .gitignore
- [x] Tests
- [ ] Proper tests
- [ ] Optimize drawing
- [ ] Optimize event handling
- [ ] Optimize update logic
- [ ] See if optimizations can be made to z-indexing. Currently we might be essentially doubling the runtime memory usage because we have to maintain two separate collections of components

## Performance

### 7.12.2018

Supports over 1500 simultaneous components at once, at 60fps.

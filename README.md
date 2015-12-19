#malaise.js
###A very lightweight plugin to lazy load images for jQuery

This plugin boosts performance by delaying the loading of images until the user scrolls near them.

Malaise will default to using images defined for retina screens.

If you don't define retina images, Malaise allows for responsive images by swapping to and from mobile versions at a breakpoint.

###Options
* offset: `defualt: 0` - The distance in pixels you want images to load relative to the visible part of the screen.
* path: `defualt: ''` - The base path for the images you are loading.
* loadedClass: `defualt: 'malaise-loaded'` - Class added to loaded images, useful for animating in images.
* breakpoint: `defualt: '767px'` - The min-width to load in mobile versions of images.
* container: `defualt: window` - The scrolling container your elements are in.
* throttle: `defualt: 100` - Resize and scroll throttling.
* callback - A function malaise will call it after an image is loaded.

###Markup
* `malaise-bg` class to load background-images instead of src paths
* `data-src-retina` atribute for retina images
* `data-src-mobile` atribute for mobile images
* `data-src` atribute for normal images

Forked from [unveil](http://luis-almeida.github.com/unveil/) with new features and options.


###Browser support
Compatible with All Browsers and IE7+. Retina detection IE11+


###License
Unveil is licensed under the [MIT license](http://opensource.org/licenses/MIT).

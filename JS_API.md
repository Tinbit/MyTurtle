Javascript API
==============

Turtles
-------
The js api for turtles is documented [here](http://github.com/FlatTurtle/MyTurtle/tree/master/turtles#turtles)

Plugins
-------
Plugins in MyTurtle are really easy to use. They all have an `enable`, `disable`, and `destroy` function that can be called directly. 

For example to enable the clock plugin on your screen you use.

```javascript
Clock.enable();
```

The included plugins in myturtle are:
1. Power: turn the screen on and off
2. Clock: add a clock to the screen
3. Message: Show a message on the screen
4. Overlay: show a fullscreen image on the screen
5. Footer: show an RSS feed in the footer

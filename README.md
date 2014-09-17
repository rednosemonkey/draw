# Draw #

Draw is essentially a simple mobile drawing app, but has support for both touch and mouse. I have written a second multiplayer version for using websockets running on a node server, which I will combine with this single player version in the future.

## Features ##

- Can change color, line thickness, and pen type*.
- Simple interface for young kids to use.
- No external dependencies

* The default pen and line thickness is good for practicing Japanese kanji (the original purpose of the app)

## Future changes ##

- fix canvas resize on screen orientation
- remove the need for fastclick.js by adding touch events to buttons for iOS devices.
- combine with websockets multiplayer version.

# CMPM120FinalGame

# Credits
Brandon Jacobson - Technology Lead  
Jimmy Nguyen - Testing Lead, SFX Audio  
Madison Li - Art  
Keven Paw - Production Lead  
Josey Verespey - Executive Vice Producer, Narrative Lead

Prototype notes:
- Scene flow:
    * For scene communications, we provided a simple example of how each scene will communicate with each other. In game.js, it has a better example on how we plan to handle scene communication, which is moving a block from different positions when swapping between scenes.

- Core gameplay:
    * For progression, it is mapped stage by stage in levels until you reach the end, but progression between scenes is dictated by a swapping mechanic in which players can do something in one scene that alters the level of the other scene allowing the player to progress through the levels and eventually move to the next stage.

- Cinematics:
    * For the non-interactive cinematic, the beginning is the studio logo fading into view, the middle is the "blinking" effect, and the end is the logo fading into black.
    * For the interactive cinematic, the dynamic movement can be seen in how the title's opacity constantly changes, as well as how the options slide into view one after the other. The buttons also darken when hovered over, and lead to placeholder scenes when pressed.
    * For choreography in code, tween chains were used both for the logo animation (the blinking) and the animation on the title in the menu.

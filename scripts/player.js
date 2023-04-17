const playerScript = () => {
  //   /*
  // addPlayer function => 
  //   x, y, width, height, characterName
  // */
  let p1 = game.addPlayer(100, 10, 40, 80, "Aurelian", 'assets/char_idle.png');
  // let p2 = game.addPlayer(100, 10, 40, 80, "Grimaldus", 'assets/char_idle.png');
  
  // /*
  //  addAttack command order => 
  //   1. width
  //   2. height
  //   3. keyCode
  //   4. name
  //   5. spritePath
  //   6. duration
  //   7. cooldown
  //   8. xKnockback
  //   8. yKnockback
  //   9. damage
  //   10. yOffset <optional>
  //   11. xOffset <optional>
  //  */
  
  // p1.addAttack(30, 30, 70, 'sword','assets/char_sword.png',10,  5,  1,0, 10, 10);
  // /*
  // addMoveKeys => 
  // ***take object with move key value pairs
  // */

  let keysP1 = {
    left: 65,
    right: 68,
    jump: 32
  }

  gmConsole.addTracker("yVelocity", p1);
  gmConsole.addTracker("xVelocity", p1);

  p1.addMoveKeys(keysP1);

  p1.showHitbox();
}
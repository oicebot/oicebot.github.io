---
layout: post
title: "Cities: Skylines is Turing Complete"
tags: Game translate  
author: Daniel Bali
from: https://medium.com/@balidani/cities-skylines-is-turing-complete-e5ccf75d1c3a
excerpt: "How to building a 4-bit adder in Cities:Skylines"
thumb: "/img/20190809/thumb.png"
---
Cities: Skylines is a city simulation game that is complex enough to build universal logic gates in it. Using universal logic gates it is possible to construct any circuit including Turing complete machines. So, just like in Minecraft one can build a computer inside Cities: Skylines. However, it would be very complicated to build a fully fledged computer using these gates, so I will demonstrate a 4-bit adder instead. Everything is done in the vanilla version of the game, no mods or add-ons are required.

The game, just like other city builder games, requires the player to manage power and water for the city. Power plants produce electricity and require both clean water and sewage. Water towers provide clean water, sewage pipes get rid of waste — both of these require electricity. This sort of duality between sewage and water towers allows the construction of AND as well as OR gates.

<img src="/img/20190809/001.jpg"><br><small>
The main cast left to right: oil power plant, water tower, sewage pipe. Wind turbine in the background.</small>

You can see an AND gate built below. The 2 inputs are the power lines leading into the water tower (top) and the sewage pipe (bottom). The output is the power line attached to the power plant. Even though the inputs are zero in the screenshots, the power plant is still producing electricity — it takes a while for it to shut down even without water and waste management. The buildings are placed far apart because otherwise power would freely flow between them.

<img src="/img/20190809/002.jpg"><br><small>
AND gate on regular map, power and water layers shown.</small>

We need one more component for functional completeness: an inverter, or NOT gate. To achieve this we will make use of the game’s simulation of fluid dynamics. Improper use of dams, canals or abuse of sewage pipes can result in buildings getting flooded. A flooded power plant will not produce electricity. This is enough to build a NOT gate, as seen below.

<img src="/img/20190809/003.jpg"><br><small>
NOT gate power layer, sewage pipe off and then on.</small>

A 1-bit adder can be built using 9 mixed gates according to the schema in the picture below. 4 of these adders can be chained to create a 4-bit adder. I placed the gates in a grid structure to reflect how they we laid out on a map.

<img src="/img/20190809/004.jpg"><br><small>
Layout for a 1-bit adder with carry.</small>

To make life easier I decided to use unlimited money and a custom map that I created in the map editor. You can import PNG images in the map editor to load a height map. I created a map with blocks of land where I can place my gates, almost like a PCB! Here is what the map looks like. You can see the 4 1-bit adders repeated in a 2x2 grid in the pictures.

<img src="/img/20190809/005.jpg"><br><small>
Jagged lines shown because the game engine doesn’t handle sharp edges really well.</small>

Building the circuit was very tedious and I had to restart multiple times due to miscalculations. One problem I came across was crossing wires. Fortunately power lines can cross each other without intersection if there is a sufficient height difference.

<img src="/img/20190809/005.jpg"><br><small>
1-bit adder. I have 4 of these interconnected.</small>

Finally, I needed to build a city nearby that produces enough sewage to flood up to 8 wind turbines at the same time. **Yes, this computer is powered by poop.** I would not call it a green solution though, each gate uses an oil power plant so the pollution is quite bad. Debugging was pretty hard, sometimes I found that storm lightning disconnected my power lines. Just like cosmic rays, but more permanent.

<img src="/img/20190809/006.jpg"><br><small>
A spiderweb of power lines leading to one of the 4-bit inputs.</small>

I made videos to show that addition indeed works. In the first one I set the input by connecting wires to a power grid that’s always on (like the IC power-supply). On the left side I set 1001 (=9), in the middle 1110 (=14). After the inputs are set I speed up the game and the output on the rightmost 5 wires jumps to all 1s. After a long time the final value settles to 10111 (=23). It works indeed!

....

In the second video I focus on one of the adders. You can see the state of the components change over time until the final output (0 as the sum and 1 as the carry) is settled.

....

Some caveats. This would make a very slow computer, one 4-bit addition took roughly 15 months in game which is about 20 minutes in real life. There are also problems with size. Due to how power is implemented in the game, components of a gate need to be placed relatively far apart, otherwise power would flow between them. The 4-bit adder took up much of the 9 tiles available in a normal game, although I did not optimize it very much. With mods it is possible to use up to 25 tiles. If you have ideas on how to do more efficient computation using game mechanics, please let me know in the comments!


> _（ 原作： [{{ page.author }}]({{ page.from }}) ，译者：欧剃 转载请保留此信息）_

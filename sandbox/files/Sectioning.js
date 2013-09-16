display.setBg({ fill: 'white' });

image = new jayus.Image('assets/guard.png');
image.setOrigin(40, 40);

image.setSection(36, 30, 30, 36);

key = new jayus.Image('assets/guard.png');
key.setOrigin(40, 120);

display.children.add(image, key);

jayus.start();
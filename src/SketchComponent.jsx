import React, { useEffect } from 'react';
import Sketch from 'react-p5';

let x1 = 0;
let y1 = 0;
let padding = 0;

let text = 'Computer cleaning spray (compressed)';

let rectArray = [];

let current = {};

const SketchComponent = props => {
  useEffect(() => {
    // console.log('effect');
    padding = props.padding;
  }, [props.padding]);

  const setup = (p5, canvasParentRef) => {
    const cnv = p5.createCanvas(500, 500).parent(canvasParentRef);

    cnv.mousePressed(event => {
      current.x = p5.mouseX;
      current.y = p5.mouseY;
    });
    cnv.mouseReleased(event => {
      rectArray.push({
        position: {
          x: current.x,
          y: current.y,
          w: p5.mouseX - current.x,
          h: p5.mouseY - current.y,
        },

        padding: padding,
      });

      current = {};
    });
  };

  const draw = p5 => {
    p5.background(255);
    p5.rect(10, 10, 10, 10);
    p5.text('mouseX: ' + p5.mouseX, 10, 30);
    p5.text('mouseY: ' + p5.mouseY, 10, 40);

    rectArray.forEach(rect => {
      p5.rect(...Object.values(rect.position));
      const transformed = transformPadding(rect);
      p5.text(text, ...Object.values(transformed));
    });

    if (Object.keys(current).length !== 0) {
      p5.rect(
        current.x,
        current.y,
        p5.mouseX - current.x,
        p5.mouseY - current.y
      );
      p5.text(
        text,
        current.x + padding,
        current.y + padding,
        p5.mouseX - current.x - padding,
        p5.mouseY - current.y - padding
      );
    }
  };

  const transformPadding = rect => {
    return {
      x: rect.position.x + rect.padding,
      y: rect.position.y + rect.padding,
      w: rect.position.w - rect.padding,
      h: rect.position.h - rect.padding,
    };
  };

  return <Sketch setup={setup} draw={draw} />;
};

export default SketchComponent;

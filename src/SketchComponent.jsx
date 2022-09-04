import { Box } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect } from 'react';
import Sketch from 'react-p5';

let padding = 0;
let text = 'Computer cleaning spray (compressed)';
let rectArray = [];
let selectedTemplate = '1';
let img;
let imgcoords = { x: 0, y: 0 };

let current = {};
// let img;

const templateTypes = {
  T1: {
    w: 198,
    h: 120,
  },
  T2: {
    w: 297,
    h: 210,
  },
};

let p5hold;

const SketchComponent = props => {
  useEffect(() => {
    padding = props.padding;
  }, [props.padding]);

  useEffect(() => {
    rectArray = props.textboxArray;
  }, [props.textboxArray]);

  useEffect(() => {
    text = props.textValue;
  }, [props.textValue]);

  useEffect(() => {
    selectedTemplate = props.selectedTemplate;
    p5hold?.resizeCanvas(
      templateTypes?.['T' + selectedTemplate]?.w,
      templateTypes?.['T' + selectedTemplate]?.h
    );
  }, [props.selectedTemplate]);

  const setup = (p5, canvasParentRef) => {
    p5hold = p5;
    const cnv = p5
      .createCanvas(
        templateTypes?.['T' + selectedTemplate]?.w,
        templateTypes?.['T' + selectedTemplate]?.h
      )
      .parent(canvasParentRef);

    cnv.mousePressed(event => {
      current.x = p5.mouseX;
      current.y = p5.mouseY;
    });
    cnv.mouseReleased(event => {
      if (false)
        props.addTextboxHandler({
          position: {
            x: current.x,
            y: current.y,
            w: p5.mouseX - current.x,
            h: p5.mouseY - current.y,
          },
          text: text,
          title: 'Textbox #3',
          padding: padding,
        });

      current = {};
    });

    // cnv.mouseDragged(event => {});
  };

  const mouseDragged = p5 => {
    if (
      p5.mouseX > imgcoords.x &&
      p5.mouseX < imgcoords.x + 130 &&
      p5.mouseY > imgcoords.y &&
      p5.mouseY < imgcoords.y + 70
    ) {
      console.log(p5.mouseX, p5.mouseY);
      imgcoords.x = p5.mouseX - 65;
      imgcoords.y = p5.mouseY - 20;
    }
  };

  const draw = p5 => {
    p5.background(255);

    // p5.rect(10, 10, 10, 10);

    p5.image(img, imgcoords?.x, imgcoords?.y, 130, 70);

    rectArray.forEach(rect => {
      p5.rect(...Object.values(rect.position));
      const transformed = transformPadding(rect);
      p5.text(rect.text, ...Object.values(transformed));
    });

    if (false)
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
    // p5.text('mouseX: ' + p5.mouseX, 10, 30);
    // p5.text('mouseY: ' + p5.mouseY, 10, 40);
  };

  const transformPadding = rect => {
    return {
      x: rect.position.x + rect.padding,
      y: rect.position.y + rect.padding,
      w: rect.position.w - rect.padding,
      h: rect.position.h - rect.padding,
    };
  };

  const preload = p5 => {
    console.log('preload');
    img = p5.loadImage('http://localhost:8080/main/barcode');
  };

  return (
    <Box p={'3rem'}>
      <Box boxShadow={'dark-lg'} bg={'teal.200'}>
        <Sketch
          id={'mainCanvas'}
          setup={setup}
          draw={draw}
          preload={preload}
          mouseDragged={mouseDragged}
        />
      </Box>
    </Box>
  );
};

export default SketchComponent;

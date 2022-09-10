import { Box } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect } from 'react';
import Sketch from 'react-p5';

let padding = 0;
let text = 'Computer cleaning spray (compressed)';
let rectArray = [];
let selectedTemplate = '1';
let img;
let barcodedata = {
  x: 0,
  y: 0,
  w: 130,
  h: 70,
  offsetX: 0,
  offsetY: 0,
};
let resizeSize = 10;
let isBeingResized = false;
let isBeingDragged = false;

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
      //   current.x = p5.mouseX;
      //   current.y = p5.mouseY;
      if (mouseIsOverResizeBox(p5)) {
        console.log('pressed on resize');
        isBeingResized = true;
        //the distances from position of the mouse inside the box to the bottom right corner
        barcodedata.offsetX = barcodedata.x + barcodedata.w - p5.mouseX;
        barcodedata.offsetY = barcodedata.y + barcodedata.h - p5.mouseY;
      } else if (mouseIsOver(p5)) {
        console.log('pressed on body');
        isBeingDragged = true;
        barcodedata.offsetX = barcodedata.x - p5.mouseX;
        barcodedata.offsetY = barcodedata.y - p5.mouseY;
      }
    });
    cnv.mouseReleased(event => {
      isBeingResized = false;
      isBeingDragged = false;
      //   if (false)
      //     props.addTextboxHandler({
      //       position: {
      //         x: current.x,
      //         y: current.y,
      //         w: p5.mouseX - current.x,
      //         h: p5.mouseY - current.y,
      //       },
      //       text: text,
      //       title: 'Textbox #3',
      //       padding: padding,
      //     });
      //   current = {};
    });

    // cnv.mouseDragged(event => {});
  };

  //   const mouseDragged = p5 => {
  //     const buffer = 20;
  //     if (
  //       p5.mouseX > barcodedata.x - buffer &&
  //       p5.mouseX < barcodedata.x + barcodedata.w + buffer &&
  //       p5.mouseY > barcodedata.y - buffer &&
  //       p5.mouseY < barcodedata.y + barcodedata.h + buffer
  //     ) {
  //       //   console.log(p5.mouseX, p5.mouseY);
  //       //   barcodedata.w = p5.mouseX;
  //       //   barcodedata.x = p5.mouseX - 65;
  //       //   barcodedata.y = p5.mouseY - 20;
  //     }
  //   };

  const draw = p5 => {
    p5.background(255);
    p5.image(img, barcodedata?.x, barcodedata?.y, barcodedata.w, barcodedata.h);
    if (isBeingDragged) {
      console.log('isBeingDragged');
      barcodedata.x = p5.mouseX + barcodedata.offsetX;
      barcodedata.y = p5.mouseY + barcodedata.offsetY;
    }

    if (mouseIsOver(p5) || isBeingResized) {
      var resizeX = barcodedata.x + barcodedata.w - resizeSize;
      var resizeY = barcodedata.y + barcodedata.h - resizeSize;
      p5.rect(resizeX, resizeY, resizeSize, resizeSize);
    }

    if (isBeingResized) {
      //   if (p5.mouseX - barcodedata.x + barcodedata.offsetX > this.minimumWidth) {
      barcodedata.w = p5.mouseX - barcodedata.x + barcodedata.offsetX;
      console.log(barcodedata.offsetX);
      //   } else {
      //     this.width = this.minimumWidth;
      //   }
      //   if (p5.mouseY - this.y + this.offsetY > this.minimumHeight) {
      barcodedata.h = p5.mouseY - barcodedata.y + barcodedata.offsetY;
      //   } else {
      //     this.height = this.minimumHeight;
      //   }
    }

    // if (mouseIsOver(p5)) console.log('mouseIsOver');
    // if (mouseIsOverResizeBox(p5)) console.log('ResizeBox');

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

  const mouseIsOver = p5 => {
    return (
      p5.mouseX > barcodedata.x &&
      p5.mouseY > barcodedata.y &&
      p5.mouseX < barcodedata.x + barcodedata.w &&
      p5.mouseY < barcodedata.y + barcodedata.h
    );
  };
  const mouseIsOverResizeBox = p5 => {
    return (
      p5.mouseX > barcodedata.x + barcodedata.w - resizeSize &&
      p5.mouseY > barcodedata.y + barcodedata.h - resizeSize &&
      p5.mouseX < barcodedata.x + barcodedata.w &&
      p5.mouseY < barcodedata.y + barcodedata.h
    );
  };

  return (
    <Box p={'3rem'}>
      <Box boxShadow={'dark-lg'} bg={'teal.200'} cursor={'move'}>
        <Sketch
          id={'mainCanvas'}
          setup={setup}
          draw={draw}
          preload={preload}
          //   mouseDragged={mouseDragged}
        />
      </Box>
    </Box>
  );
};

export default SketchComponent;

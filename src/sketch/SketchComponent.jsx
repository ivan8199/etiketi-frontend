import { Box } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Sketch from 'react-p5';

// let padding = 0;
// let text = 'Computer cleaning spray (compressed)';
let rectArray = [];
let barcodeArray = [];
let selectedTemplate = '1';
let textboxFormData = {};
let barcodeFormData = {};
// let img;
// let barcodedata = {
//   x: 0,
//   y: 0,
//   w: 130,
//   h: 70,
//   offsetX: 0,
//   offsetY: 0,
// };
let resizeSize = 10;
let isBeingResized = false;
let isBeingDragged = false;

let current = {};
let img;

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

// NONE, MOVE, DRAW, RESIZE
let controlStatus = 'NONE';

let errorimg;

// let selectedControl;

const SketchComponent = props => {
  useEffect(() => {
    current = props.Current;
    console.log(current);
  }, [props.Current]);

  useEffect(() => {
    controlStatus = props.controlStatus;
    console.log(controlStatus);
  }, [props.controlStatus]);

  useEffect(() => {
    textboxFormData = props.textboxFormData;
  }, [props.textboxFormData]);

  useEffect(() => {
    barcodeFormData = props.barcodeFormData;
    img = p5hold.loadImage(
      `https://etiketi-backend.herokuapp.com/main/barcode/${barcodeFormData.barcode}`
    );
    current.img = img;
    console.log('barcodeFormData', barcodeFormData);
  }, [props.barcodeFormData]);

  useEffect(() => {
    rectArray = props.textboxArray;
  }, [props.textboxArray]);

  useEffect(() => {
    barcodeArray = props.barcodeArray;
  }, [props.barcodeArray]);

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
      if (controlStatus === 'DRAW' || controlStatus === 'BARCODE') {
        current.img = p5.loadImage(
          `https://etiketi-backend.herokuapp.com/main/barcode/${barcodeFormData.barcode}`
        );
        current.x = p5.mouseX;
        current.y = p5.mouseY;
      } else if (controlStatus === 'MOVE' || controlStatus === 'MOVEBARCODE') {
        if (mouseIsOverResizeBox(p5)) {
          isBeingResized = true;
          current.offsetX = current.x + current.w - p5.mouseX;
          current.offsetY = current.y + current.h - p5.mouseY;
        } else if (mouseIsOver(p5)) {
          isBeingDragged = true;
          current.offsetX = current.x - p5.mouseX;
          current.offsetY = current.y - p5.mouseY;
        }
      }
    });
    cnv.mouseReleased(event => {
      if (controlStatus === 'DRAW' || controlStatus === 'BARCODE') {
        current.w = p5.mouseX - current.x;
        current.h = p5.mouseY - current.y;

        if (controlStatus === 'BARCODE') controlStatus = 'MOVEBARCODE';
        else controlStatus = 'MOVE';
        console.log(controlStatus);
      } else if (controlStatus === 'MOVE' || controlStatus === 'MOVEBARCODE') {
        isBeingResized = false;
        isBeingDragged = false;
      }

      // console.log(img);
      props.setCurrent(current);
    });
  };

  const drawTextbox = (p5, rect, selected) => {
    p5.push();

    let position = rect.position;
    if (selected) {
      p5.stroke(p5.color('#3182ce'));
      p5.strokeWeight(rect.border + 7);
      p5.rect(position.x, position.y, position.w, position.h);
    }
    p5.stroke(p5.color(rect.borderColor));
    p5.strokeWeight(rect.border);
    p5.fill(p5.color(rect.bgColor));
    p5.rect(position.x, position.y, position.w, position.h);
    p5.textSize(rect.fontSize);
    p5.strokeWeight(rect.fontWeight);
    p5.stroke(p5.color(rect.fontColor));
    p5.fill(p5.color(rect.fontColor));
    p5.text(
      rect.text,
      position.x + rect.padding,
      position.y + rect.padding,
      position.w - rect.padding,
      position.h - rect.padding
    );

    p5.pop();
  };
  const drawBarcode = (p5, rect, selected) => {
    p5.push();

    // console.log('rect', rect);
    let position = rect.position;
    let selectedImage = position.img ? position.img : img;

    if (selected) {
      p5.stroke(p5.color('#3182ce'));
      p5.strokeWeight(7);
      p5.rect(position.x, position.y, position.w, position.h);
    }

    p5.imageMode(p5.CENTER);
    p5.angleMode(p5.DEGREES);
    p5.translate(position.x + position.w / 2, position.y + position.h / 2);
    p5.rotate(position.rotation);

    if (position.rotation === 0 || position.rotation === 180)
      p5.image(selectedImage, 0, 0, position.w, position.h);
    else p5.image(selectedImage, 0, 0, position.h, position.w);
    p5.pop();
  };

  const draw = p5 => {
    p5.background(255);
    p5.text(p5.mouseX + ':' + p5.mouseY, 0, 0, 10, 10);
    rectArray.forEach(rect => {
      drawTextbox(p5, rect);
    });

    barcodeArray.forEach(rect => {
      drawBarcode(p5, rect);
    });
    if (controlStatus === 'DRAW') {
      if (Object.keys(current).length !== 0) {
        drawTextbox(p5, {
          position: {
            x: current.x,
            y: current.y,
            w: p5.mouseX - current.x,
            h: p5.mouseY - current.y,
          },
          text: textboxFormData.text,
          fontSize: textboxFormData.fontSize,
          fontWeight: textboxFormData.fontWeight,
          padding: textboxFormData.padding,
          border: textboxFormData.border,
          fontColor: textboxFormData.fontColor,
          bgColor: textboxFormData.bgColor,
          borderColor: textboxFormData.borderColor,
        });
      }
    } else if (controlStatus === 'BARCODE') {
      if (Object.keys(current).length !== 0) {
        drawBarcode(p5, {
          position: {
            x: current.x,
            y: current.y,
            w: p5.mouseX - current.x,
            h: p5.mouseY - current.y,
            rotation: barcodeFormData.rotation,
          },
        });
      }
    } else if (controlStatus === 'MOVE' || controlStatus === 'MOVEBARCODE') {
      if (Object.keys(current).length !== 0) {
        if (controlStatus === 'MOVEBARCODE') {
          // console.log('barcodeFormData.rotation', barcodeFormData.rotation);
          drawBarcode(
            p5,
            {
              position: {
                x: current.x,
                y: current.y,
                w: current.w,
                h: current.h,
                rotation: barcodeFormData.rotation,
              },
            },
            true
          );
        } else {
          drawTextbox(
            p5,
            {
              position: {
                x: current.x,
                y: current.y,
                w: current.w,
                h: current.h,
              },
              text: textboxFormData.text,
              fontSize: textboxFormData.fontSize,
              fontWeight: textboxFormData.fontWeight,
              padding: textboxFormData.padding,
              border: textboxFormData.border,
              fontColor: textboxFormData.fontColor,
              bgColor: textboxFormData.bgColor,
              borderColor: textboxFormData.borderColor,
            },
            true
          );
        }
      }

      if (isBeingDragged) {
        current.x = p5.mouseX + current.offsetX;
        current.y = p5.mouseY + current.offsetY;
      }

      if (mouseIsOver(p5) || isBeingResized) {
        var resizeX = current.x + current.w - resizeSize;
        var resizeY = current.y + current.h - resizeSize;

        p5.stroke(p5.color('#3182ce'));
        p5.strokeWeight(4);
        p5.rect(resizeX, resizeY, resizeSize, resizeSize);
      }

      if (isBeingResized) {
        current.w = p5.mouseX - current.x + current.offsetX;
        current.h = p5.mouseY - current.y + current.offsetY;
      }
    }
  };

  const preload = p5 => {
    console.log('preload');
    // img = p5.loadImage('https://etiketi-backend.herokuapp.com/main/barcode/12345671');
  };

  const mouseIsOver = p5 => {
    return (
      p5.mouseX > current.x &&
      p5.mouseY > current.y &&
      p5.mouseX < current.x + current.w &&
      p5.mouseY < current.y + current.h
    );
  };
  const mouseIsOverResizeBox = p5 => {
    return (
      p5.mouseX > current.x + current.w - resizeSize &&
      p5.mouseY > current.y + current.h - resizeSize &&
      p5.mouseX < current.x + current.w &&
      p5.mouseY < current.y + current.h
    );
  };

  return (
    <Box p={'3rem'}>
      <Box boxShadow={'dark-lg'} bg={'teal.200'}>
        <Sketch id={'mainCanvas'} setup={setup} draw={draw} preload={preload} />
      </Box>
    </Box>
  );
};

export default SketchComponent;

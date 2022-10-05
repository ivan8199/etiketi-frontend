import { Box } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import Sketch from 'react-p5';
import { CONTROL_STATUS, RECT_TYPE, TEMPLATE_TYPE } from '../dashboard/enums';

let selectedTemplate = 1;
let resizeSize = 10;
let isBeingResized = false;
let isBeingDragged = false;
let current = {};
let rectType = RECT_TYPE.TXT;
let img;
let p5hold;
let controlStatus = CONTROL_STATUS.IDLE;

let rectArray = [];
let rectFormData = {};

const SketchComponent = props => {
  useEffect(() => {
    selectedTemplate = props.selectedTemplate;
  }, [props.selectedTemplate]);

  useEffect(() => {
    current = props.currentRect;
    console.log('useEffect CURRENT:', props.currentRect);
  }, [props.currentRect]);

  useEffect(() => {
    controlStatus = props.controlStatus;
    console.log('useEffect CONTROL STATUS:', controlStatus);
  }, [props.controlStatus]);

  useEffect(() => {
    rectArray = props.rectArray;
  }, [props.rectArray]);

  useEffect(() => {
    rectFormData = props.rectFormData;

    if (rectFormData.barcode) {
      // TODO da se stavi env variable
      img = p5hold.loadImage(
        `https://etiketi-backend.herokuapp.com/main/barcode/${rectFormData.barcode}`
      );
      console.log('current.bar.im', current);
      current.bar = { img: img };
    }
  }, [props.rectFormData]);

  useEffect(() => {
    rectType = props.rectType;
  }, [props.rectType]);

  const setup = (p5, canvasParentRef) => {
    p5hold = p5;

    props.setp5hold(p5);

    const cnv = p5
      .createCanvas(
        TEMPLATE_TYPE?.[selectedTemplate]?.w,
        TEMPLATE_TYPE?.[selectedTemplate]?.h
      )
      .parent(canvasParentRef);

    cnv.mousePressed(event => {
      if (controlStatus === CONTROL_STATUS.DRAW) {
        // TODO zaso ovde se loada
        current.bar.img = p5.loadImage(
          `https://etiketi-backend.herokuapp.com/main/barcode/${rectFormData.barcode}`
        );
        current.x = p5.mouseX;
        current.y = p5.mouseY;
      } else if (controlStatus === CONTROL_STATUS.MOVE) {
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
      if (controlStatus === CONTROL_STATUS.DRAW) {
        current.w = p5.mouseX - current.x;
        current.h = p5.mouseY - current.y;
        controlStatus = CONTROL_STATUS.MOVE;
      } else if (controlStatus === CONTROL_STATUS.MOVE) {
        isBeingResized = false;
        isBeingDragged = false;
      }

      props.setCurrent(current);
    });
  };

  const drawRectangle = (p5, rect, selected) => {
    p5.push();

    let position = rect.position;

    if (selected) {
      p5.stroke(p5.color('#3182ce'));
      p5.strokeWeight(rect.type === RECT_TYPE.TXT ? rect.txt.border + 7 : 7);
      p5.rect(position.x, position.y, position.w, position.h);
    }

    if (rect.type === RECT_TYPE.TXT) drawText(p5, rect);
    else if (rect.type === RECT_TYPE.BAR) drawBarcode(p5, rect);

    p5.pop();
  };

  const drawText = (p5, rect) => {
    let position = rect.position;
    let txt = rect.txt;

    p5.stroke(p5.color(txt.borderColor));
    p5.strokeWeight(txt.border);
    p5.fill(p5.color(txt.bgColor));
    p5.rect(position.x, position.y, position.w, position.h);
    p5.textSize(txt.fontSize);
    p5.strokeWeight(txt.fontWeight);
    p5.stroke(p5.color(txt.fontColor));
    p5.fill(p5.color(txt.fontColor));
    p5.text(
      txt.text,
      position.x + txt.padding,
      position.y + txt.padding,
      position.w - txt.padding,
      position.h - txt.padding
    );
  };

  const drawBarcode = (p5, rect) => {
    let position = rect.position;
    console.log(rect, img);
    let selectedImage =
      rect.bar.img === 'load'
        ? loadImage(rect)
        : rect.bar.img
        ? rect.bar.img
        : img;

    p5.imageMode(p5.CENTER);
    p5.angleMode(p5.DEGREES);
    p5.translate(position.x + position.w / 2, position.y + position.h / 2);
    p5.rotate(rect.bar?.rotation);

    if (rect.bar?.rotation === 0 || rect.bar?.rotation === 180)
      p5.image(selectedImage, 0, 0, position.w, position.h);
    else p5.image(selectedImage, 0, 0, position.h, position.w);
  };

  const draw = p5 => {
    p5.background(255);
    rectArray.forEach(rect => {
      drawRectangle(p5, rect);
    });

    if (controlStatus === CONTROL_STATUS.DRAW) {
      if (Object.keys(current).length !== 0) {
        drawRectangle(p5, currentRectDraw(p5));
      }
    } else if (controlStatus === CONTROL_STATUS.MOVE) {
      if (Object.keys(current).length !== 0) {
        drawRectangle(p5, currentRectMove(), true);
      }

      if (isBeingDragged) {
        current.x = p5.mouseX + current.offsetX;
        current.y = p5.mouseY + current.offsetY;
      }

      if (mouseIsOver(p5) || isBeingResized) {
        let resizeX = current.x + current.w - resizeSize;
        let resizeY = current.y + current.h - resizeSize;

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

  const loadImage = rect => {
    // TODO da se stavi env variable
    const tempImg = p5hold.loadImage(
      `https://etiketi-backend.herokuapp.com/main/barcode/${rect.bar.code}`
    );
    rect.bar.img = tempImg;

    return tempImg;
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

  const currentRectDraw = p5 => {
    return {
      type: rectType,
      position: {
        x: current.x,
        y: current.y,
        w: p5.mouseX - current.x,
        h: p5.mouseY - current.y,
      },
      txt: {
        text: rectFormData.text,
        fontSize: rectFormData.fontSize,
        fontWeight: rectFormData.fontWeight,
        padding: rectFormData.padding,
        border: rectFormData.border,
        fontColor: rectFormData.fontColor,
        bgColor: rectFormData.bgColor,
        borderColor: rectFormData.borderColor,
      },
      bar: {
        rotation: rectFormData.rotation,
      },
    };
  };

  const currentRectMove = () => {
    return {
      type: rectType,
      position: {
        x: current.x,
        y: current.y,
        w: current.w,
        h: current.h,
      },
      txt: {
        text: rectFormData.text,
        fontSize: rectFormData.fontSize,
        fontWeight: rectFormData.fontWeight,
        padding: rectFormData.padding,
        border: rectFormData.border,
        fontColor: rectFormData.fontColor,
        bgColor: rectFormData.bgColor,
        borderColor: rectFormData.borderColor,
      },
      bar: {
        rotation: rectFormData.rotation,
      },
    };
  };

  return (
    <Box p={'3rem'}>
      <Box boxShadow={'dark-lg'} bg={'teal.200'}>
        <Sketch id={'mainCanvas'} setup={setup} draw={draw} />
      </Box>
    </Box>
  );
};

export default SketchComponent;

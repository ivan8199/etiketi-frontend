import { Box } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect } from 'react';
import Sketch from 'react-p5';

let x1 = 0;
let y1 = 0;
let padding = 0;

let text = 'Computer cleaning spray (compressed)';

let rectArray = [];

let current = {};
let img;

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

  const setup = (p5, canvasParentRef) => {
    const cnv = p5.createCanvas(198, 120).parent(canvasParentRef);

    cnv.mousePressed(event => {
      current.x = p5.mouseX;
      current.y = p5.mouseY;
    });
    cnv.mouseReleased(event => {
      console.log('released');
      //   rectArray.push({
      //     position: {
      //       x: current.x,
      //       y: current.y,
      //       w: p5.mouseX - current.x,
      //       h: p5.mouseY - current.y,
      //     },
      //     text: text,

      //     padding: padding,
      //   });

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

      console.log(cnv);
      const canvas = document.getElementById('defaultCanvas0');
      canvas.toBlob(async blob => {
        var formData = new FormData();
        formData.append('canvas', blob);

        axios
          .post(
            // 'http://localhost:8080/main/download',
            'https://etiketi-backend.herokuapp.com/main/download',

            formData,
            {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
              responseType: 'blob',
            }
          )
          .then(response => {
            console.log(response);
            // create file link in browser's memory
            const href = URL.createObjectURL(
              new Blob([response.data], { type: 'application/pdf' })
            );

            // create "a" HTLM element with href to file & click
            const link = document.createElement('a');
            link.href = href;
            link.setAttribute('download', 'file.pdf'); //or any other extension
            document.body.appendChild(link);
            link.click();

            // clean up "a" element & remove ObjectURL
            document.body.removeChild(link);
            //   URL.revokeObjectURL(url);
          });
        console.log(blob);
      }, 'image/png');
      console.log(img);
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
      p5.text(rect.text, ...Object.values(transformed));
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

    // p5.image(img, 0, 0, 100, 100);
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
  };

  return (
    <Box width={'50%'} p={'3rem'}>
      <Box boxShadow={'lg'}>
        <Sketch id={'mainCanvas'} setup={setup} draw={draw} preload={preload} />
      </Box>
    </Box>
  );
};

export default SketchComponent;

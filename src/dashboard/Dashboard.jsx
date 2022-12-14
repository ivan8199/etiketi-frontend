import { Container, Flex, Input, VStack } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import SelectMenu from '../sketch/SelectMenu';
import SketchComponent from '../sketch/SketchComponent';
import { CONTROL_STATUS, RECT_TYPE, TEMPLATE_TYPE } from '../utility/enums';
import { apiurl, getDefaultRectangleFormData } from '../utility/utils';

import DashboardTabs from './DashboardTabs';

const Dashboard = () => {
  const [selectedTemplate, setSelectedTemplate] = useState(1);
  const [controlStatus, setControlStatus] = useState(CONTROL_STATUS.IDLE);
  const [rectType, setRectType] = useState(RECT_TYPE.TXT);

  const [current, setCurrent] = useState({});
  const [rectFormData, setRectFormData] = useState(
    getDefaultRectangleFormData(RECT_TYPE.TXT)
  );
  const [rectArray, setRectArray] = useState([]);

  const [p5hold, setp5hold] = useState({});

  const onFormDataChange = value => {
    setRectFormData(prev => {
      return { ...prev, ...value };
    });
  };

  useEffect(() => {
    console.log('rectArray', rectArray);
  }, [rectArray]);

  const addRectangle = rectType => {
    const editedRect = {
      id: rectFormData.id ? rectFormData.id : uuidv4(),
      type: rectType,
      position: {
        x: current.x,
        y: current.y,
        w: current.w,
        h: current.h,
      },
      code: rectType === RECT_TYPE.TXT ? rectFormData.text : rectFormData.code,
      img:
        rectType === RECT_TYPE.IMG || rectType === RECT_TYPE.BAR
          ? {
              data: 'load',
              rotation: rectFormData.rotation,
            }
          : {},
      txt:
        rectType === RECT_TYPE.TXT
          ? {
              text: rectFormData.text,
              fontSize: rectFormData.fontSize,
              fontWeight: rectFormData.fontWeight,
              padding: rectFormData.padding,
              border: rectFormData.border,
              fontColor: rectFormData.fontColor,
              bgColor: rectFormData.bgColor,
              borderColor: rectFormData.borderColor,
            }
          : {},
    };

    // ### replace same index of array
    //
    if (rectFormData.id) {
      setRectArray(prevArray =>
        prevArray.map(rect => (rect.id !== editedRect.id ? rect : editedRect))
      );
    } else {
      setRectArray(prev => [...prev, editedRect]);
    }

    // CLEAR CURRENT
    setCurrent({});

    // CLEAR FORM DATA
    setRectFormData(getDefaultRectangleFormData());

    // RESET STATUS
    setControlStatus(CONTROL_STATUS.IDLE);
  };

  const selectRectangle = selectedId => {
    const selectedRect = rectArray.filter(rect => {
      return rect.id === selectedId;
    })[0];

    setCurrent(selectedRect.position);

    if (selectedRect.type === RECT_TYPE.TXT)
      setRectFormData({ ...selectedRect.txt, id: selectedRect.id });
    else if (
      selectedRect.type === RECT_TYPE.BAR ||
      selectedRect.type === RECT_TYPE.IMG
    ) {
      setRectFormData({
        ...selectedRect.img,
        code: selectedRect.code,
        id: selectedRect.id,
      });
    }
    setRectType(selectedRect.type);
    setControlStatus(CONTROL_STATUS.MOVE);
  };

  const deleteRectangle = selectedId => {
    if (rectFormData.id === selectedId) {
      setCurrent({});
      setRectFormData(getDefaultRectangleFormData(rectType));
      setControlStatus(CONTROL_STATUS.IDLE);
    }
    setRectArray(prev =>
      prev.filter(x => {
        return x.id !== selectedId;
      })
    );
  };

  const onSelectedChangeHandler = event => {
    setSelectedTemplate(event.target.value);
  };

  const exportJsonHandler = () => {
    const exportData = {
      rectArray: rectArray.map(rect => {
        if (rect.type === RECT_TYPE.BAR || rect.type === RECT_TYPE.IMG) {
          return { ...rect, img: { ...rect.img, data: 'load' } };
        } else return rect;
      }),
      selectedTemplate: selectedTemplate,
    };
    console.log(exportData);

    const blob = new Blob([JSON.stringify(exportData)], {
      type: 'text/json',
    });
    const link = document.createElement('a');

    link.download = 'export.json';
    link.href = window.URL.createObjectURL(blob);
    link.dataset.downloadurl = ['text/json', link.download, link.href].join(
      ':'
    );

    const evt = new MouseEvent('click', {
      view: window,
      bubbles: true,
      cancelable: true,
    });

    link.dispatchEvent(evt);
    link.remove();
  };

  // import ne raboti heroku e spor ne gi cita barkodovite 500
  const importJsonHandler = e => {
    const fileReader = new FileReader();
    console.log(e.target.files[0]);
    fileReader.readAsText(e.target.files[0], 'UTF-8');
    fileReader.onload = e => {
      const importedData = JSON.parse(e.target.result);
      setRectArray(importedData.rectArray);
      setSelectedTemplate(importedData.selectedTemplate);
      createCanvasSelected(importedData.selectedTemplate);
    };
  };

  const importImageHandler = e => {
    var formData = new FormData();
    formData.append('image', e.target.files[0]);
    axios
      .post(`${apiurl}upload-image`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(response => {
        onFormDataChange({ code: response.data });
      });
  };

  const createCanvas = () => {
    p5hold?.resizeCanvas(
      TEMPLATE_TYPE?.[selectedTemplate]?.w,
      TEMPLATE_TYPE?.[selectedTemplate]?.h
    );
  };

  const createCanvasSelected = selectedTemplate => {
    p5hold?.resizeCanvas(
      TEMPLATE_TYPE?.[selectedTemplate]?.w,
      TEMPLATE_TYPE?.[selectedTemplate]?.h
    );
  };

  return (
    <Container maxW={'1280px'}>
      <Flex>
        <VStack width={'50%'}>
          <Input
            type="file"
            onChange={importJsonHandler}
            id={'fileupload'}
            display={'none'}
            accept={'application/json'}
          />
          <Input
            type="file"
            onChange={importImageHandler}
            id={'fileupload2'}
            display={'none'}
          />
          <SelectMenu
            selectedTemplate={selectedTemplate}
            onChange={onSelectedChangeHandler}
            exportJson={exportJsonHandler}
            createCanvas={createCanvas}
          />
          <SketchComponent
            selectedTemplate={selectedTemplate}
            currentRect={current}
            setCurrent={setCurrent}
            controlStatus={controlStatus}
            rectFormData={rectFormData}
            rectArray={rectArray}
            setp5hold={setp5hold}
            rectType={rectType}
          />
        </VStack>
        <DashboardTabs
          controlStatus={controlStatus}
          setControlStatus={setControlStatus}
          currentDisabled={Object.keys(current).length !== 0}
          rectArray={rectArray}
          rectFormData={rectFormData}
          addRectangle={addRectangle}
          onFormDataChange={onFormDataChange}
          selectRectangle={selectRectangle}
          deleteRectangle={deleteRectangle}
          setRectType={setRectType}
        />
      </Flex>
    </Container>
  );
};

export default Dashboard;

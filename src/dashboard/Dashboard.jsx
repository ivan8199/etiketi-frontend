import { Button, Container, Flex, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import SelectMenu from '../sketch/SelectMenu';
import SketchComponent from '../sketch/SketchComponent';
import DashboardTabs from './DashboardTabs';
import { v4 as uuidv4 } from 'uuid';
const demo1text = [
  {
    position: {
      x: 5,
      y: 6,
      w: 73,
      h: 42,
    },
    text: 'MK',
    fontSize: 36,
    fontWeight: 1.53,
    padding: 6,
    border: 0,
    fontColor: '#000',
    bgColor: '#fff',
    borderColor: '#000',
    id: '4a8c3f4a-ce2d-45d9-a59d-af0fd769a70f',
  },
  {
    position: {
      x: 72,
      y: 12,
      w: 223,
      h: 35,
    },
    text: 'ПРАСКА НЕКТАР. Произведен од концентрирано пире од праска.',
    fontSize: 14,
    fontWeight: 1.12,
    padding: 1,
    border: 0,
    fontColor: '#000',
    bgColor: '#fff',
    borderColor: '#000',
    id: '33ba5261-1652-4af8-9f89-a96ccaa5c356',
  },
  {
    position: {
      x: 5,
      y: 47,
      w: 295,
      h: 67,
    },
    text: 'Содржина на овошје 50% минимум. Состојки концентрирано пире од праска, вода, шеќер, киселина (лимонска киселина), антиоксидант (аскробинска киселина)',
    fontSize: 14,
    fontWeight: 0.3,
    padding: 1,
    border: 0,
    fontColor: '#000',
    bgColor: '#fff',
    borderColor: '#000',
    id: 'db4be2ae-0351-49e5-9cc1-0ddce60af100',
  },
];

const demo1barcode = [
  {
    barcode: '123456778',
    id: 'dc6c4476-2b6a-47a7-91ec-1ea0c728401f',
    position: { x: 15, y: 122, w: 271, h: 80 },
  },
];

const defaultTextboxFormData = {
  text: '',
  fontSize: 14,
  fontWeight: 0.2,
  fontColor: '#000',
  border: 1,
  padding: 1,
  bgColor: '#fff',
  borderColor: '#000',
};

const defaultBarcodeFormData = {
  barcode: '11111111',
  rotation: 0,
  img: {},
};

const Dashboard = () => {
  const [current, setCurrent] = useState({});
  const [controlStatus, setControlStatus] = useState('NONE');
  const [selectedTemplate, setSelectedTemplate] = useState('1');
  const [textboxArray, setTextboxArray] = useState([]);
  const [barcodeArray, setBarcodeArray] = useState([]);

  const [textboxFormData, setTextboxFormData] = useState(
    defaultTextboxFormData
  );

  const [barcodeFormData, setBarcodeFormData] = useState(
    defaultBarcodeFormData
  );

  const onFormDataChange = value => {
    setTextboxFormData(prev => {
      return { ...prev, ...value };
    });
  };

  const onBarcodeFormDataChange = value => {
    setBarcodeFormData(prev => {
      // console.log({ ...prev, ...value });
      return { ...prev, ...value };
    });
  };

  const addBarcode = () => {
    // console.log(barcodeArray);
    if (barcodeFormData.id) {
      setBarcodeArray(prev =>
        prev.filter(x => {
          return x.id !== barcodeFormData.id;
        })
      );
    }
    // console.log(current.img);
    setBarcodeArray(prev => [
      ...prev,
      {
        position: {
          x: current.x,
          y: current.y,
          w: current.w,
          h: current.h,
          img: current.img,
          rotation: barcodeFormData.rotation,
        },
        barcode: barcodeFormData.barcode,

        id: uuidv4(),
      },
    ]);
    setCurrent({});
    setBarcodeFormData(defaultBarcodeFormData);
    setControlStatus('NONE');
    // console.log(barcodeArray);

    console.log('added');
  };

  useEffect(() => {
    console.log(barcodeArray);
  }, [barcodeArray]);

  const addTextbox = () => {
    if (textboxFormData.id) {
      setTextboxArray(prev =>
        prev.filter(x => {
          return x.id !== textboxFormData.id;
        })
      );
    }
    setTextboxArray(prev => [
      ...prev,
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
        id: uuidv4(),
      },
    ]);
    setCurrent({});
    setTextboxFormData(defaultTextboxFormData);
    setControlStatus('NONE');
  };

  const selectCurrent = selectedId => {
    const selected = textboxArray.filter(x => {
      return x.id === selectedId;
    })[0];
    setCurrent(selected.position);
    setTextboxFormData(selected);
    setControlStatus('MOVE');
  };

  const selectCurrentBarcode = selectedId => {
    const selected = barcodeArray.filter(x => {
      return x.id === selectedId;
    })[0];
    setCurrent(selected.position);
    setBarcodeFormData({
      id: selected.id,
      barcode: selected.barcode,
      rotation: selected.position.rotation,
      img: selected.position.img,
    });
    // console.log('selectebarcode', selected);
    setControlStatus('MOVEBARCODE');
  };

  const deleteSelected = selectedId => {
    if (textboxFormData.id === selectedId) {
      setCurrent({});
      setTextboxFormData(defaultTextboxFormData);
      setControlStatus('NONE');
    }
    setTextboxArray(prev =>
      prev.filter(x => {
        return x.id !== selectedId;
      })
    );
  };
  const deleteSelectedBarcode = selectedId => {
    if (barcodeFormData.id === selectedId) {
      setCurrent({});
      setTextboxFormData(defaultBarcodeFormData);
      setControlStatus('NONE');
    }
    setBarcodeArray(prev =>
      prev.filter(x => {
        return x.id !== selectedId;
      })
    );
  };

  const onSelectedChangeHandler = event => {
    setSelectedTemplate(event.target.value);
  };

  const setupDemo = () => {
    setTextboxArray(demo1text);
    setBarcodeArray(demo1barcode);
    setSelectedTemplate(2);
  };

  return (
    <Container maxW={'1280px'}>
      <Flex>
        <VStack width={'50%'}>
          <Button
            size={'xs'}
            variant={'outline'}
            colorScheme={'green'}
            mt={4}
            onClick={setupDemo}
          >
            Click here for demo example!
          </Button>
          <SelectMenu
            selectedTemplate={selectedTemplate}
            onChange={onSelectedChangeHandler}
          />
          <SketchComponent
            selectedTemplate={selectedTemplate}
            textboxFormData={textboxFormData}
            textboxArray={textboxArray}
            addTextboxHandler={addTextbox}
            textValue={textboxFormData?.text}
            controlStatus={controlStatus}
            setCurrent={setCurrent}
            Current={current}
            barcodeArray={barcodeArray}
            barcodeFormData={barcodeFormData}
          />
        </VStack>
        <DashboardTabs
          textboxArray={textboxArray}
          onFormDataChange={onFormDataChange}
          textboxFormData={textboxFormData}
          barcodeFormData={barcodeFormData}
          setControlStatus={setControlStatus}
          controlStatus={controlStatus}
          addTextbox={addTextbox}
          selectCurrent={selectCurrent}
          deleteSelected={deleteSelected}
          addBarcode={addBarcode}
          barcodeArray={barcodeArray}
          selectCurrentBarcode={selectCurrentBarcode}
          deleteSelectedBarcode={deleteSelectedBarcode}
          onBarcodeFormDataChange={onBarcodeFormDataChange}
          currentDisabled={Object.keys(current).length !== 0}
        />
      </Flex>
    </Container>
  );
};

export default Dashboard;

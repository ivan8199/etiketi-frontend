import { Container, Flex, HStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import DashboardTabs from './DashboardTabs';
import SketchComponent from './SketchComponent';

const Dashboard = () => {
  const [padding, setpadding] = useState(0);

  const [textboxFormData, setTextboxFormData] = useState({ text: '' });

  const onTextChange = value => {
    setTextboxFormData(prev => {
      return { ...prev, text: value };
    });
  };

  const [textboxArray, settestboxArray] = useState([
    {
      title: 'Textbox #1',
      text: 'Origin: China',
      position: {
        x: 100,
        y: 100,
        w: 50,
        h: 50,
      },
      padding: 5,
    },
    {
      title: 'Textbox #2',
      text: 'Article: Adjustable height Gaming Chair - Corsair 4000',
      position: {
        x: 200,
        y: 200,
        w: 150,
        h: 100,
      },
      padding: 10,
    },
  ]);

  const addTextbox = textbox => {
    console.log('added', textbox);
    settestboxArray(prev => [...prev, textbox]);
  };

  return (
    <Container maxW={'1280px'}>
      <Flex>
        <SketchComponent
          padding={padding}
          textboxArray={textboxArray}
          addTextboxHandler={addTextbox}
          textValue={textboxFormData?.text}
        />
        <DashboardTabs
          textboxArray={textboxArray}
          onTextChange={onTextChange}
          textValue={textboxFormData?.text}
        />
      </Flex>
    </Container>
  );
};

export default Dashboard;

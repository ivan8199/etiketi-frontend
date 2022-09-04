import { Box, Container, Flex, HStack, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import DashboardTabs from './DashboardTabs';
import SelectMenu from './SelectMenu';
import SketchComponent from './SketchComponent';

const Dashboard = () => {
  const [padding, setpadding] = useState(0);

  const [textboxFormData, setTextboxFormData] = useState({ text: '' });
  const [selectedTemplate, setSelectedTemplate] = useState('2');

  const onTextChange = value => {
    setTextboxFormData(prev => {
      return { ...prev, text: value };
    });
  };

  const [textboxArray, settestboxArray] = useState([]);

  const addTextbox = textbox => {
    console.log('added', textbox);
    settestboxArray(prev => [...prev, textbox]);
  };

  const onSelectedChangeHandler = event => {
    setSelectedTemplate(event.target.value);
    console.log(event.target.value);
  };

  return (
    <Container maxW={'1280px'}>
      <Flex>
        <VStack width={'50%'}>
          <SelectMenu
            value={selectedTemplate}
            onChange={onSelectedChangeHandler}
          />
          <SketchComponent
            selectedTemplate={selectedTemplate}
            padding={padding}
            textboxArray={textboxArray}
            addTextboxHandler={addTextbox}
            textValue={textboxFormData?.text}
          />
        </VStack>
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

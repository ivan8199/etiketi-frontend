import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import React from 'react';
import { TextCardWrapper } from './TextCardWrapper';
import { BarcodeWrapper } from './BarcodeWrapper';
import RectangleWrapper from './RectangleWrapper';
import { RECT_TYPE } from '../utility/enums';

const DashboardTabs = props => {
  return (
    <Box width={'50%'} border={'1px solid #E2E8F0'} mt={4} borderRadius={'lg'}>
      <Tabs isFitted>
        <TabList>
          <Tab>Text</Tab>
          <Tab>Images</Tab>
          <Tab>Barcodes</Tab>
        </TabList>

        <TabPanels>
          <TabPanel key={1} p={0}>
            <TextCardWrapper
              controlStatus={props.controlStatus}
              setControlStatus={props.setControlStatus}
              currentDisabled={props.currentDisabled}
              rectArray={props.rectArray}
              rectFormData={props.rectFormData}
              addRectangle={props.addRectangle}
              onFormDataChange={props.onFormDataChange}
              selectRectangle={props.selectRectangle}
              deleteRectangle={props.deleteRectangle}
              setRectType={props.setRectType}
            />
          </TabPanel>
          <TabPanel key={2} p={0}>
            <RectangleWrapper
              title={'Images'}
              subtitle={'Upload an image and use it in the label'}
              rectArray={props.rectArray}
              rectType={RECT_TYPE.BAR}
            ></RectangleWrapper>
          </TabPanel>
          <TabPanel key={3} p={0}>
            <BarcodeWrapper
              controlStatus={props.controlStatus}
              setControlStatus={props.setControlStatus}
              currentDisabled={props.currentDisabled}
              rectArray={props.rectArray}
              rectFormData={props.rectFormData}
              addRectangle={props.addRectangle}
              onFormDataChange={props.onFormDataChange}
              selectRectangle={props.selectRectangle}
              deleteRectangle={props.deleteRectangle}
              setRectType={props.setRectType}
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default DashboardTabs;

import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import React from 'react';
import { CONTROL_STATUS } from '../utility/enums';
import { BarcodeWrapper } from './BarcodeWrapper';
import { ImageWrapper } from './ImageWrapper';
import { TextCardWrapper } from './TextCardWrapper';

const DashboardTabs = props => {
  const handleImport = () => {
    document.getElementById('fileupload2').click();
  };

  return (
    <Box width={'50%'} border={'1px solid #E2E8F0'} mt={4} borderRadius={'lg'}>
      <Tabs isFitted>
        <TabList>
          <Tab isDisabled={props.controlStatus !== CONTROL_STATUS.IDLE}>
            Text
          </Tab>
          <Tab isDisabled={props.controlStatus !== CONTROL_STATUS.IDLE}>
            Images
          </Tab>
          <Tab isDisabled={props.controlStatus !== CONTROL_STATUS.IDLE}>
            Barcodes
          </Tab>
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
            <ImageWrapper
              handleImport={handleImport}
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

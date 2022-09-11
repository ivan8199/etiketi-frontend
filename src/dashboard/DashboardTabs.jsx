import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import React from 'react';
import { TextCardWrapper } from './TextCardWrapper';
import { BarcodeWrapper } from './BarcodeWrapper';

const DashboardTabs = props => {
  return (
    <Box width={'50%'} border={'1px solid #E2E8F0'} mt={4} borderRadius={'lg'}>
      <Tabs isFitted>
        <TabList>
          <Tab>Text</Tab>
          <Tab isDisabled>Images</Tab>
          <Tab>Barcodes</Tab>
        </TabList>

        <TabPanels>
          <TabPanel key={1} p={0}>
            <TextCardWrapper
              setControlStatus={props.setControlStatus}
              textboxArray={props.textboxArray}
              onFormDataChange={props.onFormDataChange}
              textboxFormData={props.textboxFormData}
              addTextbox={props.addTextbox}
              selectCurrent={props.selectCurrent}
              deleteSelected={props.deleteSelected}
              controlStatus={props.controlStatus}
            />
          </TabPanel>
          <TabPanel key={2}>
            <p>two!</p>
          </TabPanel>
          <TabPanel key={3}>
            <BarcodeWrapper
              setControlStatus={props.setControlStatus}
              barcodeArray={props.barcodeArray}
              onFormDataChange={props.onBarcodeFormDataChange}
              barcodeFormData={props.barcodeFormData}
              addBarcode={props.addBarcode}
              selectCurrent={props.selectCurrentBarcode}
              deleteSelected={props.deleteSelectedBarcode}
              controlStatus={props.controlStatus}
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default DashboardTabs;

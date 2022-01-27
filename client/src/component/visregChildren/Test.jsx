import React, { useState } from 'react';

const Test = ({testSelect, testTimeStamp}) => {
  const [testState, setTestState] = useState('reference');
  //replace with switch statement eventually
  return (
    <div>
      <button onClick={()=>setTestState('reference')}>Reference</button><button onClick={()=>setTestState('test')}>Test</button>
      {testState === 'reference' ?
      <img src={`../../../visreg/${testSelect.domain}/bitmaps_reference/${testSelect.domainTrimmed}_${testSelect.domainTrimmed}${testSelect.index}_0_document_0_desktop.png`}/> :
      <div></div>}
      {testState === 'test' ?
      <img src={`../../../visreg/${testSelect.domain}/bitmaps_test/${testTimeStamp}/${testSelect.domainTrimmed}_${testSelect.domainTrimmed}${testSelect.index}_0_document_0_desktop.png`}/> :
      <div></div>}
    </div>
  )
};

export default Test;
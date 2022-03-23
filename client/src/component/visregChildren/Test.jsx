import React, { useState } from 'react';

const Test = ({testSelect, testTimeStamp, report, selectReport}) => {
  const [testState, setTestState] = useState('reference');
  // if(report[testSelect.url]){
  //   console.log(report[testSelect.url].tests[testSelect.index].status);
  // }
  //replace with switch statement eventually
  return (
    <div className="test">
      <div>
      <button className="button" onClick={()=>setTestState('reference')}>Reference</button><button className="button" onClick={()=>setTestState('test')}>Test</button>
      {selectReport ? (selectReport.status === 'fail' ? <button className="button" onClick={()=>setTestState('diff')}>Diff</button> : <p/>) : <p/>}
      </div>
      {testState === 'reference' ?
      <img src={`../../../visreg/${testSelect.domain}/bitmaps_reference/${testSelect.domainTrimmed}_${testSelect.domainTrimmed}${testSelect.index}_0_document_0_desktop.png`}/> :
      <div></div>}
      {testState === 'test' ?
      <img src={`../../../visreg/${testSelect.domain}/bitmaps_test/${testTimeStamp}/${testSelect.domainTrimmed}_${testSelect.domainTrimmed}${testSelect.index}_0_document_0_desktop.png`}/> :
      <div></div>}
      {testState === 'diff' ?
      <img src={`../../../visreg/${testSelect.domain}/bitmaps_test/${testTimeStamp}/failed_diff_${testSelect.domainTrimmed}_${testSelect.domainTrimmed}${testSelect.index}_0_document_0_desktop.png`}/> :
      <div></div>}
    </div>
  )
};

export default Test;
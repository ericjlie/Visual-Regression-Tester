import React, { useState } from 'react';

const Test = ({testSelect}) => {
  return (
    <div>
      <img src={`../../../visreg/${testSelect.domain}/bitmaps_reference/${testSelect.domainTrimmed}_${testSelect.domainTrimmed}${testSelect.index}_0_document_0_desktop.png`}/>
    </div>
  )
};

export default Test;
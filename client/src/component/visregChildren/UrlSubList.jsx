import React, { useState } from 'react';
import UrlSubEntry from './UrlSubEntry.jsx'

const UrlSubList = ({url, setUrls, setTestSelect, report, setSelectReport}) => {
  const domain = (new URL(url[0])).hostname.replace('www.', '');
  const domainTrimmed = domain.replace('.', '');
  console.log(report)
  return (
    <div>
      <h2>{url[0]}</h2>
      {url.map((sub, i) =><UrlSubEntry key={i} setSelectReport={setSelectReport} index={i} url={url} setTestSelect={setTestSelect} setUrls={setUrls} sub={sub} report={report ? report.tests[i] : null}/>)}
    </div>
  )
};

export default UrlSubList;

//.tests[i].pair
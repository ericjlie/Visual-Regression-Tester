import React, { useState } from 'react';

const UrlSubEntry = ({url, setUrls, setTestSelect, setSelectReport, sub, index, report}) => {
  const domain = (new URL(url[0])).hostname.replace('www.', '')
  const domainTrimmed = domain.replace('.', '')
  const handleClickTest = (i) => {
    setSelectReport(report);
    setTestSelect({
      index: index,
      domain: domain,
      domainTrimmed: domainTrimmed,
      url: sub
    })
  }
  return (
    <div onClick={handleClickTest} key={index}>{sub} {report ?
       (report.status === 'pass' ? '\u2705' : '\u274C')
       : <p/>}</div>
  )
};

export default UrlSubEntry;
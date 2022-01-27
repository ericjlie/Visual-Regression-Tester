import React, { useState } from 'react';

const UrlSubList = ({url, setUrls, setTestSelect}) => {
  const domain = (new URL(url[0])).hostname.replace('www.', '')
  const domainTrimmed = domain.replace('.', '')
  const handleClickTest = (i) => {
    setTestSelect({
      index: i,
      domain: domain,
      domainTrimmed: domainTrimmed,
      url: url[0]
    })
  }
  return (
    <div>
      <h2>{url[0]}</h2>
      {url.map((sub, i) =><div onClick={() => handleClickTest(i)} key={i}>{sub}</div>)}
    </div>
  )
};

export default UrlSubList;
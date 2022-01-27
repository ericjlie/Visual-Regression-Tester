import React, { useState } from 'react';
import UrlSubList from './UrlSubList.jsx';

const UrlList = ({urls, setUrls, setTestSelect}) => {
  return (
    <div>
      <h1>URLs to Test</h1>
      {Object.keys(urls).map((url,i) => <UrlSubList url={urls[url]} key={i} setTestSelect={setTestSelect}/>)}
    </div>
  )
};

export default UrlList;
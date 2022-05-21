import React, { memo } from 'react';
import { history } from 'umi';
import { Button } from 'antd-mobile'
import { BsPhone } from 'react-icons/bs'
function Tel(props) {
  const handleClick = () => {
    history.push({
      pathname: '/user'
    })
  }
  return (
    <div className='ques'>
      <h1>关于</h1>
      <h2>系统名称</h2>
      <p>在线民宿预定系统</p>
      <h2>软件版本</h2>
      <p>V0.1.0</p>
      <h2>开发者</h2>
      <p>李云富</p>
      <h2>上线日期</h2>
      <p>2022年5月1日</p>
      <Button onClick={handleClick} type="primary">返回</Button>
    </div>

  );
}

export default memo(Tel);

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
      <h1>联系客服</h1>
      <BsPhone size={40} /><span style={{ fontSize: 40 }}>13881850611</span>
      <Button onClick={handleClick} type="primary">返回</Button>
    </div>

  );
}

export default memo(Tel);

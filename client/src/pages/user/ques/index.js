import React, { memo } from 'react';
import { history } from 'umi';
import { Button } from 'antd-mobile'
import './index.less'
function Ques(props) {
  const handleClick = () => {
    history.push({
      pathname: '/user'
    })
  }
  return (
    <div className='ques'>
      <h1>常见问题</h1>
      <p>
        <h3>一、登录方式</h3>
        <p>
          用户可以使用系统自带的注册功能进行username和password的注册。
        </p>
        <h3>二、为什么没有头像</h3>
        <p>
          用户初始注册是默认没有头像和个性签名的，需要在用户个人中心进入设置页面进行信息修改。
        </p>
        <h3>三、为什么上传头像失败</h3>
        <p>
          由于本系统默认使用的base64将图片转换之后存入数据库的，所以对图像大小有限制，只能上传0.5M以下的图像。
        </p>
      </p>
      <Button onClick={handleClick} type="primary">返回</Button>
    </div>

  );
}

export default memo(Ques);

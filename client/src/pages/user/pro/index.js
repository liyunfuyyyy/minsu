import React, { memo } from 'react';
import { history } from 'umi';
import { Button } from 'antd-mobile'
function Pro(props) {
  const handleClick = () => {
    history.push({
      pathname: '/user'
    })
  }
  return (
    <div className='home'>
      <h1>用户协议</h1>
      <p>
        <h2>一、隐私政策</h2>
        宜宾民宿无线有限公司（“无线”或者“我们”）向您提供本民宿及相关服务（以下统称“民宿”或“生活服务”）时对您个人信息的收集和使用同时适用本隐私政策。您使用我们的生活服务会导致我们对您个人信息的收集和使用，请仔细阅读本隐私政策，以便了解我们如何处理您提供的个人信息以及您有哪些选择。您承认自己已阅读并理解本隐私政策，并同意我们按照本隐私政策描述的方式收集、使用、存储和处理您的个人信息。后续您可以根据本隐私政策撤回您的同意。如您不同意本隐私政策，请您务必不要继续使用本生活服务。
      </p>
      <Button onClick={handleClick} type="primary">确认</Button>
    </div>

  );
}

export default memo(Pro);

import React, { useState, useEffect } from 'react';
import { List, Button, Modal } from 'antd-mobile';
import { history } from 'umi';
import { useStoreHook } from 'think-react-store';
import { ErrorBoundary } from '@/components';

import './index.less';

export default function (props) {
  const { user: { username, avatar, phone, sign, getUserAsync, logoutAsync } } = useStoreHook();

  const handleClick = () => {
    history.push({
      pathname: '/user/edit',
      query: {
        id: 10
      }
    });
  };
  const handleToMine = () => {
    history.push({
      pathname: '/user/mine'
    })
  }
  const handleLogout = () => {
    logoutAsync();
  };

  useEffect(() => {
    getUserAsync({
      id: 10
    });
  }, [])

  const handleToPro = () => {
    history.push({
      pathname: '/user/pro'
    })
  }
  const handleToQues = () => {
    history.push({
      pathname: '/user/ques'
    })
  }

  const handleToTel = () => {
    history.push({
      pathname: '/user/tel'
    })
  }

  const handleToAbt = () => {
    history.push({
      pathname: '/user/abt'
    })
  }
  return (
    <ErrorBoundary>
      <div className='user-page'>
        {/**用户信息 */}
        <div className='info'>
          <div className='set' onClick={handleClick}>设置</div>
          <div className='user'>
            <img alt='user' src={avatar || require('../../assets/yay.jpg')} onError="javascript:alert('xss')" />
            <div className='tel'>{phone}</div>
            <div className='sign'>{sign}</div>
          </div>
        </div>
        {/**列表 */}
        <div className='lists'>
          <List>
            <List.Item arrow='horizontal' onClick={handleToMine}>
              我的上架
            </List.Item>
            <List.Item arrow='horizontal' onClick={handleToPro}>
              用户协议
            </List.Item>
            <List.Item arrow='horizontal' onClick={handleToQues}>
              常见问题
            </List.Item>
            <List.Item arrow='horizontal' onClick={handleToTel}>
              联系客服
            </List.Item>
            <List.Item arrow='horizontal' onClick={handleToAbt}>
              关于
            </List.Item>
          </List>
        </div>
        <Button style={{ marginTop: '100px' }} onClick={handleLogout}>退出登录</Button>
      </div>
    </ErrorBoundary>
  )
}

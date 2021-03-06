import React, { useState, useEffect } from 'react';
import { Button, Toast } from 'antd-mobile';
import { Http, timer } from '@/utils';
import {QRCodeSVG} from 'qrcode.react';
export default function (props) {
  const [state, setState] = useState()
  const gift=localStorage.getItem('gift')
  const handlePay = async () => {
    const result = await Http({
      url: '/orders/pay',
      body: {
        id: props.id
      }
    });
    if(result){
      Toast.success('支付成功');
      window.location.reload();
    }
  }
  const handleShowQr=()=>{
    if(props.type===1){
      return <QRCodeSVG value="https://www.baidu.com" />
    }
    return
  }
  useEffect(() => {

  }, [])

  const renderPay = () => {
    switch (props.type) {
      case 0:
        return <Button type='warning' size='small' onClick={handlePay}>去支付</Button>
      case 1:
        return <Button size='small'>已完成</Button>
      default:
        break;
    }
  };

  return (
    <div className='order-item' onClick={handleShowQr}>
      <img alt='order' src={props?.house?.imgs[0]?.url} />
      <div className='center'>
        <div className='title'>{props?.house?.name}</div>
        <div className='price'>￥{gift?((props?.house?.price-gift)>0?(props?.house?.price-gift):0):props?.house?.price}</div>
        <div className='time'>{timer(props?.createTime, 'day')}</div>
      </div>
      <div className='pay'>
        {renderPay()}
      </div>
      {handleShowQr()}
    </div>
  )
}

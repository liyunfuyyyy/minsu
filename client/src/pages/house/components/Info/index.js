import React, { useState, useEffect } from 'react';
import { Button } from 'antd-mobile';
import { timer } from '@/utils';

export default function(props){
  const [state, setState] = useState()
  const gift=localStorage.getItem('gift')
  const handleOrder = (id) => {
    props?.btnClick(id)
  }

  const handleClick=(id)=>{
    props?.btnClick(id)
  }
  const renderBtn = () => {
    // order里面没有id，说明订单一定不存在
    if(!props.order?.id){
      if(props.mine){
        return <Button className='info-btn' type='primary' onClick={()=>handleClick()}>下架</Button>
      }else{
        return <Button className='info-btn' type='warning' onClick={()=>handleOrder()}>预定</Button>
      }

    }

    // 已经有订单了，处于未支付状态
    if(props.order?.isPayed === 0){
      return <Button className='info-btn' type='ghost' onClick={()=>handleOrder(props.order.id)}>取消预定</Button>
    }

    // 已经有订单了，处于已支付状态
    if(props.order?.isPayed === 1){
      return <Button className='info-btn' type='ghost'>居住中</Button>
    }


  }

  useEffect(() => {

  }, [])

  return (
    <div className='info'>
      <div className='info-title'>{props?.detail?.name}</div>
      <div className='info-msg'>简介：{props?.detail?.info}</div>
      <div>地址：{props?.detail?.address}</div>
      <div className='info-price'>价格：{gift?((props?.detail?.price-gift)>0?(props?.detail?.price-gift):0):props?.detail?.price}</div>
      <div className='info-time'>发布时间：{timer(props?.detail?.publishTime)}</div>
      <div className='info-time'>开始出租：{timer(props?.detail?.startTime, '')}</div>
      <div className='info-time'>结束出租：{timer(props?.detail?.endTime, '')}</div>
      <div style={{fontWeight:'bold'}}>联系人：{props?.detail?.user?.username}</div>
      <div style={{fontWeight:'bold'}}>联系电话：{props?.detail?.user?.phone}</div>
      {renderBtn()}
    </div>
  )
}

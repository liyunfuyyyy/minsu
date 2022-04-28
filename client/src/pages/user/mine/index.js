import React, { useState, useEffect, memo } from 'react';
import { history } from 'umi';
import { useHttpHook } from '@/hooks';

function Hot(props) {
  const [houses] = useHttpHook({
    url: '/house/mine'
  });

  const handleClick = (id) => {
    history.push({
      pathname: '/house',
      query: {
        id,
        mine:true
      },
    });
  };

  useEffect(() => {

  }, []);

  return (
    <div className='home'>
      <div className='hot'>
        <h1>我上架的</h1>
        <div className='hot-lists'>
          {houses?.map(item => (
            <div className='hot-lists-item' key={item.id} onClick={() => handleClick(item.id)}>
              <img className='img' alt='img' src={item?.imgs[0]?.url} />
              <div className='title'>{item.title}</div>
              <div className='info'>{item.info}</div>
              <div className='price'>￥{item.price}</div>
            </div>
          ))}
        </div>
      </div>
    </div>

  );
}

export default memo(Hot);

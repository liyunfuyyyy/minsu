import React, { useState, useEffect, memo } from 'react';
import { history } from 'umi';

function Hot(props) {
  const [money, setMoney] = useState(0);
  console.log('hot render');
  const handleClick = (id) => {
    history.push({
      pathname: '/house',
      query: {
        id,
      },
    });
  };

  useEffect(() => {
    if (localStorage.getItem('gift')) {
      setMoney(Number(localStorage.getItem('gift')));
    }
  }, []);

  return (
    <div className='hot'>
      <h1>最热民宿</h1>
      <div className='hot-lists'>
        {props?.houses?.map(item => (
          <div className='hot-lists-item' key={item.id} onClick={() => handleClick(item.id)}>
            <img className='img' alt='img' src={item?.imgs[0]?.url} />
            <div className='title'>{item.title}</div>
            <div className='info'>{item.info}</div>
            <div className='' style={{ textDecoration: 'line-through' }}>原价￥{item.price}</div>
            <div className='price'>现价￥{(item.price - money) > 0 ? (item.price - money) : 0}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default memo(Hot);

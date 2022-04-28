import { ErrorBoundary } from '@/components';
import { List, Card, Button, Toast } from 'antd-mobile';
import styles from './index.less';
import { useStoreHook } from 'think-react-store';
import { AntOutline, RightOutline } from 'antd-mobile-icons';
import { useEffect, useState } from 'react';
import { Http } from '@/utils';
import { history } from 'umi';

export default function() {
  const [gifts,setGifts]=useState([])
  const listGift=async ()=>{
    const result = await Http({
      url: '/gift/list',
    });
    if(result){
      setGifts(result)
    }
  }
  const change=async(id)=>{
    const result=await Http({
      url:'/gift/change',
      body:{
        id
      }
    })
    if(result){
      Toast.success('领取成功')
    }
  }

  useEffect(()=>{
    listGift()
  },[])

  const handleClick = (id) => {
    Toast.show('领取成功');
    let temp = gifts;
    temp.forEach((item) => {
      if (item.id === id) {
        item.dis = true;
        change(id)
        localStorage.setItem('gift', item.money)
      }
      return item;
    });
    setGifts([...temp]);

  };
  return (
    <ErrorBoundary>
      <List>
        {gifts.map((item, index) => {
          return (
            <List.Item
              style={{ backgroundColor: '#eee', margin: '10px', borderRadius: '30px' }}
              key={item.id}
            >
              <Card
                title={
                  <div style={{ fontWeight: 'normal' }}>
                    <AntOutline style={{ marginRight: '4px', color: '#1677ff' }} />
                    {item.id}
                  </div>
                }
                extra={<RightOutline />}
                style={{ borderRadius: '16px', backgroundColor: 'pink' }}
              >
                <div className={styles.content}>￥{item.money}无门槛优惠券</div>
                <div className={styles.footer} onClick={(e) => e.stopPropagation()}>
                  <Button
                    className={styles.btn}
                    onClick={() => handleClick(item.id)}
                    disabled={item.dis}
                  >
                    {item.dis ? '已领取' : '点击领取'}
                  </Button>
                </div>
              </Card>
            </List.Item>
          );
        })}
      </List>
    </ErrorBoundary>
  );
}

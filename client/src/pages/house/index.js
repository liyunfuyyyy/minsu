import React, { useState, useEffect } from 'react';
import Banner from './components/Banner';
import Info from './components/Info';
import Lists from './components/Lists';
import Footer from './components/Footer';
import { useStoreHook } from 'think-react-store';
import { useHttpHook, useObserverHook } from '@/hooks';
import { CommonEnum } from '@/enums';
import { useLocation, Link, history } from 'umi';
import { Header } from '@/components/index';
import { Http } from '@/utils';

import './index.less';
import { Toast } from 'antd-mobile';

export default function(props) {
  const {
    house: {
      detail,
      getDetailAsync,
      getCommentsAsync,
      comments,
      reloadComments,
      reloadCommentsNum,
      showLoading,
      resetData,
      order,
      hasOrderAsync,
      addOrderAsync,
      delOrderAsync,
    },
  } = useStoreHook();
  const { query } = useLocation();
  const mine = query?.mine;
  const handleBtnClick = (id) => {
    if (!id) {
      addOrderAsync({
        id: query?.id,
      });
    } else {
      delOrderAsync({
        id: query?.id,
      });
    }
  };
  const delHouse = async () => {
    const result = await Http({
      url: '/house/del',
      body: {
        id: query?.id,
      },
    });
    if (result) {
      console.log(result);
      Toast.success('下架成功');
      history.push('/user/mine');
    } else {
      Toast.fail('下架失败');
      history.push('/user/mine');
    }
  };
  const handleBtnDelClick = () => {
    delHouse();
    console.log('删除房屋', query?.id);
  };
  /**
   * 1，监听loading是否展示出来
   * 2，出发reload，修改分页
   * 3，监听reload变化，重新请求接口
   * 4，拼装数据
   */
  useObserverHook('#' + CommonEnum.LOADING_ID, (entries) => {
    // console.log(entries)
    if (comments && comments.length && showLoading && entries[0].isIntersecting) {
      reloadComments();
    }
  }, [comments, showLoading]);

  useEffect(() => {
    getDetailAsync({
      id: query?.id,
    });
  }, []);

  useEffect(() => {
    getCommentsAsync({
      id: query?.id,
    });
  }, [reloadCommentsNum]);

  useEffect(() => {
    hasOrderAsync({
      id: query?.id,
    });
  }, []);

  useEffect(() => {
    return () => {
      resetData({
        detail: {},
      });
    };
  }, []);

  return (
    <div className='house-page'>
      <Header />
      {/**banner */}
      <Banner banner={detail?.banner} />
      {/**房屋信息 */}
      {mine && !order ? <Info detail={detail?.info} mine={mine} order={order} btnClick={handleBtnDelClick} /> :
        <Info detail={detail?.info} order={order} btnClick={handleBtnClick} />}

      {/**评论列表 */}
      <Lists lists={comments} showLoading={showLoading} />
      {/**footer */}
      <Footer />
    </div>
  );
}

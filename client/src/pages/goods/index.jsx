import React, { useState, useEffect } from 'react';
import { List, ImagePicker, Toast, InputItem, Button, Calendar } from 'antd-mobile';
import { createForm } from 'rc-form';
import { Http } from '@/utils/index';
import { history } from 'umi';
import dayjs from 'dayjs';
import './index.less';

function Edit(props) {
  const { getFieldProps, validateFields } = props.form;
  const [files, setFiles] = useState([]);
  const [dateShow, setDateShow] = useState(false);
  const [times, setTimes] = useState('可选时间');
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();
  const handleDate = () => {
    setDateShow(!dateShow);
  };
  const editHouse = async (payload) => {
    const result = await Http({
      url: '/house/add',
      body: payload,
    });
    if (result) {
      Toast.success('上架成功');
      history.push('/user');
    }
  };
  const handleChange = (files) => {
    console.log(files);
    if (files[0]?.file?.size / 1024 / 1024 > 0.5) {
      Toast.fail('图片大小不能大于0.5M');
      return;
    }
    setFiles(files);
  };

  const handleDateConfirm = (startTime, endTime) => {
    // console.log(startTime, endTime);
    setDateShow(!dateShow);
    setStartTime(dayjs(startTime).format('YYYY-MM-DD'));
    setEndTime(dayjs(endTime).format('YYYY-MM-DD'));
    setTimes(dayjs(startTime).format('YYYY-MM-DD') + '~' + dayjs(endTime).format('YYYY-MM-DD'));
  };

  const handleSubmit = () => {
    if (!files.length) {
      Toast.fail('请上传图片');
      return;
    }
    validateFields((error, value) => {
      // console.log(error)
      // console.log(files)
      if (error) {
        Toast.fail('请将信息补充完整');
        return;
      } else {
        console.log(files[0].url, value.name, value.info);
        const body = {
          imgs: files,
          name: value.name,
          info: value.info,
          address: value.address,
          price: value.price,
          cityCode: value.cityCode,
          startTime,
          endTime,
        };
        editHouse(body).then(console.log('请求'));
      }
    });
  };

  useEffect(() => {
    // console.log(props)

  }, []);

  return (
    <div className='user-edit'>
      <List>
        <ImagePicker files={files} selectable={files.length < 2} onChange={handleChange} />

        <InputItem
          {...getFieldProps('name', {
            rules: [{ required: true }],
          })}
          placeholder='民宿名'
        >
          民宿名：
        </InputItem>
        <InputItem
          {...getFieldProps('info', {
            rules: [{ required: true }],
          })}
          placeholder='简介'
        >
          简介：
        </InputItem>
        <InputItem
          {...getFieldProps('address', {
            rules: [{ required: true }],
          })}
          placeholder='地址'
        >
          地址：
        </InputItem>
        <InputItem
          {...getFieldProps('price', {
            rules: [{ required: true }],
          })}
          placeholder='价格'
        >
          价格：
        </InputItem>
        <InputItem
          {...getFieldProps('cityCode', {
            rules: [{ required: true }],
          })}
          placeholder='城市'
        >
          城市：
        </InputItem>
        {/**可选时间 */}
        <div className='search'>
          <div className='search-time' onClick={handleDate}>
            <p className='search-time_left'>出租时间：</p>
            <p className='search-time_right'>{times}</p>
          </div>
          {/**点击按钮 */}
          <Calendar visible={dateShow} onCancel={handleDate} onConfirm={handleDateConfirm} />
        </div>
      </List>
      <Button type='warning' style={{ marginTop: '20px' }} onClick={handleSubmit}>
        上架
      </Button>
    </div>
  );
}

export default createForm()(Edit);

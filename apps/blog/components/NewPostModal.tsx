import {
  Card,
  Text,
  GeistProvider,
  Grid,
  Input,
  Modal,
  InputProps,
} from '@geist-ui/core';
import React from 'react';
import { ConfirmHOC, makeImperative } from './ReactImperative';
import { IInjectProps } from './ReactImperative/confirm-wrapper';
interface IProps extends IInjectProps {}

const FormItem = (props: { label: string } & InputProps) => {
  const { label, ...rest } = props;
  return (
    <div style={{ display: 'flex', alignItems: 'center', width : "100%", marginBottom : 16 }}>
      <div style={{ lineHeight: '36px', flexShrink : 0 }}>{label}</div>
      <Input style={{ flex: 1 }} {...rest} w="100%" placeholder="输入标题" />
    </div>
  );
};

const NewPostModal = (props: IProps) => {
  const { show, dismiss, proceed, cancel } = props;
  console.log(props);
  return (
    <GeistProvider themeType="dark">
      <Modal disableBackdropClick visible={show} onClose={dismiss}>
        <Modal.Title>新增文章</Modal.Title>
        <Modal.Subtitle>它不能用作构造函数</Modal.Subtitle>
        <Modal.Content>
          <Grid.Container gap={1}>
            <FormItem label='文章标题：' placeholder='请输入标题' />
            <FormItem label='文章描述：' placeholder='请输入描述' />
            <FormItem label='文章地址：' placeholder='请输入文件地址' />
          </Grid.Container>
        </Modal.Content>
        <Modal.Action passive onClick={({ close }) => close()}>
          取消
        </Modal.Action>
        <Modal.Action onClick={({ close }) => close()}>确认</Modal.Action>
      </Modal>
    </GeistProvider>
  );
};

const ConfirmAble = ConfirmHOC(NewPostModal);
const showNewPostModal = makeImperative(ConfirmAble);
export default showNewPostModal;

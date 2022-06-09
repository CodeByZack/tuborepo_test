import { Card, Text, GeistProvider, Grid, Input, Modal } from '@geist-ui/core';
import React from 'react';
import { ConfirmHOC, makeImperative } from './ReactImperative';
import { IInjectProps } from './ReactImperative/confirm-wrapper';
interface IProps extends IInjectProps {}

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
            <Grid xs={6}>
              <Text small my={0}>
                文章标题：
              </Text>
            </Grid>
            <Grid xs={18}>
              <Input w="100%" placeholder="输入标题" />
            </Grid>
            <Grid xs={6}>
              <Text small my={0}>
                文章描述：
              </Text>
            </Grid>
            <Grid xs={18}>
              <Input w="100%" placeholder="输入描述" />
            </Grid>
            <Grid xs={6}>
              <Text small my={0}>
                文件地址：
              </Text>
            </Grid>
            <Grid xs={18}>
              <Input w="100%" placeholder="输入文件地址" />
            </Grid>
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

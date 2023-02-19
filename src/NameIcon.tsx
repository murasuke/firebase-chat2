import { FC, Suspense } from 'react';
import iconMaker, { IconOption } from './iconMaker';

/**
 * Suspenceを使い、Canvasで生成した画像を表示するコンポーネント
 * canvas.convertToBlob()が非同期関数のため、描画した画像をそのまま埋め込むことができない
 */

type IconMakerFC = FC<{ userName: string; option?: IconOption }>;

const iconImage: { [key: string]: string } = {};
const IconMaker: IconMakerFC = ({ userName, option }) => {
  const iconMakerWrapper = () => {
    if (!iconImage[userName]) {
      // eslint-disable-next-line no-return-assign
      throw iconMaker(userName, option).then((r) => (iconImage[userName] = r));
    } else {
      return iconImage[userName];
    }
  };

  return <img alt="icon" src={iconMakerWrapper()} />;
};

const NameIcon: IconMakerFC = ({ userName, option }) => (
  <Suspense fallback={<p>Loading...</p>}>
    <IconMaker userName={userName} option={option} />
  </Suspense>
);

export default NameIcon;

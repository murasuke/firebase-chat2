/**
 * 名前アイコン作成
 * ・スペースで区切った先頭2文字で丸アイコンを作成する
 * ・「日本 太郎」=>「日太」
 * ・「Mike Davis」=>「MD」
 */

// Icon作成オプション
export type IconOption = {
  size?: number; // iconのサイズ
  foreColor?: string; // フォントの色
  backColor?: string; // 背景色
  fontScale?: number; // フォントのサイズ(iconのサイズに対する比率(0.7程度が適当))
  fontFamily?: string; // フォントの種類
};

// Icon作成デフォルト値
const defaultValue: IconOption = {
  size: 50,
  foreColor: '#3c665f',
  backColor: 'aliceblue',
  fontScale: 0.6,
  fontFamily: 'sans-serif',
};

/**
 * アイコン用画像作成
 * @param name アイコンにする名前
 * @param option IconOption
 * @returns
 */
const iconMaker = async (
  name: string,
  option?: IconOption
): Promise<string> => {
  // デフォルト値をoptionのプロパティーで(あれば)上書き
  const opt = { ...defaultValue, ...option };
  const [width, height] = [opt.size, opt.size];

  // 描画用のCanvasを用意する
  const canvas = new OffscreenCanvas(width, height);
  const context = canvas.getContext('2d');
  if (!context) throw new Error('could not get context.');

  // スペースを含む場合、splitして最初の2文字を結合する '山田 太郎' -> '山太'。
  // スペースを含まない場合、先頭2文字にする '山田太郎' -> '山田'
  const splitName = name.split(' ');
  const abbrev =
    splitName.length >= 2
      ? splitName[0].substring(0, 1) + splitName[1].substring(0, 1)
      : name.substring(0, 2);

  // canvasを円形にくり抜く(clip)
  context.beginPath();
  context.ellipse(
    width / 2,
    height / 2,
    width / 2,
    height / 2,
    0,
    0,
    Math.PI * 2
  );
  context.closePath();
  context.clip();

  // 背景を塗りつぶす
  context.fillStyle = opt.backColor;
  context.fillRect(0, 0, width * 2, height * 2);

  // 名前を描画
  context.fillStyle = opt.foreColor;
  context.font = `bold ${height * opt.fontScale}px ${opt.fontFamily}`;

  // 文字の中心を合わせる
  const mesure = context.measureText(abbrev);
  const centerX = width - mesure.width > 0 ? (width - mesure.width) / 2 : 0;
  const centerY =
    (height +
      mesure.actualBoundingBoxAscent +
      mesure.actualBoundingBoxDescent) /
    2;
  context.fillText(abbrev, centerX, centerY, width);

  // Canvasの画像をオブジェクトURLへ変換(imgタグのhrefにセットすると画像を表示できる)
  const blob = await canvas.convertToBlob();
  const imageUrl = URL.createObjectURL(blob);

  return imageUrl;
};

export default iconMaker;

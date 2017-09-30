const COLOR_RED = '#f00';
const LINE_DEFAULT_WIDTH = 1;
const EASE_DEFAULT_WIDTH = 20;

const transformText = (ctx, text, width) => {
  let targetStr = text;
  const strArr = [];
  for (let i = 1; i <= targetStr.length; i += 1) {
    const tempStr = targetStr.substring(0, i);
    const textMetrics = ctx.measureText(tempStr);
    if (textMetrics.width >= width) {
      strArr.push(tempStr);
      targetStr = targetStr.substr(i);
      i = 1;
    }
    if (i === targetStr.length) {
      strArr.push(targetStr);
    }
  }
  const string = strArr.join('\n');
  return string;
};

class Canvas {
  static line(ctx, options) {
    const canvasWidth = ctx.canvas.width,
      canvasHeight = ctx.canvas.height;
    ctx.save();
    ctx.lineJoin = 'round';
    ctx.lineCap = 'square';
    ctx.strokeStyle = options.color || COLOR_RED;
    ctx.lineWidth = options.lineWidth || LINE_DEFAULT_WIDTH;
    ctx.globalCompositeOperation = 'source-over';
    ctx.beginPath();
    ctx.moveTo(options.points[0].x * canvasWidth,
      options.points[0].y * canvasHeight);
    for (let i = 1; i < options.points.length; i++) {
      ctx.lineTo(options.points[i].x * canvasWidth,
        options.points[i].y * canvasHeight);
    }
    ctx.stroke();
    ctx.restore();
  }

  static rect(ctx, options) {
    const canvasWidth = ctx.canvas.width,
      canvasHeight = ctx.canvas.height;
    ctx.save();
    ctx.strokeStyle = options.color || COLOR_RED;
    ctx.lineWidth = options.lineWidth || LINE_DEFAULT_WIDTH;
    ctx.globalCompositeOperation = 'source-over';
    ctx.strokeRect(
      options.position.x * canvasWidth,
      options.position.y * canvasHeight,
      options.width * canvasWidth,
      options.height * canvasHeight);
    ctx.restore();
  }

  static ease(ctx, options) {
    const canvasWidth = ctx.canvas.width,
      canvasHeight = ctx.canvas.height;
    ctx.save();
    ctx.lineWidth = options.lineWidth || EASE_DEFAULT_WIDTH;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.moveTo(options.points[0].x * canvasWidth,
      options.points[0].y * canvasHeight);
    for (let i = 1; i < options.points.length; i++) {
      ctx.lineTo(options.points[i].x * canvasWidth,
        options.points[i].y * canvasHeight);
    }
    ctx.stroke();
    ctx.restore();
  }

  static clear(ctx) {
    const width = ctx.canvas.clientWidth;
    const height = ctx.canvas.clientHeight;
    ctx.clearRect(0, 0, width, height);
  }

  static text(ctx, options) {
    options.size = options.size || 14;
    options.lineHeight = options.lineHeight || 18;
    options.font = options.font || '"PingFang SC","Microsoft YaHei","微软雅黑"';
    let string = options.text;
    ctx.save();
    ctx.textBaseline = 'middle';
    ctx.font = `${options.size}px/${options.lineHeight}px ${options.font}`;
    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = options.color || COLOR_RED;
    if (typeof maxWidth !== 'undefined') {
      string = string.replace(/<br>/g, '\n').split(/\n/).map(p => transformText(ctx, p, maxWidth)).join('\n');
    }
    string.replace(/<br>/g, '\n').split(/\n/).map((value, index) => {
      ctx.fillText(value,
        options.position.x * ctx.canvas.width + 2,
        options.position.y * ctx.canvas.height + index * options.lineHeight + options.lineHeight / 2 + 2);
      return null;
    });
    ctx.restore();
  }
  /**
   * 画椭圆的方法
   * @param  {CanvasRenderContext} ctx
   * @param  {Object} options 
   * {
   *    points: [{x:xx, y:xx}, {x:xx, y:xx}];
   * }
   * @return {void}         无返回参数
   */
  static ellipse(ctx, options) {
    const width = ctx.canvas.width;
    const height = ctx.canvas.height;
    ctx.save();
    ctx.strokeStyle = '#F00';
    ctx.lineWidth = options.lineWidth || 1;
    const ellipse = {
      width: (options.points[1].x - options.points[0].x) * width,
      height: (options.points[1].y - options.points[0].y) * height
    };
    const centerPoint = {
      x: ((options.points[1].x - options.points[0].x) / 2 + options.points[0].x) * width,
      y: ((options.points[1].y - options.points[0].y) / 2 + options.points[0].y) * height
    };
    ctx.save();
    ctx.translate(centerPoint.x, centerPoint.y);
    const rate = ellipse.height / ellipse.width;
    ctx.transform(1,0,0,rate,0,0);
    ctx.beginPath();
    ctx.arc(0, 0, Math.abs(ellipse.width / 2), 0, 2 * Math.PI, false);
    ctx.restore();
    ctx.stroke();
    ctx.restore();
  }
}

export default Canvas;


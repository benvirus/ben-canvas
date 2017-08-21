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
    let string = options.text;
    ctx.save();
    ctx.font = '14px/18px monospace';
    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = options.color || COLOR_RED;
    if (typeof maxWidth !== 'undefined') {
      string = string.replace(/<br>/g, '\n').split(/\n/).map(p => transformText(ctx, p, maxWidth)).join('\n');
    }
    string.replace(/<br>/g, '\n').split(/\n/).map((value, index) => {
      ctx.fillText(value,
        options.position.x * ctx.canvas.width + 2,
        options.position.y * ctx.canvas.height + index * 18 + 16);
      return null;
    });
    ctx.restore();
  }
}

export default Canvas;


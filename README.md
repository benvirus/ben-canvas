
### Api Document

```js
import DataCanvas from 'ben-canvas';
```

##### line

```js
DataCanvas.line({
    lineWidth: 2, // The thickness of the line. optional.
    color: '#F00', // the color of the line. optional.
    points:[
        {
            x: 0.123,   // percentage
            y: 0.123,   // percentage
        }, {
            // ...
        }
    ]
});
```

##### rect

```js
DataCanvas.rect({
    lineWidth: 2, // The width of the rect border. optional.
    color: '#FF0', // the color of the rect border. optional.
    position: {
        x: 0.123,  // the x coordinate of left-top point of the rectangle in percentage
        y: 0.123   // the y coordinate of left-top point of the rectangle in percentage
    },
    width: 0.123,  // percentage
    height: 0.123  // percentage
});
```

##### text

```js
DataCanvas.text({
    size: 14, // The font-size of the text. Optional.
    lineHeight: 18, // The line-height of the text. Optional.
    color: '#F00',  // The color of the text. Optional.
    position: {
        x: 0.123,  // percentage
        y: 0.123   // percentage
    },
    width: 0.123,   // percentage
    height: 0.123  // percentage
});
```

##### ellipse

```js
DataCanvas.ellipse({
    lineWidth: 2, // The width of the ellipse border. optional.
    points: [
        {x: 0.1, y: 0.1},
        {x: 0.9, y: 0.9}
    ]
});
```

##### ease

```js
DataCanvas.ease({
    lineWidth: 2, // The thickness of the ease pen. optional.
    points: [
        {x: 0.1, y: 0.1},  // The trajectory which you want to ease;
        {x: 0.9, y: 0.9},
        // .....
    ]
});
```

##### clear

```js
DataCanvas.clear(); // 清楚整个画布
```

### Change Log

##### 1.1.1 (2018-05-15)
* [需求] 实现箭头接口。

##### 1.1.0 (2017-09-30)
* [需求] 实现椭圆接口。

##### 1.0.5 (2017-09-13)
* [优化] 文字工具的字体可配置，默认使用 win 和 mac 上表现差不多的字体。

##### 1.0.4 (2017-09-06)
* [需求] 文字 text 方法可配置文字的大小和行高。

##### 1.0.2 (2017-08-21)
* [需求] 画笔粗细和橡皮擦大小可配置。

##### 1.0.1 (2017-08-04)
* [bug] 修复在画矩形时会再次重绘上次的直线数据。

##### 1.0.0 (2017-08-03) 👏
* [feature] 提供画图功能类库。

### Contact

Author: Ben Chen

E-mail: chenhaijiao@howzhi.com

Contributor: Gao Yong

E-mail: gaoyong@howzhi.com

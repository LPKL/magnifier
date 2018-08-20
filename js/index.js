/**
 * Created by Administrator on 2018/8/20.
 */
let magnifierRender = (function () {
    let smallBox = document.getElementById('smallBox'),
        bigBox = document.getElementById('bigBox'),
        mark = document.getElementById('mark'),
        bigImg = bigBox.getElementsByTagName('img')[0];
    let markW = mark.offsetWidth,
        markH = mark.offsetHeight,//当前元素如果是隐藏的，是无法通过盒子模型属性获取他的宽度，高度(display)
        smallW = smallBox.offsetWidth,
        smallH = smallBox.offsetHeight;
    let maxL = smallW - markW,
        maxT = smallH - markH;
    // 为了计算mark盒子的位置
    let computedMark = function (e) {
        e = e || window.event;
        //计算鼠标在mark盒子中间位置时的left/right
        let curL = e.clientX - smallBox.offsetLeft - markW / 2,
            curT = e.clientY - smallBox.offsetTop - markH / 2;
        //边界判断
        curL = curL < 0 ? 0 : (curL > maxL ? maxL : curL);
        curT = curT < 0 ? 0 : (curT > maxT ? maxT : curT);
        //设置mark的值
        mark.style.left = curL + 'px';
        mark.style.top = curT + 'px';
        //=>mark跟随鼠标移动，我们也需要bigImg也跟着移动
        //1：mark向右移动，bigImg要向左移动，移动的方向相反
        //2：mark移动多少，bigImg在mark移动的基础上成移3
        bigImg.style.left=-curL*3+'px';
        bigImg.style.top=-curT*3+'px';
    };
    //给smallBox的相关事件绑定方法
    let bindEvent = function () {
        smallBox.onmouseenter = function (e) {
            //=>进入smallBox要做的事情：展示mark，计算当前mark的位置
            mark.style.visibility = 'visible';
            // mark.style.display='block';
            bigBox.style.display='block';
            computedMark(e);
        }
        smallBox.onmousemove = function (e) {
            //鼠标在smallBox移动里要做的事情：随时计算mark的位置，让mark跟着鼠标走
            computedMark(e);
        }
        smallBox.onmouseleave = function (e) {
            //=>离开smallBox要做的事情：隐藏mark
            // mark.style.display='none';
            bigBox.style.display='none';
            mark.style.visibility = 'hidden'

        }
    }

    return {
        init: function () {
            // mark.style.display='none';//=>不在css中隐藏：防止开始mark是隐藏的，我们无法获取mark的宽度和高度（开始是显示的，当我们获取到宽高后，再把它隐藏即可）
            bindEvent()
        }
    }
})();
magnifierRender.init();
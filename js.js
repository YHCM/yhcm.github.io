// 轮播图功能---------------------------------------
window.addEventListener('load', function(){
    // 获取元素
    var prev = document.querySelector('.prev');
    var next = document.querySelector('.next');
    var banner = document.querySelector('.banner');

    // 鼠标经过，显示左右按钮
    banner.addEventListener('mouseenter', function(){
        prev.style.display = 'block';
        next.style.display = 'block';
        // 清除计时器
        clearInterval(timer);
        timer = null;
    })

    // 鼠标离开，隐藏左右按钮
    banner.addEventListener('mouseleave', function(){
        prev.style.display = 'none';
        next.style.display = 'none';
        // 开启计时器
        timer = setInterval (function(){
            next.click();
        }, 1000);
    })

    // 动态生成小圆点，有几个图片，就生成几个小圆点（最后还是手动写的小圆点）
    var images = document.querySelector('.images');
    var dots = document.querySelector('.dots');
    var banner_width = banner.offsetWidth;
    console.log(banner_width)
    // 小圆点的点击事件
    for(var i = 0; i < dots.children.length; i++){
        console.log(i)
        // 给小圆点添加索引
        dots.children[i].setAttribute('index', i);
        dots.children[i].addEventListener('click', function(){
            console.log(this);
            for(var i = 0; i < dots.children.length; i++) {
                dots.children[i].className = '';
            }
            this.className = 'active';
            // 点击小圆点移动图片
            var index = this.getAttribute('index');
            console.log('点击按钮的index：' + index);
            // 点击了哪个小圆点，就要把它的index给num
            num = index;
            circle = index;
            animate(images, -index * banner_width);
        })
    }

    // 把dots里第一个小圆点激活
    dots.children[0].className = 'active';

    // 实现无缝切换，到达最后一张时，克隆第一章图片，后面的小圆点不会多
    var first = images.children[0].cloneNode(true)
    console.log(first)
    images.appendChild(first)
    console.log(images.children.length)

    // 两侧按钮点击事件
    // num：点击右侧按钮，图片滚动一张；circle控制小圆点的位置
    var num = 0;
    var circle = 0;
    next.addEventListener('click', function(){
        // 如果走到了最后复制的那张图片，就要把图片恢复到第一张
        if(num == images.children.length - 1) {
            images.style.left = 0;
            num = 0;
        }
        num++;
        animate(images, -num * banner_width);
        // 小圆点跟着图片一起动
        circle++;
        if(circle == dots.children.length) {
            circle = 0;
        }
        circleChange();
        console.log('当前图片的序号' + circle)
    })
    prev.addEventListener('click', function(){
        // 这里存疑，因为第一张图片前面没有最后一张图片
        if(num == 0) {
            num = images.children.length-1;
            images.style.left = -num * banner_width + 'px';
        }
        num--;
        animate(images, -num * banner_width);
        circle--;
        circle = circle < 0 ? dots.children.length-1 : circle;
        circleChange();
        console.log('当前图片的序号' + circle)
    })
    // 小圆点改变
    function circleChange() {
        for(var i = 0; i < dots.children.length; i++){
            dots.children[i].className = ''
        }
        dots.children[circle].className = 'active';
    }
    // 计时器
    var timer = setInterval(function() {
        // 手动调用点击事件
        next.click();
    }, 1000);
    }) 

// 轮播图动画-----------------------------------------
function animate(obj, target, callback){
    // 让元素只有一个定时器在执行，需要清除以前的定时器
    clearInterval(obj.timer);
    obj.timer = setInterval(function() {
        var step = (target - obj.offsetLeft) / 10;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        if(obj.offsetLeft == target) {
            // 停止动画 本质是停止定时器
            clearInterval(obj.timer);
            // 回调函数写到定时器结束位置
            if(callback) {
                callback();
            }
        }
        // 把每次加1这个步长值改为一个慢慢变小的值
        obj.style.left = obj.offsetLeft + step + 'px';
    }, 15)
}

























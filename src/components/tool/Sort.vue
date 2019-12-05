<script type="text/javascript">

/*  对数组进行降序
    使用：arr.sort(Sort.sortDesc)
*/
function sortDesc(a,b){
    return b-a;
}


/*  对数组进行升序
    使用：arr.sort(Sort.sortAsce)
*/
function sortAsce(a,b){
    return a-b;
}

/**数组根据数组对象中的某个属性值进行排序的方法 
 * 使用例子：newArray.sort(sortBy('number',false)) //表示根据number属性降序排列;若第二个参数不传递，默认表示升序排序
 *  attr 排序的属性 如number属性
 *  rev true表示升序排列，false降序排序
 */
function sortBy(attr,rev){
    //第二个参数没有传递 默认升序排列
    if(rev ==  undefined){
        rev = 1;
    }else{
        rev = (rev) ? 1 : -1;
    }

    return function(a,b){
        a = a[attr];
        b = b[attr];
        if(a>b){
            return rev * 1
        }
        if(a<b){
        return rev * -1
        }
        return 0;
    }
}


/*  冒泡排序（每次将剩下数组里面最大的一个数排到最后面）
    使用例子：Sort.bubbling(arr,"desc") //若第二个(rev)参数不传递，默认表示升序排序

    两个循环    
    var examplearr=[8,94,15,88,55,76,21,39];
    当i=0的时候，里面的循环完整执行，从j=0执行到j=6,这也就是第一遍排序，结果是将最大的数排到了最后，这一遍循环结束后的结果应该是[8,15,88,55,76,21,39,94]
    当i=1的时候，里面的循环再次完整执行，由于最大的数已经在最后了，没有必要去比较数组的最后两项，这也是j<arr.length-1-i的巧妙之处，结果是[8,15,55,76,21,39,88,94]
    说到这里，规律就清楚了，每次将剩下数组里面最大的一个数排到最后面，当第一个循环执行到最后的时候，也就是i=6,此时，j=0,只需要比较数组的第一和第二项，比较完毕，返回。
*/
function bubbling(arr,rev){
    for(var i = 0; i < arr.length-1;i++){
        for(var j = 0; j < arr.length-1-i;j++){
            var tmp;
            if(rev === 'desc'){
                if(arr[j] < arr[j+1]){
                    tmp = arr[j];
                    arr[j] = arr[j+1];
                    arr[j+1] = tmp;
                }
            }else{
                if(arr[j] > arr[j+1]){
                    tmp = arr[j];
                    arr[j] = arr[j+1];
                    arr[j+1] = tmp;
                }
            }
            
        }
    }
    return arr;
}


export default
{
    sortDesc,
    sortAsce,
    sortBy,
    bubbling
}
</script>


// sort使用：https://www.cnblogs.com/saifei/p/9043821.html
// 讲解：https://segmentfault.com/q/1010000008506262?sort=created#answers-title
// 冒泡排序：https://www.cnblogs.com/zhouliang/p/6638010.html
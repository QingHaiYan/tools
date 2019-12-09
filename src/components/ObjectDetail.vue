<template>
  <div class="bj-color" >
      <el-row>
        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
         <img src="../../static/img/detail/banner.png" width="100%" alt="">
        </el-col>
      </el-row>
      <el-row>
        <el-col :xs="{span: 24, offset: 0}" :sm="{span: 24, offset: 0}" :md="{span: 24, offset: 0}" :lg="{span: 18, offset: 3}" :xl="{span: 12, offset: 6}">
          <div class="detail-content" ref="bodys">
            <div>
              <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :class="{'padding-l-sm':text_indent}" :to="{ path: '/Index' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>{{title}}</el-breadcrumb-item>
              </el-breadcrumb>
            </div>
            <div class="margin-top-sm object-bg flex-row main-justify-center cross-align-center position-re">
              <div class="flex-row main-justify-center cross-align-center" ref="banner_touch">
                <img  class="detail-img" :src="big_img" alt="">
              </div>
              <ul class="position-ab show-ul hidden-md-and-down">
                <li v-for="item in types" :key="item.id" @click="selectType(item.type)">
                  <img :src=item.checked?item.img_y:item.img_n alt="" width="50px">
                </li>
              </ul>
              <span v-if="icon_show" class="icon-left position-ab" @click="showUp">
                <img src="../../static/img/detail/click-left.png" alt="">
              </span>
              <span v-if="icon_show" class="icon-right position-ab"  @click="showDown">
                <img src="../../static/img/detail/click-right.png" alt="">
              </span>
              <a v-show="show_data.url[2].http_url" :href="show_data.url[2].http_url" class="position-ab url-img hidden-md-and-down" target="_blank">
                <img src="../../static/img/detail/url.png" alt="">
              </a>
            </div>
            <div class="margin-top-sm">
              <ul class="flex-row main-justify-between">
                <li class="show-li-img object-bg flex-row main-justify-center cross-align-center" 
                v-for="(item,index) in show_data.img" :key="index" @click="selectImage(index)">
                  <img  :src="item" alt="" width="60%">
                </li>
              </ul>
            </div>
            <div class="margin-top-sm text-content">
              <button class="button margin-b-sm">产品功能</button>
              <ul>
                <li v-for="item in show_data.text_content" :key="item.id">
                  <p>{{item.title}}</p>
                  <ul>
                    <li v-for="(text,index) in item.content" :key="index"> {{index+1}}> {{text}}</li>
                  </ul>
                </li>
              
              </ul>
            </div>
            <div class="margin-top-sm file">
              <button class="button margin-b-sm">相关文档</button>
              <div class="file-content padding-t-sm flex-row">
                 <a v-if="show_data.url[0].file_url" :href="show_data.url[0].file_url" >
                      <img :src="show_data.url[0].file_imgurl" alt="" width="100px" height="100px">
                  </a>
                  <a class="padding-l-sm" v-if="show_data.url[1].img_url" href="javascript:void(0)">
                      <img :src="show_data.url[1].img_url" alt="" width="100px" height="100px">
                  </a>
                  <span v-if="!show_data.url[0].file_url&&!show_data.url[1].img_url">
                    暂无内容
                  </span>
              </div>
            </div> 
            
          </div>
        </el-col>
      </el-row>
      
      <footer class="banner">
          <img src="../../static/img/footer.png" width="100%" alt="">
      </footer>
      <section ref="roll"   class="position-fixed roll-screen" @mouseenter="rollUp()" @mouseleave="rollDown()">
          <p class=" padding-tb-xs flex-row main-justify-between">
            <span class="margin-l-sm other">其它平台</span> 
            <span class="flex-row margin-r-sm">
            <img src="../../static/img/detail/move-left.png" alt="" @click="moveLeft()">
            <img src="../../static/img/detail/move-right.png" alt="" @click="moveRight()">
            </span> 
          </p>
          <div class="pack-div padding-b-sm" ref="pack">
            <div  class="roll-div flex-row">
              <div  class="w-20" v-for="item in object_data" :key="item.id" @click="jumpObject(item.id)">
                <div  class="object-bg flex-row main-justify-center cross-align-center">
                  <img  :src="item.img" class="object-img" alt="" :title="item.title">
                </div>
              </div>   
            </div> 
          </div>  
      </section>
      <section ref="section" class="position-fixed float-type flex-column">
        <ul class="hidden-md-and-up">
          <li class="flex-row main-justify-center cross-align-center" v-for="item in types" :key="item.id" @click="selectType(item.type)">
            <img  :src=item.checked?item.img_y:item.img_n alt="" width="40px">
          </li>
        </ul>
        <span class="return-top flex-row main-justify-center cross-align-center"  title="返回顶部" @click="returnTop($event)">
          <img src="../../static/img/top.png" width="20px" height="20px">
        </span>
        <span class=" feedback margin-top-xs flex-row main-justify-center cross-align-center" title="反馈"  @click="jumpFeedBack">
          <img src="../../static/img/return.png" width="20px" height="20px">
        </span>
      </section>
  </div>
</template>

<script>
export default {
  name: 'ObjectDetail',

  data () {
    return {
       big_img:"static/img/detail/detail1.png" ,
       show_type:"big_screen",
       select_num:0,
       left_num:0,
       right_num:0,
       title:'医卓通',
       off_h:'',
       text_indent:false,  //移动端首页缩进0.2rem
       icon_show:true,     //移动端图片左右悬浮消失
       types:[
         {
           type:"big_screen",
           img_n:"static/img/detail/big-screen-n.png",
           img_y:"static/img/detail/big-screen-y.png",
           checked:true
         },
         {
           type:"computer",
           img_n:"static/img/detail/computer-n.png",
           img_y:"static/img/detail/computer-y.png",
           checked:false
         },
         {
           type:"app",
           img_n:"static/img/detail/app-n.png",
           img_y:"static/img/detail/app-y.png",
           checked:false
         }
       ],
       show_data:{
          'img':[
              "static/img/detail/detail1.png",
              "static/img/detail/detail2.png",
              "static/img/detail/detail3.png",
              "static/img/detail/detail4.png",
           ],
           'text_content':[
            {
              'title':'高效测控',
              'content':[
                  '快速',
                  '实时',
                  '准确'
              ]
            },
            {
              'title':'安全预防',
              'content':[
                  '立体最令人瞩目的活动是习主席在开幕式上发表主旨演讲；最特殊的安排是见证了给中国人民的一位好朋友、老朋友颁发一张特别的证书；最打动人的话语是习主席与几位领导人',
                  '分级',
                  '安全'
              ]
            },
            {
              'title':'设备信息管理',
              'content':[
                  '立体',
                  '分级',
                  '安全'
              ]
            }
          ],
          'url':[
              {
                'file_url':'',
                'img_url':'static/img/detail/file.jpg'
              },
              {
                'file_url':'',
                'img_url':'static/img/detail/code.png'
              },{
                'http_url':''
              }
            ]
       },
       object_detail:{
          "object_id": 22,
          "title": "医卓通",
          'big_screen':{
            'img':[
                "static/img/detail/detail1.png",
                "static/img/detail/detail2.png",
                "static/img/detail/detail3.png",
                "static/img/detail/detail4.png",
            ],
            'text_content':[
              {
                'title':'高效测控',
                'content':[
                    '快速',
                    '实时',
                    '准确'
                ]
              },
              {
                'title':'安全预防',
                'content':[
                    '立体最令人瞩目的活动是习主席在开幕式上发表主旨演讲；最特殊的安排是见证了给中国人民的一位好朋友、老朋友颁发一张特别的证书；最打动人的话语是习主席与几位领导人',
                    '分级',
                    '安全'
                ]
              },
              {
                'title':'设备信息管理',
                'content':[
                    '立体',
                    '分级',
                    '安全'
                ]
              }
            ],
            'url':[
              {
                'file_url':'',
                'img_url':'static/img/detail/file.jpg'
              },
              {
                'file_url':'',
                'img_url':'static/img/detail/code.png'
              }
            ]
        },
        'computer':{
          'img':[
                "static/img/detail/detail1.png",
                "static/img/detail/detail2.png",
                "static/img/detail/detail3.png",
                "static/img/detail/detail4.png",
            ],
            'text_content':[
              {
                'title':'高效测控',
                'content':[
                    '快速',
                    '实时',
                    '准确'
                ]
              },
              {
                'title':'安全预防',
                'content':[
                    '立体最令人瞩目的活动是习主席在开幕式上发表主旨演讲；最特殊的安排是见证了给中国人民的一位好朋友、老朋友颁发一张特别的证书；最打动人的话语是习主席与几位领导人',
                    '分级',
                    '安全'
                ]
              },
              {
                'title':'设备信息管理',
                'content':[
                    '立体',
                    '分级',
                    '安全'
                ]
              }
            ],
            'url':[
              {
                'file_url':'',
                'img_url':'static/img/detail/file.jpg'
              },
              {
                'file_url':'',
                'img_url':'static/img/detail/code.png'
              }
            ]
        },
        'app':{
          'img':[
                "static/img/detail/detail4.png",
                "static/img/detail/detail3.png",
                "static/img/detail/detail2.png",
                "static/img/detail/detail2.png",
            ],
            'text_content':[
              {
                'title':'高效测控',
                'content':[
                    '快速',
                    '实时',
                    '准确'
                ]
              },
              {
                'title':'安全预防',
                'content':[
                    '立体最令人瞩目的活动是习主席在开幕式上发表主旨演讲；最特殊的安排是见证了给中国人民的一位好朋友、老朋友颁发一张特别的证书；最打动人的话语是习主席与几位领导人',
                    '分级',
                    '安全'
                ]
              },
              {
                'title':'设备信息管理',
                'content':[
                    '立体',
                    '分级',
                    '安全'
                ]
              }
            ],
            'url':[
              {
                'file_url':'',
                'img_url':'static/img/detail/file.jpg'
              },
              {
                'file_url':'',
                'img_url':'static/img/detail/code.png'
              }
            ]
        }
          
      },
       object_data:[
          {
            'img':'static/img/object/02.png',
            'title':'医卓通—安全智能管理平台',
            'synopsis1':'1、高效测控',
            'synopsis2':'2、安全预警',
            'synopsis3':'3、设备信息管理',
            'object_id':1
          },
          {
            'img':'static/img/object/02.png',
            'title':'医卓通—安全智能管理平台',
            'synopsis1':'1、高效测控',
            'synopsis2':'2、安全预警',
            'synopsis3':'3、设备信息管理',
            'object_id':2
          },
          {
            'img':'static/img/object/03.png',
            'title':'医卓通—安全智能管理平台',
            'synopsis1':'1、高效测控',
            'synopsis2':'2、安全预警',
            'synopsis3':'3、设备信息管理',
            'object_id':3
          },
          {
            'img':'static/img/object/04.png',
            'title':'医卓通—安全智能管理平台',
            'synopsis1':'1、高效测控',
            'synopsis2':'2、安全预警',
            'synopsis3':'3、设备信息管理',
            'object_id':4
          },
          {
            'img':'static/img/object/05.png',
            'title':'医卓通—安全智能管理平台',
            'synopsis1':'1、高效测控',
            'synopsis2':'2、安全预警',
            'synopsis3':'3、设备信息管理',
            'object_id':5
          },
          {
            'img':'static/img/object/06.png',
            'title':'医卓通—安全智能管理平台',
            'synopsis1':'1、高效测控',
            'synopsis2':'2、安全预警',
            'synopsis3':'3、设备信息管理',
            'object_id':6
          },
          {
            'img':'static/img/object/07.png',
            'title':'医卓通—安全智能管理平台',
            'synopsis1':'1、高效测控',
            'synopsis2':'2、安全预警',
            'synopsis3':'3、设备信息管理',
            'object_id':7
          },
          {
            'img':'static/img/object/08.png',
            'title':'医卓通—安全智能管理平台',
            'synopsis1':'1、高效测控',
            'synopsis2':'2、安全预警',
            'synopsis3':'3、设备信息管理',
            'object_id':8
          }
       ],
    }
  },
  methods:{
    selectType(type){
        var arr = this.types;
        if(this.object_detail[type]){
          for (let i = 0; i < arr.length; i++) {
            if(type == arr[i].type){
                for (let j = 0; j < arr.length; j++) {
                  arr[j].checked = false;
                }
                this.show_type = arr[i].type;
                this.show_data = this.object_detail[this.show_type];
                this.big_img = this.show_data.img[0];
                arr[i].checked = true;
                break;
            }
          }
        }else{
          this.$message({
							message: '暂无数据',
							type: 'warning',
							center:true
						});
        } 
    },
    showUp(){
        this.select_num--;
        if(this.select_num<0){
          this.select_num = this.object_detail[this.show_type]["img"].length-1; 
        }
        this.changeImage();
    }, 
    showDown(){
        this.select_num++;
        this.changeImage();
    },
    selectImage(number){
         this.select_num = number;
         this.changeImage();
    },
    changeImage(){
        let arr = this.types;
         for (let i = 0; i < arr.length; i++) {
            if(this.show_type == arr[i].type){
                let arr_img =  this.object_detail[this.show_type]["img"];
                let num = this.select_num%arr_img.length;
                this.big_img = arr_img[num];
                break;
            } 
         }
    },
    returnTop(ev){
        ev.stopPropagation();
        var dom = document.getElementsByTagName("html")[0];
        var dom1 = document.getElementsByTagName("body")[0];
        if(dom.scrollTop){
            dom.scrollTop =0
        }else{
            dom1.scrollTop =0
        }

        //dom.scrollTop =0;
    },
    jumpFeedBack(){
      var object_id = this.$route.params.num;
      this.$router.push({name:'FeedBack'})
    },
    moveLeft(){
      clearInterval(this.right_num);
      clearInterval(this.left_num);
      this.left_num = setInterval(()=>{
             this.$refs.pack.scrollLeft-=3; 
              console.log(this.$refs.pack.scrollLeft);
             if(this.$refs.pack.scrollLeft<=0){
               clearInterval(this.left_num);
             }
        },10)
    },
    moveRight(){
      
      clearInterval(this.right_num);
      clearInterval(this.left_num);
      console.log(this.$refs.pack.scrollWidth-this.$refs.pack.offsetWidth);
      var overflow_num = this.$refs.pack.scrollWidth-this.$refs.pack.offsetWidth;
      this.right_num = setInterval(()=>{
            this.$refs.pack.scrollLeft+=3; 
            if(this.$refs.pack.scrollLeft>=overflow_num){
               clearInterval(this.right_num);
            }
      },10)
    },
    rollUp(){
      this.getImgHeight(()=>{
           this.$refs.roll.style.bottom = '0px';
      })
     
    }, 
    rollDown(){
       this.getImgHeight(()=>{
           this.$refs.roll.style.bottom =  this.off_h;
      })
      
    }, 
    //动态获取底部滚动条的图片高度 
    getImgHeight(callback){
        var dom = document.getElementsByClassName("object-img")[0];
         this.off_h = this.$refs.roll.style.bottom = -dom.offsetHeight+"px";
          callback();
        // dom.onload =()=>{
           
           
        // }
    },
    //移动端触屏事件
    getAngle(){
       if (Publics.getType().android ||Publics.getType().ios ||Publics.getType().iPad) { //判断设备
            this.icon_show = false;
            this.text_indent = true;
            var banner_touch = this.$refs.banner_touch;
            var bodys = this.$refs.bodys;
            var roll = this.$refs.roll;
              // console.log(num);
              Publics.touchEvent(banner_touch,true,(num)=>{  //传入dom元素,是否阻止冒泡，回调函数
                  this.judgeType(num);   //监听触屏事件后返回的是数字num   4 向右  1 向上  2 向下  3 向左
              });
              Publics.touchEvent(bodys,false,(num)=>{  
                // alert(111);
                  this.frameShow(num);  
              });
              Publics.touchEvent(roll,true,(num)=>{  
                  this.navScroll(num);  
              });
        }else{
          this.$refs.section.style.right="1rem";
        }
    },
    judgeType(num){
      if(num == 3){
          this.showUp();
      }else if(num == 4){
          this.showDown();
      }
    },
    frameShow(num){
       if(num == 3){
          this.$refs.section.style.right="0.2rem";
      }else if(num == 4){
         this.$refs.section.style.right="-0.5rem";
      }
    },
    navScroll(num){
      if(num ==4){
        this.moveLeft();
      }else if(num ==3){
        this.moveRight()
      }
    },
    jumpObject(num){
        this.$router.push({ path: '/ObjectDetail/'+num });
        
        this.$nextTick( ()=> {
         this.getData();
      })
    },
     getData(){
        let param = {
          platform_id:this.$route.params.num
        }
        this.$axios.post('/PlatformSell/DetList',this.$qs.stringify(param))
        .then(response=>{
              if(response.data.status == 200){
                  this.title = response.data.result.title;
                this.object_detail = response.data.result.object_detail;
                this.show_data = this.object_detail.big_screen;
                this.big_img = this.show_data.img[0];
              }else{
                this.errorTemplate(response.data.msg);
              }
        })
        .catch(error => {
						this.errorTemplate('网络错误，请稍后再试');
					})
      },
      getInfoList(){
        let param = {
          platform_id:'0'
        }
        this.$axios.post('/PlatformSell/List',this.$qs.stringify(param))
        .then(response=>{
              if(response.data.status == 200){
                this.object_data = response.data.result
              }else{
                this.errorTemplate(response.data.msg);
              }
        })
        .catch(error => {
						this.errorTemplate('网络错误，请稍后再试');
					})
      },
      errorTemplate(msg){
				 	 this.$message({
							message: msg,
							type: 'warning',
							center:true
						});
			 }  
  },

  mounted() {
   // this.getImgHeight();
    this.getAngle();
    this.getData();
    this.getInfoList();
     //this.$refs.roll.style.bottom =  this.$refs.roll.offsetHeight;

  },
 
}
</script>

<style scoped>
.detail-content{
  /* width:10rem; */
  font-size:0.16rem;
  /* margin: 0 auto; */
  margin-top:0.3rem;
}
.detail-img{
  width:80%;
}
.show-ul{
  right:-0.5rem;
  top:0.3rem;
}
.show-ul li{
  height:0.5rem;
}
.icon-left,.icon-right{
  -webkit-transform:translateY(-50%);
  -o-transform:translateY(-50%);
  transform:translateY(-50%);
}
.icon-left{
  top:50%;
  left:5%;
  
}
.icon-right{
  top:50%;
  right: 5%;
}
.url-img{
  top:4%;
  right:4%;
}
.show-li-img{
  width:24%;
}
.float-type{
  right:-0.5rem;
  transform: translateY(50%);
  bottom:50%;
  transition: 1s;
}

.feedback,.return-top,.float-type li{
  cursor: pointer;  
  width:0.5rem;
  height:0.5rem;
  background:#2789e9;
  border-radius: 0.3rem;
}
.float-type li{
   background:#b5b9ce;
   margin-bottom:0.1rem;
}
.text-content li p::before{
  content: '';
  display:inline-block;
  position: relative;
  top:-0.02rem;
  padding:0.03rem;
  margin-right:0.1rem;
  border-radius:0.03rem;
  background: #1165c9;
}
.text-content li li,.text-content li p{
  line-height: 0.35rem;
}
.button{
  background:#1165c9;
  border:none;
  padding:0.1rem 0.2rem;
  color:#fff;
  font-weight: bold;
}
.file-content{
  border-top:1px solid #000;
  
}
.roll-screen{
  /* overflow: hidden; */
  bottom:0;
  width:100%;
  background:#fff;
  font-size:0.16rem;
  transition: 1s;
}
.pack-div{
  width:100%;
  overflow:hidden;
}
.roll-div{
  width:150%;
}
.w-20{
  width:20%;
  margin-right:0.2rem;
  /* display: inline-block; */
}
.w-20:last-child{
   margin-right:0;
}
.object-img{
    width:80%;
}
.other{
  font-weight: 600;
  color:#535a70;
}
@media  screen and (max-width:1200px) {
    .text-content,.file{
      padding-left:0.2rem;
    }
}


</style>

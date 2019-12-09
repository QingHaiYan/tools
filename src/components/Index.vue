<template>
  <div>
    <el-row>
        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="banner_relative">
        <img src="../../static/img/banner.png" width="100%" alt="">
        <!-- 使用导航组件 -->
        <Navigation class="navigation_absolute"></Navigation>
        </el-col>
    </el-row>
    <el-row>
     <el-col :xs="{span: 24, offset: 0}" :sm="{span: 24, offset: 0}" :md="{span: 24, offset: 0}" :lg="{span: 18, offset: 3}" :xl="{span: 12, offset: 6}">
      <div class="index-content">
        <header class="flex-row main-justify-between cross-align-center">
          <div class="flex-row cross-align-center">
            <img class="computer" src="../../static/img/computer.png" alt="">
            <h3 class="margin-l-sm">润一科技产品展示</h3>
          </div>
          <div>
            <el-input ref="input" placeholder="请输入搜索内容" @keydown.native="eventOnload($event)" v-model="searchContent" class="">
                  <el-button class="button" slot="append" icon="el-icon-search" @click="searchs()"></el-button>
            </el-input>
          </div>
        </header>
        <section class="index-object">
          <div class="row clearfix">
            <div  class="margin-top-sm col-50" v-for="item in object_data" :key="item.id" @click="jumpDetail(item.id)">
              <div class="object-bg flex-row main-justify-center cross-align-center">
                <img :src="item.img" class="object-img" alt="" width="100%">
              </div>
              <div class="padding-t-lg object-text">
                <h4 class="text-hidden">{{item.title}}</h4>
                <p>{{item.syn1}}</p>
                <p>{{item.syn2}}</p>
                <p>{{item.syn3}}</p>
              </div>
            </div>
         </div>
        </section>
       </div>
     </el-col>
    </el-row>
    <footer class="banner">
      <img src="../../static/img/footer.png" width="100%" alt="">
    </footer>
    <section ref="section" class="position-fixed float-type flex-column">
        <span class="return-top flex-row main-justify-center cross-align-center"  title="返回顶部" @click="returnTop">
          <img src="../../static/img/top.png" width="20px" height="20px">
        </span>
        <span class=" feedback margin-top-xs flex-row main-justify-center cross-align-center" title="反馈"  @click="jumpFeedBack">
          <img src="../../static/img/return.png" width="20px" height="20px">
        </span>
      </section>
        
  </div>
</template>

<script>
import Navigation from './Navigation'
export default {
  name: 'Index',
  data () {
    return {
      searchContent:'',
      object_data:[
      ]
    }
  },
  components:{
    Navigation
  },
  methods:{
       //搜索键盘事件
      eventOnload(ev){
        if(ev.keyCode==13){
            this.searchs();  
          }
      },
      //点击搜索
      searchs(){
          let param = {
          platform_name:this.searchContent
        }
        if(this.searchContent){
          this.$axios.post('/PlatformSell/PlaList',this.$qs.stringify(param))
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
        }else{
          this.getInfoList();
        }
      },
      jumpDetail(num){
        this.$router.push({name: 'ObjectDetail', params: { num: num}});
      },
      jumpFeedBack(){
        this.$router.push({name:'FeedBack'})
      },
      returnTop(){
        
        var dom = document.getElementsByTagName("html")[0];
        var dom1 = document.getElementsByTagName("body")[0];
        if(dom.scrollTop){
            dom.scrollTop =0
        }else{
            dom1.scrollTop =0
        }

        //dom.scrollTop =0;
      },
      getInfoList(){
        let param = {
          platform_id:'0'
        }
        this.$axios.post('/PlatformSell/List',this.$qs.stringify(param))
        .then(response=>{
              if(response.data.status == 200){
                   this.object_data = response.data.result;
              }else{
                this.errorTemplate(response.data.msg);
              }
        })
        .catch(error => {
						this.errorTemplate('网络错误，请稍后再试');
					})
      },
      //移动端触屏事件
    getAngle(){
       if (Publics.getType().android ||Publics.getType().ios ||Publics.getType().iPad) { //判断设备
          this.$refs.section.style.right="0.2rem";
        }
    },
      errorTemplate(msg){
				 	 this.$message({
							message: msg,
							type: 'warning',
							center:true
						});
			 }
  },
  created(){
    this.getInfoList();
    this.getAngle();
  },
  mounted(){
     
  }
}
</script>

<style scoped>

.banner_relative{
  position: relative;
}
.navigation_absolute{
  position: absolute;
  top: 1%;
  left: 35%;
}

.index-content{
  font-size:0.16rem;
  margin-top:0.6rem;
}
.row .col-50{
	float: left;
  -moz-box-sizing: border-box;
	box-sizing: border-box;
	width: 49%;
  margin-left: 2%
}
.row .col-50:nth-of-type(odd){
   margin-left:0%;
}
.object-img{
    width:80%;
}
.feedback{
  right:0.2rem;
  bottom:2rem;
}
.return-top{
  right:0.2rem;
  bottom:1rem;
}
.feedback,.return-top{
  cursor: pointer;  
  width:0.5rem;
  height:0.5rem;
  background:#2789e9;
  border-radius: 0.3rem;
}
.object-text{
  line-height: 0.4rem;
  color:#00275b;
}
.text-hidden,.object-text p{
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.float-type{
  right:1rem;
  transform: translateY(50%);
  bottom:50%;
  transition: 1s;
}
@media  screen and (max-width:1000px) {
  .object-text{
    padding-left:0.2rem;
  }
  header{
    padding:0 0.2rem;
  }
  .computer{
    display:none;
  }
  .margin-l-sm{
    margin-left:0;
  }
  .float-type{
    right:0.2rem;
    transform: translateY(50%);
    bottom:50%;
    transition: 1s;
  }
}
</style>

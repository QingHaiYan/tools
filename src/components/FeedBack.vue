<template>
  <div class="bj-color">
      <el-row>
        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
         <img src="../../static/img/detail/banner.png" width="100%" alt="">
        </el-col>
      </el-row>
      <el-row>
        <el-col :xs="{span: 24, offset: 0}" :sm="{span: 24, offset: 0}" :md="{span: 24, offset: 0}" :lg="{span: 18, offset: 4}" :xl="{span: 12, offset: 6}">
           <div class="detail-content">
              <div>
                <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :class="{'padding-l-sm':text_indent}" :to="{ path: '/Index' }">首页</el-breadcrumb-item>
                <!-- <el-breadcrumb-item :to="{path: '/ObjectDetail/'+object_id}">平台介绍</el-breadcrumb-item> -->
                <el-breadcrumb-item>反馈记录</el-breadcrumb-item>
                </el-breadcrumb>
              </div>
              <div class="margin-top-sm  submit position-re" v-if="nav_radio =='a' ">
                <div  class="button flex-row cross-align-center padding-t-lg">
                    <span class="div-left margin-r-sm">请选择提交类型</span>
                    <span>
                      <input type="radio" name="tabs" v-model="input_radio" value="a"  id="tab1" checked>
                      <label for="tab1">功能建议</label>
                    </span>
                    <span class="margin-l-sm">
                      <input type="radio" name="tabs" v-model="input_radio" value="b" id="tab2" >
                      <label for="tab2">客户反馈</label>
                    </span>
                </div>
                <div class="flex-row cross-align-center padding-t-lg">
                    <span class="div-left margin-r-sm">标题</span>
                    <el-input class="input-text" v-model="input" placeholder="请输入标题" ></el-input>
                </div>
                <div class="flex-row  padding-t-lg">
                    <span class="div-left margin-r-sm">内容</span>
                    <div  class="input-textarea">  
                      <el-input
                        type="textarea"
                        autosize
                        placeholder="请输入内容"
                        v-model="textarea">
                      </el-input><br/>
                      <button @click="submitFeesBack">提交反馈</button>
                    </div>
                </div>
                <div class="position-ab nav hidden-md-and-down" >
                  <div class="nav-top flex-column main-justify-center cross-align-center">
                        <div class="nav-top-img">
                            <img src="../../static/img/fellback/user.png" alt="">
                        </div>
                        <p >admin</p>
                  </div>
                  <div class="nav-select flex-column main-justify-center cross-align-center">
                      <span class="margin-top-sm nav1">
                        <input type="radio" name="navs" v-model="nav_radio" value="a"  id="nav1" checked>
                        <label class="nav1" for="nav1">提出反馈</label>
                      </span>
                      <span class="margin-top-sm nav2" >
                        <input type="radio" name="navs" v-model="nav_radio" value="b" id="nav2" >
                        <label class="" for="nav2">反馈记录</label>
                      </span>
                  </div>
              </div>
              </div>
              <div class="record margin-top-sm padding-tb-sm submit position-re" v-else>
                  <div>
                    <ul class="flex-row">
                      <li class="margin-l-sm">
                        <input type="radio" name="type" v-model="type_radio" value="a" id="type1" >
                        <label class="" for="type1">全部类型</label>
                      </li>
                      <li class="margin-l-sm">
                        <input type="radio" name="type" v-model="type_radio" value="b" id="type2" >
                        <label class="" for="type2">功能建议({{advice_count}})</label>
                      </li>
                      <li class="margin-l-sm">
                        <input type="radio" name="type" v-model="type_radio" value="c" id="type3" >
                        <label class="" for="type3">客户反馈({{feed_count}})</label>
                      </li>
                    </ul>
                  </div>
                  <div class="flex-row cross-align-center package-all">
                    <div class="lable-checkbox text-center" @click="selectAll()">
                      <input ref="all" class="magic-checkbox" type="checkbox" name="layout" id="all" >
                      <!-- <label class="pull-right" for="all" @click="selectAll()">全选</label> -->
                    </div>
                    <div class="yd" @click="signSelect()">标为已读</div>
                    <div class="del" @click="deleteSelect()">删除</div>
                  </div>
                  <div>
                   
                    <ul class="flex-row main-justify-around padding-tb-sm " style="width:85%;padding-left:15%;background:#eef1f5;">
                      <li class="item text-left">标题</li>
                      <li class="item">时间</li>
                      <li class="item">消息类型</li>
                    </ul>
                    <el-collapse v-if="feedback_list.length>0" v-model="activeName" accordion @change="collapse($event);">
                      <el-collapse-item v-for="(item,index) in feedback_list" :key="index" :name="item.sell_feedback_id"> 
                      <template slot="title" >
                           <div class="lable-checkbox text-center" @click="stopPropagation($event)">
                            <input :ref="'dom'+index" class="magic-checkbox" type="checkbox" name="layout" :id="item.sell_feedback_id"  @click="selectBox(index)">
                            <!-- <label class="pull-right" :for="index"></label> -->
                          </div>
                          <ul class="flex-row main-justify-around" style="width:85%;">
                            <li class="item hiddens text-left font-w" :class="{'befor-show':item.state!=1}" > {{item.feedback_title}}</li>
                            <li class="item hiddens">{{item.dateTime}}</li>
                            <li class="item type-color">{{item.feedback_type==1?'功能建议':'客户反馈'}}</li>
                          </ul>
                        
                      </template>
                      <div class="collapse-content">
                        <div class="feedback-content">
                            <p>{{item.feedback_content}}</p>
                            <hr class="bor" />
                        </div>
                        
                        <div class="feedback-content" v-for="value in item.talk_arr" :key="value.id">
                            <p><span>{{value.user_name}}</span>回复：</p>
                            <p>{{value.content}}</p>
                            <hr class="bor" />
                        </div>
                        <div @click="reply(index)">
                          <div class="flex-row reply main-justify-between" :class="reply_show?'reply-hight':'reply'" >
                            <img :src="reply_img" alt="" width="40%">
                            <span>回复</span>
                          </div>
                          </div>
                        <div :ref="'index'+index"  class="input-textarea replay-content">  
                          <el-input
                            type="textarea"
                            autosize
                            placeholder="请输入内容"
                            v-model="reply_textarea">
                          </el-input><br/>
                           <button @click="cancelReply(index)" class="margin-r-sm">取消</button>
                           <button @click="submitReply(index,item.sell_feedback_id,item.user_id)">提交</button>
                        </div>
                       </div>
                    </el-collapse-item>
                      
                    </el-collapse>
                    <div class="text-center" v-else>暂无反馈</div>
                  </div>
                  <div class="position-ab nav hidden-md-and-down">
                    <div class="nav-top flex-column main-justify-center cross-align-center">
                          <div class="nav-top-img">
                              <img src="../../static/img/fellback/user.png" alt="">
                          </div>
                          <p >{{name}}</p>
                    </div>
                    <div class="nav-select flex-column main-justify-center cross-align-center">
                        <span class="margin-top-sm nav1">
                          <input type="radio" name="navs" v-model="nav_radio" value="a"  id="nav1" checked>
                          <label class="nav1" for="nav1">提出反馈</label>
                        </span>
                        <span class="margin-top-sm nav2">
                          <input type="radio" name="navs" v-model="nav_radio" value="b" id="nav2" >
                          <label class="" for="nav2">反馈记录</label>
                        </span>
                    </div>
              </div>
              </div>
              <section class="position-fixed feedback flex-row main-justify-center cross-align-center hidden-md-and-up" title="反馈" @click="selectType('a')">
                  <img src="../../static/img/fellback/fellback-y.png" width="20px" height="20px">
              </section>
              <section class="position-fixed return-top flex-row main-justify-center cross-align-center hidden-md-and-up"  title="返回顶部" @click="selectType('b')">
                  <img src="../../static/img/fellback/record-y.png" width="20px" height="20px">
              </section>
              
            </div>
        </el-col>
      </el-row>    
     
  </div>

</template>

<script>
export default {
  name: 'FeedBack',

  data () {
    return {
        input: '',
        textarea: '',
        reply_textarea:'',
        input_radio:'a',
        nav_radio:'a',
        type_radio:'a',
        text_indent:false,
        activeName: '1',
        advice_count:0,
        feed_count:0,
        count:0,
        all_checkbox:false,
        name:Publics.getLocal('user_name'),
        success_img:'static/img/fellback/success.png',
        feedback_list:[
          {
            "sell_feedback_id": 10001,
            "user_id": "6",
            "feedback_title": "20",
            "feedback_content": "水务模块",
            "feedback_type": "0",
            "dateTime": "2019-05-30 18:05:40",
            "state": 1,
            "talk_arr": ""
            },
            {
            "sell_feedback_id": 10000,
            "user_id": "6",
            "feedback_title": "20",
            "feedback_content": "电器模块",
            "feedback_type": "0",
            "dateTime": "2019-05-30 18:05:55",
            "state": 0,
            "talk_arr": ""
            },
            {
            "sell_feedback_id": 10002,
            "user_id": "6",
            "feedback_title": null,
            "feedback_content": "第一次输入",
            "feedback_type": "1",
            "dateTime": "2019-05-31 16:05:18",
            "state": 0,
            "talk_arr": ""
            }
        ],
        reply_show:false,
        reply_img:'static/img/fellback/wx.png'

    }
  },
  watch:{
      type_radio(){
        this.feedBackList();
      }
  },
  methods:{
    selectType(str){
      this.nav_radio =str;
    },
     //移动端触屏事件
    getAngle(){
       if (Publics.getType().android ||Publics.getType().ios ||Publics.getType().iPad) { //判断设备
           
            this.text_indent = true;
        }else{
         
        }
    },
    //点击回复显示或者隐藏
    reply(num){
        this.reply_show = !this.reply_show;
        let that = this.$refs['index'+num][0];
        if(this.reply_show){
           this.reply_img = 'static/img/fellback/wx-hight.png';
            that.style.height='auto';
        }else{
          this.reply_img = 'static/img/fellback/wx.png';
          that.style.height='0px';
        }
    },
    //取消回复
    cancelReply(num){
        this.reply_show = false;
        let that = this.$refs['index'+num][0];
        this.reply_img = 'static/img/fellback/wx.png';
        that.style.height='0px';
    },
    //提交回复
    submitReply(num,id,user_id){
      if(this.replaceStr(this.reply_textarea) == ''){
            this.$message({
              message: '回复内容不能为空',
              type: 'warning'
           })
         return  ;
        }
        let param = {
              feedback_id:id,
              user_id:Publics.getLocal('user_id'),
              user_name:Publics.getLocal('user_name'),
              reply_content:this.reply_textarea,
              twouser_id:user_id,
        }
        this.$axios.post('/ReplySell/Add',this.$qs.stringify(param))
        .then(response=>{
              if(response.data.status == 200){
                  this.reply_textarea = '';
                  this.$nextTick( ()=> {
                    this.feedBackList();
                  })
                  this.cancelReply(num);
              }else{
                this.errorTemplate(response.data.msg);
              }
        })
        .catch(error => {
						this.errorTemplate('网络错误，请稍后再试');
					})
        
    },
   
    //反馈列表
    feedBackList(){
        let param ={
          user_id : Publics.getLocal('user_id')
        }
        if(this.type_radio=='c'){
          param.feedback_type = 0;
         
        }else if(this.type_radio=='b'){
           param.feedback_type = 1;
        }else{
           delete param.feedback_type;
        }
        
        this.$axios.post('/FeedbackSell/List',this.$qs.stringify(param))
        .then(response=>{
              if(response.data.status == 200){
                    this.feedback_list = response.data.result.feedback_list;
                    this.advice_count = response.data.result.count[0].advicecount;
                    this.feed_count = response.data.result.count[0].feedcount;
                    this.count = parseInt(this.advice_count)+parseInt(this.feed_count);
                    this.all_checkbox = true;
                    this.selectAll();

              }else{
                this.errorTemplate(response.data.msg);
              }
        })
        .catch(error => {
					//	this.errorTemplate('网络错误，请稍后再试');
				})
    },
      //提交反馈
    submitFeesBack(){
        let type = this.input_radio == 'a'?1:0;
        if(this.replaceStr(this.input) == '' || this.replaceStr(this.textarea)  == ''){
            this.$message({
              message: '标题或者内容不能为空',
              type: 'warning'
           })
         return  ;
        }
        let param ={
           user_id:Publics.getLocal('user_id'),
           feedback_title:this.input,
           feedback_content:this.textarea,   
          // feedback_otherid:7,
           feedback_type:type
        }
        
        this.$axios.post('/FeedbackSell/Add',this.$qs.stringify(param))
        .then(response=>{
              if(response.data.status == 200){
                    this.feesBackSuccess();
                    this.input = this.textarea ='';
                    this.nav_radio = 'b';
                    this.feedBackList();
              }else{
                this.errorTemplate(response.data.msg);
              }
        })
        .catch(error => {
						this.errorTemplate('网络错误，请稍后再试');
				})
    },
    //提交成功
    feesBackSuccess() {
      this.$alert(` <img src=${this.success_img} width="100%">
          <h2 style="text-align:center;color:#5b5b5b">成功提交反馈</h2>     
      `, {
        dangerouslyUseHTMLString: true
      });
    },
    //阻止冒泡
    stopPropagation(ev){
        ev.stopPropagation()
    },
    //选中子复选框是否是全选
    selectBox(num){
          for (let i = 0; i < this.feedback_list.length; i++) {
            console.log(this.$refs['dom'+i][0].id);
                if(!this.$refs['dom'+i][0].checked){
                    this.$refs.all.checked =false;
                    this.all_checkbox =false;
                    break;
                }else{
                  if(i == this.feedback_list.length-1){
                    this.$refs.all.checked =true;
                    this.all_checkbox = true;
                  }
                }
          }
    },
    //全选与取消全选
    selectAll(){
          //取消全选
        if(this.all_checkbox){
          this.$refs.all.checked =false;
          for (let i = 0; i < this.feedback_list.length; i++) {
              this.$refs['dom'+i][0].checked = false;
          }
          this.all_checkbox=!this.all_checkbox
        }else{
          //全选
          this.$refs.all.checked =true;
          for (let i = 0; i < this.feedback_list.length; i++) {
              this.$refs['dom'+i][0].checked = true;
          }
          this.all_checkbox=!this.all_checkbox
        }
    },

    //标为已读
    signSelect(){
        for (let i = 0; i < this.feedback_list.length; i++) {
            if(this.$refs['dom'+i][0].checked){
                this.updateType(this.$refs['dom'+i][0].id)
            }
        }
    },
    //手风琴折叠事件
    collapse(id){
      for (let i = 0; i < this.feedback_list.length; i++) {
        this.reply_show = false;
        this.reply_img = 'static/img/fellback/wx.png';
        let that = this.$refs['index'+i][0];
        that.style.height='0px';
      }
      if(id){
        this.updateType(id);
      }
    },
    //更新阅读状态
    updateType(id){ 
      let param = {
        user_id:Publics.getLocal('user_id'),
        sell_feedback_id:id,
        feedback_state:1
      }
      this.$axios.post('/FeedbackSell/IdList',this.$qs.stringify(param))
        .then(response=>{
            if(response.data.status == 200){
                  this.$nextTick( ()=> {
                  this.feedBackList();
                  })
            }else{
              this.errorTemplate(response.data.msg);
            }
      })
      .catch(error => {
          this.errorTemplate('网络错误，请稍后再试');
      })
    },
    //删除选中
    deleteSelect(){
        for (let i = 0; i < this.feedback_list.length; i++) {
            if(this.$refs['dom'+i][0].checked){
                this.deleteSelectAjax(this.$refs['dom'+i][0].id)
            }
        }
    },
    deleteSelectAjax(id){
        let param = {
            sell_feedback_id:id,
            is_valid:0
        }
      this.$axios.post('/FeedbackSell/Del',this.$qs.stringify(param))
      .then(response=>{
            if(response.data.status == 200){

                  this.$nextTick( ()=> {
                  this.feedBackList();
                })
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
    },
    replaceStr(str){
      return str.replace(/(^\s*)|(\s*$)/g,'')
    } 
  },
  mounted() {
      this.getAngle();
      this.feedBackList();
  },
 
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
html,body{
  background:#f3f6fb;
}
.detail-content{
  /* width:10rem; */
  font-size:0.16rem;
  /* margin: 0 auto; */
  margin-top:0.3rem;
}
input:checked+span{
  color:#2789e9;
}
.feedback{
  right:0.2rem;
  bottom:50%;;
}
.return-top{
  right:0.2rem;
  bottom:40%;
}
.feedback,.return-top{
  cursor: pointer;  
  width:0.5rem;
  height:0.5rem;
  background:#2789e9;
  border-radius: 0.3rem;
}
.submit{
  border:1px solid #cacaca;
  background:#fff;
}
.button input,.nav-select input,.submit li input{
    display: none;

}
.button span,.button label{
  display: block;
}
.button label{
  padding:0.1rem 0.2rem;
  border:solid 1px #eee;
}
.button input:checked~label{
  color:#2f80e2;
  border:solid 1px #2f80e2;
}
.div-left{
  width:15%;
  text-align: right;
}
.submit button{
    background:#2789e9;
    border:none;
    display: inline-block;
    padding:0.08rem 0.2rem;
    color:#fff;
    margin-top:0.2rem;
    border-radius: 0.05rem;
}

.input-text,.input-textarea{
   width:70%;
}
.collapse-content .input-textarea{
  width:95%;
}
.input-textarea button{
      margin-bottom:0.3rem;
    }
.nav{
  width:2rem;
  left:-2.2rem;
  height:100%;
  min-height:3rem;
  top:0;
  background:#fff;
  border-radius: 0.1rem;
  border:1px solid #cacaca;
  color:#7f8289;
}
.nav p{
  color:#fff;
}
.nav-top{
  /* height:1rem; */
  background:#5f75a7;
  width:100%;
  height:2rem;
  border-radius: 0.1rem 0.1rem 0 0;

}
.submit li label{
  padding: 0.1rem 0.2rem;
  color:#7f8289;
  display: block;
}
.submit li input:checked+label{
  color:#00275b;
  border-bottom:solid 3px #00275b;
}
.nav1 label:before,.nav2 label:before,.nav1 input:checked~label:before,.nav2 input:checked~label:before{
    content: '';
    position: relative;
    display: inline-block;
    top:0.03rem;
    width:0.2rem;
    height:0.2rem;
    margin-right:0.1rem;
    

}
.nav1 label:before{
  background: url(../../static/img/fellback/fellback-n.png) no-repeat;
  background-size:100% 100%;
}
.nav2 label:before{
  background: url(../../static/img/fellback/record-n.png) no-repeat;
  background-size:100% 100%;
}
.nav1 input:checked~label,.nav2 input:checked~label{
     color:#00275b;
}
.nav1 input:checked~label:before{
      background: url(../../static/img/fellback/fellback-y.png) no-repeat;
      background-size:100% 100%;
}
.nav2 input:checked~label:before{
      background: url(../../static/img/fellback/record-y.png) no-repeat;
      background-size:100% 100%;
}
.collapse-content{
  max-height:2.5rem;
  margin: 0 1rem;
  border:1px solid #eee;
  padding:0.1rem;
  overflow: auto;
}
.feedback-content span{
  color:#1563c4;
}
.feedback-content p:last-of-type{
  text-indent: 0.2rem;
}
.record{
  min-height:5rem;
}
.item{
   flex-basis:33%;
   text-align:center;
}
.hiddens{
  overflow:hidden;
  text-overflow:ellipsis;
  white-space:nowrap
}
.bor{
    border: none;
    border-top: 1px solid #b0b0b0;
}
.reply,.reply-hight{
   width:0.6rem;
   padding:0.1rem;
   margin:0.1rem;
}
.reply{
  background:#e9edf6;
  border:1px solid #c9ced7;
  color:#75829c;
}
.reply-hight{
  background:#e7fdeb;
  border:1px solid #b6eab6;
  color:#3bc242;
}
.replay-content{
  height:0px; 
  overflow: hidden;
}
li.befor-show::before{
  content: '';
  position: relative;
  top: 0px;
  display: inline-block;
  width:8px;;
  height:8px;
  border-radius: 8px;
  margin-right: 5px;
  background:#db0f23;

}
.type-color{
  color:#6486b4;
}
/* 多选框样式 */
.lable-checkbox{
  width:15%;
}
.package-all .lable-checkbox{
  height:50px;
  line-height: 50px;
}
.yd{
  color:#fbc36a;
  background:#faf7f1;
  border:1px solid #fbc36a;
  padding:5px 10px;
  box-sizing: border-box;
  margin-right:20px;
  cursor: pointer;
}
.del{
  color:#2a70c5;
  background:#eff4fd;
  border:1px solid #2a70c5;
  padding:5px 10px;
  cursor: pointer;
}
@media  screen and (max-width:1200px) {
    
    .collapse-content{
      margin:0 0.1rem;
    }
}

</style>

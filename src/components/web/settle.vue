<template>
    <div class="cart-container">
        <el-steps :active="step" simple finish-status="success" style="margin-top: 20px">
            <el-step title="加入购物车" icon="el-icon-edit"></el-step>
            <el-step title="确认订单" icon="el-icon-upload"></el-step>
            <el-step title="完成支付" icon="el-icon-picture"></el-step>
        </el-steps>

        <div class="order_container" v-if="payment.payUrl">
            <el-row :gutter="20">
                <el-col :span="24">
                    <span class="course_label">订购人信息</span>
                </el-col>
                <el-col :span="24">

                </el-col>
            </el-row>
            <hr class="bottom-line">
            <el-row :gutter="20">
                <el-col :span="24">
                    <span class="course_label">订购清单</span>
                </el-col>
            </el-row>
            <hr class="bottom-line" />
            <div class="course_detail" v-for="item in orderInfo">
                <el-row :gutter="20">
                    <el-col :span="7">
                        <div>
                            <img :src="item.course_cover_address" alt="" class="course_image">
                        </div>
                    </el-col>
                    <el-col :span="9"><span>{{item.course_title}}</span></el-col>
                    <el-col :span="4"><span class="course_cost">{{item.course_price}}</span></el-col>
                    <el-col :span="4">授课中</el-col>
                </el-row>
                <hr class="bottom-line" />
            </div>
            <el-tabs @tab-click="handleClick" class="discount" v-model="initLabel">
                <el-tab-pane label="优惠券" name="vaild">
                    <div style="margin:0 8px;"  v-if="coupons.length">
                        <el-row :gutter="20">
                            <el-col :span="6" v-for="(item, o) in coupons" :key="o">
                                <el-card :body-style="{ padding: '0px'}">
                                    <div @click="selectDiscount(o, item.coupon_is_matched)" :class="{'discount_area':true, 'discountSelected':o===discountSelected, 'discount_area_not_matched':!item.coupon_is_matched}">
                                        <div :class="{'discount_detail':true,  'discount_detail_not_matched':!item.coupon_is_matched}">
                                            <span class="discount_large_font discount_flag">￥</span>
                                            <span class="discount_large_font discount_money">{{item.coupon_discount}}</span>
                                            <span>满{{item.coupon_limit}}</span>
                                            <span class="discount_vaild_date">有效期至{{item.coupon_end_date}}</span>
                                        </div>
                                        <div class="discount_type">
                                            <span>[全品类]</span>
                                        </div>
                                    </div>
                                </el-card>
                            </el-col>
                        </el-row>
                    </div>
                    <div v-if="!coupons.length">
                        <span class="discount_empty">
                            空空如也~
                        </span>
                    </div>
                    <hr class="bottom-line">
                </el-tab-pane>
                <el-tab-pane label="过期" name="overdue">
                    <div>
                        <span class="discount_empty">
                            空空如也~
                        </span>
                    </div>
                    <hr class="bottom-line">
                </el-tab-pane>
            </el-tabs>
            <div>
                <div class="price_label">
                    <ul class="course_price">
                        <li><span class="summary_label">商品价格总计：</span><span class="summary_value">{{coursePrice}}</span></li>
                        <li><span class="summary_label">返现：</span><span class="summary_value">{{orderPrice.orderMoneyReturn.toFixed(2)}}</span></li>
                        <li><span class="summary_label">优惠：</span><span class="summary_value">{{orderPrice.orderCouponDiscount.toFixed(2)}}</span></li>
                        <li class="confirm-container"><span class="summary_label confirm">应付总额：</span><span class="confirm summary_value confirm_price">{{summaryPrice}}</span></li>
                    </ul>
                </div>
                <div class="order_place">
                    <el-button type="danger" :loading="false" class="order_button" @click="putOrder">提交订单</el-button>
                </div>
                <div style="clear:both;float:none;"></div>

            </div>
        </div>
        <div class="order_container" v-if="!payment.payUrl">
            <el-row :gutter="20">
                <el-col :span="10">
                    1
                </el-col>
                <el-col :span="14">
                    2
                </el-col>
            </el-row>
        </div>
        <el-dialog
                title="出错啦"
                :visible.sync="warningDialog"
                width="25%"
                center
                :close-on-click-modal="false"
                :close-on-press-escape="false"
                :show-close="false"
        >
            <span class="dialog_content"><i class="el-icon-warning dialog_flag"></i>订单超时或信息有误，请检查信息返回购物车重新下单</span>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="backToCart()">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<style>
    ul{
        list-style: none;
    }
    .order_container{
        background-color: #ffffff;
        box-shadow: 2px 2px 2px #cccccc;
        padding:10px;
    }
    .course_label{
        margin:10px 20px 10px;
        font-weight:bold;
    }
    .course_detail{
        margin:10px 0;
        color:#666;
    }
    .bottom-line{
        width:97%;
        border:1px solid #efefef;
        margin:0 auto;
    }
    .course_image{
        display:block;
        width:50%;
        margin:0 auto 10px;
    }
    .course_cost{
        font-size:16px;
        color: #FF4949;
        font-weight:bold;
    }
    .price_label{
        display:inline-block;
        height:140px;
        width:100%;
        float:right;
    }
    .course_price{
        text-align:right;
    }
    .summary_label{
        width:200px;
        text-align: left;
        color:#666;
    }
    .summary_value{
        text-align:left;
        width:150px;
        color:#666;
    }
    .discount{
        margin:20px;
    }
    .discount_empty{
        display:block;
        text-align:center;
        margin:10px auto;
        color:#ccc;
    }
    .discount_area{
        cursor:pointer;
        border:2px solid transparent;
    }
    .discount_area_not_matched{
        cursor: not-allowed;
    }
    .discount_detail{
        background-color:#ff7777;
        color:#ffffff;
        padding:15px;
        font-size:15px;
    }
    .discount_vaild_date{
        color:#FFE6E6;
    }
    .discount_detail_not_matched{
        background-color:#cccccc;
        color:#ffffff;
    }
    .discount_large_font{
        font-size:26px;
    }
    .discount_type{
        padding:10px 15px;
        color:#ff7777;
    }
    .discountSelected{
        border:2px solid #ff3333;
    }
    .confirm-container{
        background:#efefef;
        padding:10px 20px 10px;
        margin:10px 0;
    }
    .confirm{
        height:1.5em;
        line-height:1.5em;
        color:#666;
    }
    .confirm_price{
        font-size:30px;
        font-weight:bold;
        color:#FF4949;
    }
    .order_place{
        float:right;
        margin:10px 90px 10px;
    }
    .dialog_content{
        display:block;
        font-size:16px;
        color:#666;
        text-align:center;
    }
    .dialog_flag{
        display:block;
        font-size:40px;
        line-height:40px;
        color:#FF4949;
        margin:10px auto;
        text-align:center;
    }
</style>
<script>
  import { web_routerConfig } from './../../config/RouterConfig'
  import { mapGetters } from 'vuex'
  export default {
    created() {
      if(this.orderInfo.length !== 0) {
        let cart_ids = this.functions.checkLocalData('cart_ids')
        if (cart_ids) {
          this.$store.dispatch('checkCourses', { order_course_ids: cart_ids })
        } else {
          console.log("购物车过期或为空")
        }
      }
    },
    mounted(){
    },
    data: () => {
      return {
        initLabel: "",
        discountSelected: -1,
        orderPrice:{
          orderCouponDiscount: 0,
          orderMoneyReturn: 0,
        },
        warningDialog:false,
        step: 1,
        coupons: [],
        // 原始课程总价
        coursePrice: 0,
      }
    },
    methods:{
      handleClick(tab, event) {
        if(tab.$el.id==="pane-vaild"){
          this.$store.dispatch('getCoupon', { user_id: this.auth_id }).then(() => {

          })
        }
      },
      selectDiscount(o, is_matched){
        if(is_matched){
          if(this.discountSelected < 0){
            this.discountSelected = o
            this.orderPrice.orderCouponDiscount = this.couponInfo[o]['coupon_discount']
          }else if(o >= 0 && this.discountSelected >= 0 && o !== this.discountSelected){
            this.discountSelected = o
            this.orderPrice.orderCouponDiscount = this.couponInfo[o]['coupon_discount']
          }else{
            this.discountSelected = -1
            this.orderPrice.orderCouponDiscount = 0
          }
        }
      },
      /**
       * 最终下单：
       * 首先判断token是否过期
       * 判断订单是否有课程
       * 判断价格是否大于0
       *
       */
      putOrder() {
        let cartIds = JSON.parse(this.functions.getLocalData('cart_ids'))
        if(this.auth_id && this.auth_token && cartIds.length > 0) {
          if(this.orderInfo.length > 0 && this.summaryPrice >= 0) {
            this.$store.dispatch('checkCourses', { order_course_ids: cartIds }).then(() => {
              console.log('insert')
              this.step = 2
              let info = {
                user_id: this.auth_id,
                order_course_ids: JSON.parse(this.functions.getLocalData('cart_ids')),
                cart_parent_id: this.functions.getLocalData('cart_parent_id'),
                course_price: this.coursePrice,
                order_coupon_discount: this.orderPrice.orderCouponDiscount,
                order_coupon_selected: this.discountSelected
              }
              this.$store.dispatch('putOrder', info)
            })
          }
        }
      },
      putOrder23333(){
        let cart_ids = JSON.parse(this.functions.getLocalData('cart_ids'))
        if(this.auth_id && this.auth_token && cart_ids.length > 0){
          //判断价值量大于0并且订单信息存在，
          if(this.orderInfo.length > 0 && this.summaryPrice >= 0){
            this.$store.dispatch('checkData', {
              url:this.APIConfig.checkCourses,
              data:{
                user_id: this.auth_id,
                order_course_ids:cart_ids,
                order_coupon_used: this.discountSelected,
                orderPrice: {
                  course_price: this.course_price,
                  coupon_discount: this.orderPrice.orderCouponDiscount,
                  money_return: this.orderPrice.orderMoneyReturn,
                }
              },
              key:'orderInfo'
            }).then(() => {
              console.log('insert')
              this.step = 2
              let info = {}
              info.user_id = localStorage.getItem("auth_id")
              info.order_course_ids = JSON.parse(this.functions.getLocalData('cart_ids'))
              info.cart_parent_id = this.functions.getLocalData("cart_parent_id")
              info.course_price = this.course_price
              info.orderCouponDiscount=this.orderPrice.orderCouponDiscount
              info.order_coupon_selected = this.discountSelected
              this.$store.dispatch('putOrder', {
                url:this.APIConfig.putOrder,
                data:info
              })
            }).then(()=>{
            })
          }
        }
//               this.warningDialog=true
      },
      backToCart(){
        this.warningDialog=false
        web_routerConfig.push({'path':'/cart'})
      }
    },
    watch: {
      couponInfo: {
        deep: true,
        handler: function(couponInfo, originCouponInfo) {
          if(couponInfo.length > 0){
            this.coupons = this.functions.deepCopy(this.couponInfo, [])
            let date = new Date()
            for(let i in couponInfo) {
              this.coupons[i]['coupon_is_matched'] = couponInfo[i]['coupon_limit'] <= this.coursePrice
              for(let k in couponInfo[i]) {
                if(k.indexOf('date') >= 0){
                  date.setTime(couponInfo[i][k]*1000)
//                  console.log(
//                    date.getYear()+1900,
//                    date.getMonth()+1,
//                    date.getDate()
//                  )
                  this.coupons[i][k]=(date.getYear()+1900)+' 年 '+ (date.getMonth()+1)+' 月 '+ (date.getDate()) + ' 日 '
                }
              }
            }
          }
          console.log(this.coupons)
        }
      },
      orderInfo: function(to, from) {
        //计算课程总价
        let price = 0
        to.map(item => {
          price += parseFloat(item.course_price)
        })
        this.coursePrice = price.toFixed(2)
      }
    },
    computed:{
      ...mapGetters(['orderInfo', 'auth_id', 'couponInfo', 'auth_token', 'auth_appid']),
      payment(){
        return this.$store.getters.payment
      },
      //叠加折扣，获得最终总价
      summaryPrice(){
        return parseFloat(this.coursePrice - this.orderPrice.orderCouponDiscount).toFixed(2);
      },
    }
  }
</script>
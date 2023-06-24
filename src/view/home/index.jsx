import React, { useState, useEffect } from 'react'
import { getOrders } from '../../utils/getOrders'
import { request } from '../../api/request'
import BASE from '../../utils/base'
import './index.less'
export default function Home() {
  const tabList = [
    { label: '待处理', value: 'WaitProcess' },
    { label: '全部', value: 'All' },
  ]
  const statusCN = {
    Created: "已创建",
    WaitPay: "待支付",
    WaitPickup: "待取货",
    Cancel: "已取消",
    WaitReady: "待备单",
    Finished: "已完成"
  }
  const [tabIndex, setTabIndex] = useState('WaitProcess')
  const [page, setPage] = useState(1)
  const [orderLists, setOrderList] = useState([])
  const userInfo = JSON.parse(localStorage.getItem('user'))
  let roleType = localStorage.getItem("roleType");
  const changeTab = (item) => {
    setTabIndex(item.value)
    getOrderList(item.value)
  }
  const getOrderList = async (type) => {
    //第一步获取个人信息
    let UserId = userInfo.ITCode;

    let orderList = [];
    if (UserId == null) {
      let UserInfo = await request.get('/Account/Get')
      UserId = UserInfo.data.ID
    }

    // console.log(this.Page);
    if (roleType == BASE.SHOP_ROLE) {
      // 第二步,若是商户则使用userid查shopid
      let res = await request.post('/Search/SearchShop/SearchShop', {
        Page: 1,
        OwnerId: UserId
      })
      let ShopId = res.data.Data.list[0].ID
      // this.NowTime = res.data.Data.list[0].QueueTime
      // getApp().globalData.shopId = ShopId;

      if (ShopId == null) return;
      switch (type || tabIndex) {
        case "WaitProcess":
          let res = await request.post('/Search/SearchOrders/SearchOrders', {
            Page: page,
            OState: "WaitReady",
            ShopId
          })
          if (page <= res.data.Data.pageCount)
            // orderList.push.apply(orderList, res.data.Data.list)
            orderList = res.data.Data.list
            setOrderList(orderList)
          break;
        case "All":

          let res2 = await request.post('/Search/SearchOrders/SearchOrders', {
            Page: page,
            ShopId
          })
          // if (page <= res2.data.Data.pageCount)
            // orderList.push.apply(orderList, res2.data.Data.list)
            // orderList.push.apply(orderList, res2.data.Data.list)
            orderList = res2.data.Data.list
            setOrderList(orderList)
          console.log('orderList', orderList);
          break;
      }

    }
    // if (this.roleType == BASE.CAREGIVER_ROLE) {
    //   //第三步,若是看护人则用userid查areaid
    //   let AreaId = getApp().globalData.areaId;
    //   if (AreaId == null) {
    //     let res = await api.getCaregiverInfo({
    //       Page: 1,
    //       UserId
    //     })
    //     AreaId = res.data.Data.list[0].AreaId

    //     getApp().globalData.areaId = AreaId;
    //   }

    //   if (AreaId == null) return;
    //   switch (this.OrderState) {
    //     case "WaitProcess":
    //       let res1 = await api.SearchOrders({
    //         Page: this.Page,
    //         OState: "WaitReady",
    //         Limit: 15
    //       })
    //       let res2 = await api.SearchOrders({
    //         Page: this.Page,
    //         OState: "WaitPickup",
    //         Limit: 15
    //       })
    //       console.log(res1)
    //       console.log(res2)
    //       if (this.Page <= res1.data.Data.pageCount)
    //         orderList.push.apply(orderList, res1.data.Data.list)
    //       if (this.Page <= res2.data.Data.pageCount)
    //         orderList.push.apply(orderList, res2.data.Data.list)
    //       break;
    //     case "All":
    //       let res = await api.SearchOrders({
    //         Page: this.Page,
    //         AreaId
    //       })
    //       if (this.Page <= res.data.Data.pageCount)
    //         orderList.push.apply(orderList, res.data.Data.list)
    //       break;
    //   }
    // }
    if (orderList.length <= 0) return;

    console.log(orderList);
    // this.Page = this.Page + 1;
    setPage(item => item + 1)
    // orderList.push.apply(orderList, orderList);
    // setOrderList(orderList)
    console.log('======orderList', orderList);
    for (let i in orderList) {
      //车牌序列化
      if (orderList[i].PickupCode && orderList[i].PickupCode !== 'null') {
        let PickupCode = JSON.parse(orderList[i].PickupCode)
        // console.log(PickupCode,'序列化之后的车牌好')
        orderList[i].PickupNumber = PickupCode.numberPlate
        orderList[i].PickupCodeStr = PickupCode.numberPlate + '【' + PickupCode.brand + PickupCode
          .color + '】'
      }
      // 把订单状态显示中文
      for (let j in statusCN) {
        if (orderList[i].OState == j) {
          orderList[i].stateCN = statusCN[j]
        }
      }
    }
  }
  useEffect(() => {
    getOrders()
    getOrderList()
  }, [])
  return (
    <div className='home-contain'>
      <div className="tab-box">
        <div className="left">
          {
            tabList.map((item, index) => {
              return <span key={item.value} onClick={() => changeTab(item)} className={item.value == tabIndex ? 'tab-item tab_active' : 'tab-item'}>{item.label}</span>
            })
          }
        </div>
        <div className="right">
          【{userInfo.NickName || '--'}】 自动打印中...
        </div>
      </div>
      {orderLists.map(item => {
        return <>
          <div className="order-box" key={item.ID}>
          <div className="order-info">
            <div className="left">NO.{item.ID}</div>
            <div className="right">
              <p><span className='order-tag'>包装费</span> <span>￥{0}</span></p>
              <p><span className='order-tag'>团券</span> <span>￥{0}</span></p>
              <p><span className='order-tag'>店铺满减</span> <span>￥{0}</span></p>
            </div>
          </div>
          <div className="customer-box">
            <div className="left">
              <p className='left-info'><span className='iconfont icon-xiaoqiche'></span>尾号{JSON.parse(item.PickupCode).numberPlate}【{JSON.parse(item.PickupCode).brand}，{JSON.parse(item.PickupCode).color}】</p>
              <p className='left-info'><span className='iconfont icon-daohang1'></span>车主：最快预到{Math.floor((new Date(item.ArriveDateTime).getTime() - new Date().getTime()) / 1000 / 60)}分钟【仅代表下单距离】</p>
              <p className='left-info'><span className='iconfont icon-yonghuNot'></span>{item.CustomorPhoneNumber}</p>
            </div>
            <div className="right"><span className='title'>合计</span>￥{item.TotalPrices}</div>
          </div>
          <div className="goods-box">
            <div className="tips">请即刻准备：</div>
            <div className="gooods-list">
              <ul className='goods-contain'>
                {
                  item.CommodityList.map((items, index) => {
                    return <li key={index}>{items.Name} ×{items.Count}</li>
                  })
                }
              </ul>
              <div className="remark">备注：{item.Remark || '无'}</div>
            </div>
          </div>
          <div className="time">承诺备单：{item.PayDatetimeLimit}</div>
        </div>
        {
          item.OState == 'WaitReady' && <div className="order-btn" >
          <div className="over-order">已完单</div>
        </div>
        }
        </>
      })}

    </div>
  )
}

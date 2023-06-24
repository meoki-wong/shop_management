import React from 'react'
import {Space, Spin} from 'antd'



export default function Loading() {
    return (
        <div style={{
            display: 'flex',
            justifyContent: "center",
            alignItems: "center",
            height: "100%"
        }}>
            <Space size="middle">
                <Spin size="large"></Spin>    
            </Space>            
        </div>
    )
}

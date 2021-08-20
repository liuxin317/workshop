import { lazy } from 'react';
import {
    PieChartOutlined
} from "@ant-design/icons";

const Analysis = lazy(() => import('@view/gameConfig'));
const Role  = lazy(() => import('@view/system/role'));
const Relationship = lazy(() => import('@view/system/role/rlationship'));

export default [
    {
        id: 1,
        title: "管理洞察",
        key: "chart",
        path: "",
        element: "",
        icon: <PieChartOutlined />,
        role: ["all"],
        children: [{
            id: '1-1',
            title: "管理一体化平台",
            key: "chart",
            path: "/analysis",
            element: <Analysis />,
            icon: <PieChartOutlined />,
            role: ["all"],
        },{
            id: '1-2',
            title: "生产组织管理",
            key: "chart",
            path: "/b",
            element: <Analysis />,
            icon: <PieChartOutlined />,
            role: ["all"],
        },{
            id: '1-3',
            title: "岗位价值分析",
            key: "chart",
            path: "/c",
            element: <Analysis />,
            icon: <PieChartOutlined />,
            role: ["all"],
        }]
    },
    {
        id: 2,
        title: "准入管理",
        key: "chart",
        path: "",
        element: "",
        icon: <PieChartOutlined />,
        role: ["all"],
        children: [{
            id: '2-1',
            title: "准入记录",
            key: "chart",
            path: "/o",
            element: <Analysis />,
            icon: <PieChartOutlined />,
            role: ["all"],
        },{
            id: '2-2',
            title: "门禁配置",
            key: "chart",
            path: "/p",
            element: <Analysis />,
            icon: <PieChartOutlined />,
            role: ["all"],
        }]
    },
    {
        id: 3,
        title: "监控管理",
        key: "chart",
        path: "",
        element: "",
        icon: <PieChartOutlined />,
        role: ["all"],
        children: [{
            id: '3-1',
            title: "摄像头管理",
            key: "chart",
            path: "/s",
            element: <Analysis />,
            icon: <PieChartOutlined />,
            role: ["all"],
        }]
    },
    {
        id: 4,
        title: "轨迹管理",
        key: "chart",
        path: "",
        element: "",
        icon: <PieChartOutlined />,
        role: ["all"],
        children: [{
            id: '4-1',
            title: "轨迹回放",
            key: "chart",
            path: "/dd",
            element: <Analysis />,
            icon: <PieChartOutlined />,
            role: ["all"],
        }]
    },
    {
        id: 5,
        title: "任务管理",
        key: "chart",
        path: "",
        element: "",
        icon: <PieChartOutlined />,
        role: ["b"],
        children: [{
            id: '5-1',
            title: "任务列表",
            key: "chart",
            path: "/f",
            element: <Analysis />,
            icon: <PieChartOutlined />,
            role: ["all"],
        },{
            id: '5-2',
            title: "任务配置",
            key: "chart",
            path: "/g",
            element: <Analysis />,
            icon: <PieChartOutlined />,
            role: ["all"],
        }]
    },
    {
        id: 6,
        title: "大屏管理",
        key: "chart",
        path: "",
        element: "",
        icon: <PieChartOutlined />,
        role: ["all"],
        children: [{
            id: '6-1',
            title: "中控大屏",
            key: "chart",
            path: "/h",
            element: <Analysis />,
            icon: <PieChartOutlined />,
            role: ["all"],
        },{
            id: '6-2',
            title: "恒温恒湿间大屏",
            key: "chart",
            path: "/j",
            element: <Analysis />,
            icon: <PieChartOutlined />,
            role: ["all"],
        },{
            id: '6-3',
            title: "大屏配置",
            key: "chart",
            path: "/kd",
            element: <Analysis />,
            icon: <PieChartOutlined />,
            role: ["all"],
        }]
    },
    {
        id: 7,
        title: "报警管理",
        key: "chart",
        path: "",
        element: "",
        icon: <PieChartOutlined />,
        role: ["all"],
        children: [{
            id: '7-1',
            title: "工艺类报警配置",
            key: "chart",
            path: "/l",
            element: <Analysis />,
            icon: <PieChartOutlined />,
            role: ["all"],
        },{
            id: '7-2',
            title: "环境类报警配置",
            key: "chart",
            path: "/z",
            element: <Analysis />,
            icon: <PieChartOutlined />,
            role: ["all"],
        },{
            id: '7-3',
            title: "设备类报警配置",
            key: "chart",
            path: "/x",
            element: <Analysis />,
            icon: <PieChartOutlined />,
            role: ["all"],
        }]
    },
    {
        id: 8,
        title: "系统管理",
        key: "chart",
        path: "",
        element: "",
        icon: <PieChartOutlined />,
        role: ["all"],
        children: [{
            id: '8-1',
            title: "用户管理",
            key: "chart",
            path: "/v",
            element: <Analysis />,
            icon: <PieChartOutlined />,
            role: ["all"],
        },{
            id: '8-2',
            title: "角色管理",
            key: "chart",
            path: "/role",
            element: <Role />,
            icon: <PieChartOutlined />,
            role: ["all"],
            children: [{
                title: '管理关系',
                path: '/role/relationship', 
                element: <Relationship />
            }]
        },{
            id: '8-3',
            title: "资源管理",
            key: "chart",
            path: "/m",
            element: <Analysis />,
            icon: <PieChartOutlined />,
            role: ["all"],
        }]
    }
];
